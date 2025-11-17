import os
import json
import requests
from http.client import responses

# The API key must be set as an environment variable in Vercel
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")
MODEL_NAME = "nvidia/nemotron-nano-12b-v2-vl:free"

def handler(request):
    print("DEBUG: Handler function started.") # <-- DEBUG LINE 1

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
        return create_response(200, "")

    if request.method != 'POST':
        return create_response(405, {"error": f"Method {request.method} Not Allowed", "status": 405})

    # --- API Key Check ---
    if not OPENROUTER_API_KEY:
        print("OPENROUTER_API_KEY is NOT set in environment.") # <-- DEBUG LINE 2
        return create_response(500, {
            "error": "Server configuration error: API key missing.",
            "details": "Please set OPENROUTER_API_KEY in Vercel.",
            "status": 500
        })

    print("DEBUG: API Key is present. Starting request parsing.") # <-- DEBUG LINE 3

    try:
        # --- Parse Request Body ---
        try:
            body = json.loads(request.body.decode('utf-8'))
            messages = body.get('messages')
        except (json.JSONDecodeError, AttributeError, KeyError):
            return create_response(400, {"error": "Invalid or missing JSON in request body.", "status": 400})

        if not messages or not isinstance(messages, list):
            return create_response(400, {"error": "Invalid request body: 'messages' array is required.", "status": 400})

        # --- Prepare OpenRouter Request ---
        openrouter_headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "X-Title": "My Vercel Chatbot API" 
        }
        
        openrouter_payload = {
            "model": MODEL_NAME,
            "messages": messages,
            "extra_body": { "reasoning": { "enabled": True } } 
        }

        print(f"DEBUG: Calling OpenRouter with model: {MODEL_NAME}") # <-- DEBUG LINE 4

        # --- Call OpenRouter API ---
        openrouter_response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=openrouter_headers,
            json=openrouter_payload,
            timeout=30
        )
        
        # ... (Rest of the error handling and success code remains the same) ...

        if not openrouter_response.ok:
            # ... error handling code ...
            error_text = openrouter_response.text
            print(f"OpenRouter API Error: {openrouter_response.status_code} - {error_text}")
            return create_response(openrouter_response.status_code, {
                "error": "External AI service failed.", 
                "details": error_text, 
                "status": openrouter_response.status_code
            })

        data = openrouter_response.json()
        print("DEBUG: Successfully received response from OpenRouter.") # <-- DEBUG LINE 5
        return create_response(200, data)

    except requests.exceptions.RequestException as e:
        print(f"Network Error contacting OpenRouter: {e}")
        return create_response(503, {
            "error": "Failed to connect to the external AI service.", 
            "details": str(e),
            "status": 503
        })
        
    except Exception as e:
        print(f"Internal Server Error before OpenRouter call: {e}")
        return create_response(500, {
            "error": "An unexpected server error occurred.", 
            "details": str(e),
            "status": 500
        })
