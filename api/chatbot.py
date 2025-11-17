from http.server import BaseHTTPRequestHandler
import json
import os
import requests

# API Key from Vercel Environment Variables
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY") 
MODEL_NAME = "nvidia/nemotron-nano-12b-v2-vl:free"

class handler(BaseHTTPRequestHandler):
    
    def do_OPTIONS(self):
        """Handle CORS preflight"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        """Handle POST requests"""
        try:
            # Check API Key
            if not OPENROUTER_API_KEY:
                self._send_error(500, "API key missing from environment")
                return
            
            # Read and parse request body
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length == 0:
                self._send_error(400, "Empty request body")
                return
                
            body_data = self.rfile.read(content_length)
            body = json.loads(body_data.decode('utf-8'))
            
            messages = body.get('messages', [])
            if not messages:
                messages = [{"role": "user", "content": "Hello!"}]
            
            # Call OpenRouter API
            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                    "X-Title": "Dorebox Chatbot"
                },
                json={
                    "model": MODEL_NAME,
                    "messages": messages
                },
                timeout=30
            )
            
            # Handle response
            if response.ok:
                self._send_success(response.json())
            else:
                self._send_error(response.status_code, f"OpenRouter error: {response.text}")
                
        except json.JSONDecodeError:
            self._send_error(400, "Invalid JSON in request")
        except requests.exceptions.Timeout:
            self._send_error(504, "Request timeout")
        except requests.exceptions.RequestException as e:
            self._send_error(503, f"Network error: {str(e)}")
        except Exception as e:
            self._send_error(500, f"Server error: {str(e)}")
    
    def _send_success(self, data):
        """Send successful JSON response"""
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
    
    def _send_error(self, status_code, message):
        """Send error JSON response"""
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        error_data = {"error": message, "status": status_code}
        self.wfile.write(json.dumps(error_data).encode('utf-8'))
