import os
import json
import requests
# requests library ke liye, 'requests' ko requirements.txt mein zaroor likhna.

# Key Vercel Environment Variables se aayegi
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY") 
MODEL_NAME = "nvidia/nemotron-nano-12b-v2-vl:free"

def handler(request):
    # CORS Headers and Response Helper (Jaisa pehle tha)
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    }

    def create_response(status_code, body_data):
        if not isinstance(body_data, str):
            body = json.dumps(body_data)
        else:
            body = body_data
        return (status_code, headers, body)

    if request.method == 'OPTIONS':
        return create_response(200, "")

    if request.method != 'POST':
        return create_response(405, {"error": "Method Not Allowed", "status": 405})

    if not OPENROUTER_API_KEY:
        return create_response(500, {"error": "API key missing in Vercel settings.", "status": 500})

    try:
        # Client se messages array ko extract karna
        try:
            body = json.loads(request.body.decode('utf-8'))
            messages = body.get('messages') # Bot ka conversation history yahaan se aayega
        except:
            return create_response(400, {"error": "Invalid request body: 'messages' array is required.", "status": 400})

        # --- OPENROUTER API CALL LOGIC ---
        
        openrouter_headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "X-Title": "My Vercel API"
        }
        
        openrouter_payload = {
            "model": MODEL_NAME,
            "messages": messages,
            # 'reasoning' agar zaroori hai toh daalein, OpenRouter ke sample mein tha:
            "extra_body": { "reasoning": { "enabled": True } }  
        }

        # Request.post function (Same as OpenRouter's Python sample)
        openrouter_response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=openrouter_headers,
            json=openrouter_payload, # Use 'json' instead of 'data=json.dumps(...)' for requests
            timeout=30
        )
        
        # OpenRouter Response Handling
        if not openrouter_response.ok:
            error_details = openrouter_response.text
            return create_response(openrouter_response.status_code, {
                "error": "External AI service failed.", 
                "details": error_details, 
                "status": openrouter_response.status_code
            })

        # Successful response ko client ko forward karna
        data = openrouter_response.json()
        return create_response(200, data)

    except requests.exceptions.RequestException as e:
        # Network ya Timeout error
        return create_response(503, {"error": "Failed to connect to AI service.", "details": str(e), "status": 503})
        
    except Exception as e:
        # Other unexpected errors
        return create_response(500, {"error": "An unexpected server error occurred.", "details": str(e), "status": 500})
