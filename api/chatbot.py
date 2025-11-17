import os
import json
import requests
from http.client import responses

# The API key must be set as an environment variable in Vercel
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")
MODEL_NAME = "nvidia/nemotron-nano-12b-v2-vl:free"

def handler(request):
    # --- 1. Common Headers & CORS Handling ---
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    }

    def create_response(status_code, body_data):
        """Helper to create the Vercel-compatible response tuple."""
        # Ensure the body is a JSON string
        if not isinstance(body_data, str):
            body = json.dumps(body_data)
        else:
            body = body_data
            
        return (status_code, headers, body)

    if request.method == 'OPTIONS':
        # Handle preflight request
        return create_response(200, "")

    if request.method != 'POST':
        return create_response(405, {"error": f"Method {request.method} Not Allowed", "status": 405})

    # --- 2. API Key Check (Fixed to return JSON) ---
    if not OPENROUTER_API_KEY:
        print("OPENROUTER_API_KEY is not set.")
        # Returning a clear JSON error
        return create_response(500, {
            "error": "Server configuration error: API key missing.",
            "details": "Please set OPENROUTER_API_KEY in Vercel.",
            "status": 500
        })

    try:
        # --- 3. Parse Request Body ---
        try:
            # Vercel's Python runtime passes the request body as bytes
            body = json.loads(request.body.decode('utf-8'))
            messages = body.get('messages')
        except (json.JSONDecodeError, AttributeError, KeyError):
            return create_response(400, {"error": "Invalid or missing JSON in request body.", "status": 400})

        if not messages or not isinstance(messages, list):
            return create_response(400, {"error": "Invalid request body: 'messages' array is required.", "status": 400})

        # --- 4. Implement Code 2's Logic: Pass Reasoning Details ---
        # OpenRouter API requires 'reasoning_details' to be part of the message object 
        # for context continuation (like Code 2 does). We'll pass all messages as is.
        # No extra code needed here, as 'messages' already contains it if the client sends it.

        # Prepare the request to OpenRouter
        openrouter_headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            # Optional: Add your Vercel URL/Name for better logging
            "X-Title": "My Vercel Chatbot API" 
        }
        
        openrouter_payload = {
            "model": MODEL_NAME,
            "messages": messages,
            # We explicitly enable reasoning as per Code 2 logic
            "extra_body": { "reasoning": { "enabled": True } } 
        }

        # --- 5. Call OpenRouter API ---
        openrouter_response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=openrouter_headers,
            json=openrouter_payload,
            timeout=30 # Add a timeout for safety
        )

        # --- 6. Handle OpenRouter Errors (Crucial for fixing your problem!) ---
        if not openrouter_response.ok:
            try:
                # Try to parse OpenRouter's error message if it's JSON
                error_data = openrouter_response.json()
                error_text = json.dumps(error_data)
            except json.JSONDecodeError:
                # If OpenRouter gives a non-JSON error (e.g., HTML/plain text)
                error_text = openrouter_response.text
            
            print(f"OpenRouter API Error: {openrouter_response.status_code} - {error_text}")
            
            # ALWAYS return a well-formed JSON error to the client
            return create_response(openrouter_response.status_code, {
                "error": "External AI service failed.", 
                "details": error_text, 
                "status": openrouter_response.status_code
            })

        # --- 7. Success Response ---
        data = openrouter_response.json()
        return create_response(200, data)

    except requests.exceptions.RequestException as e:
        # Handle network/timeout errors with OpenRouter
        print(f"Network Error contacting OpenRouter: {e}")
        return create_response(503, {
            "error": "Failed to connect to the external AI service.", 
            "details": str(e),
            "status": 503
        })
        
    except Exception as e:
        # Handle any other internal server error
        print(f"Internal Server Error: {e}")
        return create_response(500, {
            "error": "An unexpected server error occurred.", 
            "details": str(e),
            "status": 500
        })

# Note: Vercel deployment instructions remain the same.
