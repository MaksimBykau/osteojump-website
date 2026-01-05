#!/usr/bin/env python3
"""
Local development server with clean URL support.
Handles routes like /about, /prices, etc. by serving about.html, prices.html, etc.
"""
import http.server
import socketserver
import os
from urllib.parse import urlparse, unquote

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add cache control headers
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        path = unquote(parsed_path.path)
        
        # Remove leading slash
        if path.startswith('/'):
            path = path[1:]
        
        # If path is empty or just '/', serve index.html
        if path == '' or path == '/':
            path = 'index.html'
        # If path doesn't have an extension and file doesn't exist, try adding .html
        elif not os.path.exists(path) and not '.' in os.path.basename(path):
            # Check if .html version exists
            html_path = path + '.html'
            if os.path.exists(html_path):
                path = html_path
            else:
                # If still not found, try index.html in that directory
                if os.path.isdir(path) and os.path.exists(os.path.join(path, 'index.html')):
                    path = os.path.join(path, 'index.html')
                else:
                    # Return 404
                    self.send_error(404, "File not found")
                    return
        
        # Set the path
        self.path = '/' + path
        
        # Add proper MIME type for JSON files
        if path.endswith('.json'):
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
            self.end_headers()
            try:
                with open(path, 'rb') as f:
                    self.wfile.write(f.read())
            except FileNotFoundError:
                self.send_error(404, "File not found")
            return
        
        # Call parent method to serve the file
        return super().do_GET()
    
    def log_message(self, format, *args):
        # Custom log format
        print(f"[{self.log_date_time_string()}] {args[0]}")

if __name__ == '__main__':
    PORT = 8000
    
    # Try to bind to the port, if it's busy, try next port
    for port in range(PORT, PORT + 10):
        try:
            with socketserver.TCPServer(("", port), CustomHTTPRequestHandler) as httpd:
                print(f"🚀 Server running at http://localhost:{port}/")
                print("📝 Clean URLs supported: /about, /prices, /reviews, /faq")
                print("⏹️  Press Ctrl+C to stop the server")
                try:
                    httpd.serve_forever()
                except KeyboardInterrupt:
                    print("\n👋 Server stopped")
                break
        except OSError as e:
            if e.errno == 48:  # Address already in use
                if port < PORT + 9:
                    continue
                else:
                    print(f"❌ Error: Could not find a free port. Ports {PORT}-{PORT+9} are all in use.")
                    print("💡 Try: lsof -ti:8000 | xargs kill -9")
                    raise
            else:
                raise

