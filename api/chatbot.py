import os
import json
import requests
from http.server import BaseHTTPRequestHandler

# The API Key is fetched securely from Vercel Environment Variables
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY") 
MODEL_NAME = "nvidia/nemotron-nano-12b-v2-vl:free"

class handler(BaseHTTPRequestHandler):
    """Handles incoming Vercel requests and forwards them to OpenRouter."""

    def _set_headers(self, status_code=200, content_type='application/json'):
        """Set response headers including CORS."""
        self.send_response(status_code)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Content-Type', content_type)
        self.end_headers()

    def _send_json_response(self, status_code, data):
        """Send JSON response to client."""
        self._set_headers(status_code)
        response_body = json.dumps(data)
        self.wfile.write(response_body.encode('utf-8'))

    def do_OPTIONS(self):
        """Handle OPTIONS request (Pre-flight check)."""
        self._set_headers(200)
        return

    def do_POST(self):
        """Handle POST requests."""
        # 1. API Key Check
        if not OPENROUTER_API_KEY:
            print("OPENROUTER_API_KEY is missing!")
            self._send_json_response(500, {
                "error": "Server config error: API key missing.", 
                "status": 500
            })
            return

        try:
            # 2. Parse Request Body
            content_length = int(self.headers.get('Content-Length', 0))
            body_bytes = self.rfile.read(content_length)
            
            try:
                body = json.loads(body_bytes.decode('utf-8'))
                messages = body.get('messages')
            except json.JSONDecodeError:
                self._send_json_response(400, {
                    "error": "Invalid or missing JSON in request body.", 
                    "status": 400
                })
                return

            if not messages or not isinstance(messages, list):
                # Fallback if messages array is empty/invalid
                messages = [{"role": "user", "content": "Tell me about Doraemon."}]

            # 3. Prepare and Execute OpenRouter Request
            openrouter_headers = {
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "X-Title": "Dorebox Chatbot"
            }
            
            openrouter_payload = {
                "model": MODEL_NAME,
                "messages": messages
            }

            openrouter_response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers=openrouter_headers,
                json=openrouter_payload,
                timeout=30
            )
            
            # 4. Handle OpenRouter Errors
            if not openrouter_response.ok:
                error_details = openrouter_response.text
                self._send_json_response(openrouter_response.status_code, {
                    "error": "External AI service failed.", 
                    "details": error_details, 
                    "status": openrouter_response.status_code
                })
                return

            # 5. Success: Send AI response back to client
            data = openrouter_response.json()
            self._send_json_response(200, data)

        except requests.exceptions.RequestException as e:
            # Network/Timeout Errors (503)
            self._send_json_response(503, {
                "error": "Failed to connect to AI service (Network/Timeout).", 
                "details": str(e), 
                "status": 503
            })
            
        except Exception as e:
            # Unexpected Internal Server Errors (500)
            self._send_json_response(500, {
                "error": "An unexpected server error occurred on Vercel.", 
                "details": str(e), 
                "status": 500
            })
