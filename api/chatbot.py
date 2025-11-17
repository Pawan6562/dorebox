import os
import json
import requests
from http.client import responses

# Key Vercel Environment Variables se aayegi
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY") 
MODEL_NAME = "nvidia/nemotron-nano-12b-v2-vl:free"

# Yeh 'handler' function hi Vercel user ki request aane par chalaata hai
def handler(request):

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
        # --- CHANGE 1: Client se messages array ko extract karna ---
        # Aapka bot front-end se message yahaan se aayega.
        try:
            body = json.loads(request.body.decode('utf-8'))
            messages_from_client = body.get('messages') 
        except:
            return create_response(400, {"error": "Invalid request body: 'messages' array is required.", "status": 400})

        if not messages_from_client:
            # Agar client ne koi message nahi bheja, toh ek default message daal dete hain
            messages_from_client = [
                {"role": "user", "content": "Hello! What can you tell me about Doraemon movies?"}
            ]
            
        # --- CHANGE 2: OpenRouter API Call ke liye dynamic data use karna ---
        # Ab yeh user ka bheja hua messages_from_client array use karega
        
        openrouter_headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "X-Title": "Dorebox AI Chatbot"
        }

        # First API call (Only one call needed for simple chat)
        response = requests.post(
          url="https://openrouter.ai/api/v1/chat/completions",
          headers=openrouter_headers, # Dynamic headers
          json={
              "model": MODEL_NAME,
              "messages": messages_from_client, # User's messages array
              "extra_body": {"reasoning": {"enabled": True}}
          },
          timeout=30
        )

        # --- CHANGE 3: Response ko theek se client ko bhejna ---
        if not response.ok:
            error_details = response.text
            return create_response(response.status_code, {
                "error": "External AI service failed.", 
                "details": error_details, 
                "status": response.status_code
            })

        # Successful response ko client ko forward karna
        data = response.json()
        return create_response(200, data)

    except requests.exceptions.RequestException as e:
        return create_response(503, {"error": "Failed to connect to AI service (Network).", "details": str(e), "status": 503})
        
    except Exception as e:
        # Jab yahan tak code pahunchta hai, toh yeh 500 JSON error bhejega.
        # Agar aapko baar-baar 'A server...' wala error aa raha hai, toh galti is 'except' se pehle ho rahi hai.
        return create_response(500, {"error": "An unexpected server error occurred on Vercel.", "details": str(e), "status": 500})
