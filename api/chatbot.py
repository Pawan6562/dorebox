from http.server import BaseHTTPRequestHandler
import json
import os
import requests

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY") 

# ✅ BETTER MODEL - No publication required
MODEL_NAME = "meta-llama/llama-3.2-3b-instruct:free"

SYSTEM_PROMPT = """You are DoreBox AI Support - a friendly chatbot for DoreBox website.

ABOUT DOREBOX:
- Website: dorebox.vercel.app
- Free Doraemon movies in Hindi
- 40+ movies available
- Features: Watch online, download movies

YOUR ROLE:
- Help users find movies
- Answer website questions
- Be friendly and helpful
- Reply in simple English or Hinglish

RULES:
- Keep responses SHORT (2-3 sentences)
- Use simple language
- Add 1-2 emojis
- Be helpful and clear

EXAMPLE:
User: "movie suggest karo"
You: "Popular movies: Nobita's Dinosaur, Steel Troops, Stand by Me. Which type chahiye? 🎬"
"""

class handler(BaseHTTPRequestHandler):
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        try:
            if not OPENROUTER_API_KEY:
                self._send_error(500, "API key missing")
                return
            
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length == 0:
                self._send_error(400, "Empty request")
                return
                
            body_data = self.rfile.read(content_length)
            body = json.loads(body_data.decode('utf-8'))
            
            user_messages = body.get('messages', [])
            
            messages = [{"role": "system", "content": SYSTEM_PROMPT}]
            
            if user_messages:
                messages.extend(user_messages)
            else:
                messages.append({"role": "user", "content": "Hello"})
            
            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                    "X-Title": "DoreBox Support"
                },
                json={
                    "model": MODEL_NAME,
                    "messages": messages,
                    "temperature": 0.5,
                    "max_tokens": 150
                },
                timeout=30
            )
            
            if response.ok:
                self._send_success(response.json())
            else:
                self._send_error(response.status_code, f"Error: {response.text}")
                
        except json.JSONDecodeError:
            self._send_error(400, "Invalid JSON")
        except Exception as e:
            self._send_error(500, f"Error: {str(e)}")
    
    def _send_success(self, data):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
    
    def _send_error(self, status_code, message):
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        error_data = {"error": message, "status": status_code}
        self.wfile.write(json.dumps(error_data).encode('utf-8'))
