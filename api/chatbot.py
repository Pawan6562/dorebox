import os
import json
import requests
from http.client import responses

# The API Key is fetched securely from Vercel Environment Variables
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY") 
MODEL_NAME = "nvidia/nemotron-nano-12b-v2-vl:free"

def handler(request):
    """Handles incoming Vercel requests and forwards them to OpenRouter."""

    # 1. CORS Headers for Web API
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

    # 2. Handle OPTIONS Request (Pre-flight check)
    if request.method == 'OPTIONS':
        return create_response(200, "")

    if request.method != 'POST':
        return create_response(405, {"error": "Method Not Allowed", "status": 405})

    # 3. API Key Check
    if not OPENROUTER_API_KEY:
        print("OPENROUTER_API_KEY is missing!")
        return create_response(500, {"error": "Server config error: API key missing.", "status": 500})

    try:
        # 4. Parse Request Body (Get 'messages' from the user's chat interface)
        try:
            body = json.loads(request.body.decode('utf-8'))
            messages = body.get('messages')
        except:
            return create_response(400, {"error": "Invalid or missing JSON in request body.", "status": 400})

        if not messages or not isinstance(messages, list):
            # Fallback if messages array is empty/invalid
            messages = [{"role": "user", "content": "Tell me about Doraemon."}] 

        # 5. Prepare and Execute OpenRouter Request
        openrouter_headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "X-Title": "Dorebox Chatbot"
        }
        
        openrouter_payload = {
            "model": MODEL_NAME,
            "messages": messages,
            "extra_body": { "reasoning": { "enabled": True } }  
        }

        openrouter_response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=openrouter_headers,
            json=openrouter_payload,
            timeout=30
        )
        
        # 6. Handle OpenRouter Errors
        if not openrouter_response.ok:
            error_details = openrouter_response.text
            return create_response(openrouter_response.status_code, {
                "error": "External AI service failed.", 
                "details": error_details, 
                "status": openrouter_response.status_code
            })

        # 7. Success: Send AI response back to client
        data = openrouter_response.json()
        return create_response(200, data)

    except requests.exceptions.RequestException as e:
        # Network/Timeout Errors (503)
        return create_response(503, {"error": "Failed to connect to AI service (Network/Timeout).", "details": str(e), "status": 503})
        
    except Exception as e:
        # Unexpected Internal Server Errors (500)
        # Yeh woh final error hai jahan "A server..." aata hai.
        return create_response(500, {"error": "An unexpected server error occurred on Vercel.", "details": str(e), "status": 500})
