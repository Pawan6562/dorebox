import os
import json
import requests

# The API key must be set as an environment variable in Vercel
OPENROUTER_API_KEY = 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
MODEL_NAME = "nvidia/nemotron-nano-12b-v2-vl:free"

def handler(request):
    # Set CORS headers for security and client-side access
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    }

    if request.method == 'OPTIONS':
        # Handle preflight request
        return (200, headers, "")

    if request.method != 'POST':
        return (405, headers, json.dumps({"error": "Method Not Allowed"}))

    if not OPENROUTER_API_KEY:
        print("OPENROUTER_API_KEY is not set.")
        return (500, headers, json.dumps({"error": "Server configuration error: API key missing. Please set OPENROUTER_API_KEY in Vercel."}))

    try:
        # Parse the JSON body from the request
        try:
            # Vercel's Python runtime passes the request body as bytes
            body = json.loads(request.body.decode('utf-8'))
            messages = body.get('messages')
        except json.JSONDecodeError:
            return (400, headers, json.dumps({"error": "Invalid JSON in request body."}))
        except AttributeError:
            # Handle case where request.body might not be present or is not bytes
            return (400, headers, json.dumps({"error": "Missing or invalid request body."}))


        if not messages or not isinstance(messages, list):
            return (400, headers, json.dumps({"error": "Invalid request body: 'messages' array is required."}))

        # Prepare the request to OpenRouter
        openrouter_headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        }
        
        openrouter_payload = {
            "model": MODEL_NAME,
            "messages": messages,
            "extra_body": { "reasoning": { "enabled": True } }
        }

        openrouter_response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=openrouter_headers,
            json=openrouter_payload
        )

        if not openrouter_response.ok:
            error_text = openrouter_response.text
            print(f"OpenRouter API Error: {openrouter_response.status_code} {error_text}")
            return (openrouter_response.status_code, headers, json.dumps({"error": "External API call failed.", "details": error_text}))

        data = openrouter_response.json()
        # Vercel expects a tuple of (status_code, headers, body)
        return (200, headers, json.dumps(data))

    except Exception as e:
        print(f"Internal Server Error: {e}")
        return (500, headers, json.dumps({"error": f"An unexpected error occurred on the server: {str(e)}"}))

# Note: For Vercel deployment, the file should be named `api/chatbot.py` and Vercel will automatically detect it as a Python Serverless Function.
# The Vercel Python runtime uses the `handler` function signature for the request.
