from http.server import BaseHTTPRequestHandler
import json
import os
import requests

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY") 
MODEL_NAME = "nvidia/nemotron-nano-12b-v2-vl:free"

# ✨ CUSTOM SYSTEM PROMPT - DoreBox ke liye specially designed
SYSTEM_PROMPT = """You are DoreBox AI Support Assistant - a helpful chatbot for the DoreBox website.

**About DoreBox:**
- DoreBox (dorebox.vercel.app) is a FREE streaming platform for Doraemon and Nobita movies in Hindi
- We offer all Doraemon movies online for free watching and downloading
- Target audience: Doraemon fans, especially kids and families in India
- Website features: Movie streaming, downloads, search functionality, and user rewards

**Your Role:**
- Help users find Doraemon movies
- Answer questions about the website and its features
- Guide users on how to watch or download movies
- Be friendly, helpful, and enthusiastic about Doraemon
- Always respond in SIMPLE HINGLISH (Hindi + English mix that's easy to read)

**Response Format Rules:**
1. Keep responses SHORT and CLEAR (2-3 sentences max)
2. Use simple Hinglish that anyone can understand
3. Use emojis sparingly (1-2 per message)
4. NO special symbols or formatting characters
5. Be conversational and friendly

**Available Movies (examples you can mention):**
- Doraemon: Nobita's Little Star Wars
- Doraemon: Nobita and the Steel Troops
- Doraemon: Nobita's Dinosaur
- Doraemon: Stand by Me
- And many more classic Doraemon films

**Common User Questions:**
- "Which movies are available?" → Mention we have 40+ Doraemon movies
- "How to download?" → Explain the download button on movie pages
- "Is it free?" → Yes, completely free!
- "In Hindi?" → Yes, all movies in Hindi

Remember: Keep it simple, helpful, and Doraemon-focused! 🎬"""

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
            if not OPENROUTER_API_KEY:
                self._send_error(500, "API key missing")
                return
            
            # Read request
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length == 0:
                self._send_error(400, "Empty request")
                return
                
            body_data = self.rfile.read(content_length)
            body = json.loads(body_data.decode('utf-8'))
            
            user_messages = body.get('messages', [])
            
            # ✨ ADD SYSTEM PROMPT at the beginning
            messages = [
                {"role": "system", "content": SYSTEM_PROMPT}
            ]
            
            # Add user messages
            if user_messages:
                messages.extend(user_messages)
            else:
                messages.append({"role": "user", "content": "Hello!"})
            
            # Call OpenRouter API
            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                    "X-Title": "DoreBox Chatbot"
                },
                json={
                    "model": MODEL_NAME,
                    "messages": messages,
                    "temperature": 0.7,  # More consistent responses
                    "max_tokens": 200    # Short responses
                },
                timeout=30
            )
            
            if response.ok:
                self._send_success(response.json())
            else:
                self._send_error(response.status_code, f"AI error: {response.text}")
                
        except json.JSONDecodeError:
            self._send_error(400, "Invalid JSON")
        except requests.exceptions.Timeout:
            self._send_error(504, "Timeout")
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
