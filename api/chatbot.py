from http.server import BaseHTTPRequestHandler
import json
import os
import requests
from datetime import datetime

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY") 

# ✅ Google Gemma 3 27B - Excellent free model
MODEL_NAME = "google/gemma-3-27b-it:free"

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
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        try:
            # ✅ Check API key
            if not OPENROUTER_API_KEY:
                self._send_error(500, "Server configuration error: API key missing")
                return
            
            # ✅ Validate request has content
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length == 0:
                self._send_error(400, "Empty request body")
                return
            
            # ✅ Check content length limit (prevent huge requests)
            if content_length > 10000:  # 10KB limit
                self._send_error(413, "Request too large")
                return
                
            body_data = self.rfile.read(content_length)
            body = json.loads(body_data.decode('utf-8'))
            
            user_messages = body.get('messages', [])
            
            # ✅ Validate messages array
            if not isinstance(user_messages, list):
                self._send_error(400, "Messages must be an array")
                return
            
            # ✅ Limit conversation history (prevent abuse)
            if len(user_messages) > 20:
                self._send_error(400, "Too many messages. Maximum 20 allowed.")
                return
            
            # ✅ Validate individual messages
            for msg in user_messages:
                if not isinstance(msg, dict) or 'role' not in msg or 'content' not in msg:
                    self._send_error(400, "Invalid message format")
                    return
                if len(str(msg.get('content', ''))) > 1000:
                    self._send_error(400, "Message too long. Maximum 1000 characters.")
                    return
            
            # Build messages array with system prompt
            messages = [{"role": "system", "content": SYSTEM_PROMPT}]
            
            if user_messages:
                messages.extend(user_messages)
            else:
                messages.append({"role": "user", "content": "Hello"})
            
            # ✅ Make API request with better error handling
            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                    "X-Title": "DoreBox Support",
                    "HTTP-Referer": "https://dorebox.vercel.app"
                },
                json={
                    "model": MODEL_NAME,
                    "messages": messages,
                    "temperature": 0.7,  # Slightly higher for more natural responses
                    "max_tokens": 400,   # ✅ Increased from 150 to 400
                    "top_p": 0.9
                },
                timeout=30
            )
            
            if response.ok:
                self._send_success(response.json())
            else:
                # ✅ Better error handling for API errors
                try:
                    error_data = response.json()
                    error_msg = error_data.get('error', {})
                    if isinstance(error_msg, dict):
                        error_msg = error_msg.get('message', 'Unknown API error')
                    self._send_error(response.status_code, f"API Error: {error_msg}")
                except:
                    self._send_error(response.status_code, f"API Error: {response.text[:200]}")
                
        except json.JSONDecodeError:
            self._send_error(400, "Invalid JSON format")
        except requests.Timeout:
            self._send_error(504, "Request timeout. Please try again.")
        except requests.RequestException as e:
            self._send_error(502, f"Network error: {str(e)[:100]}")
        except Exception as e:
            self._send_error(500, f"Server error: {str(e)[:100]}")
    
    def _send_success(self, data):
        """Send successful response"""
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))
    
    def _send_error(self, status_code, message):
        """Send error response"""
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        error_data = {
            "error": message,
            "status": status_code,
            "timestamp": datetime.utcnow().isoformat()
        }
        self.wfile.write(json.dumps(error_data).encode('utf-8'))
