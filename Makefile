.PHONY: help server server-simple stop restart install-deps thumbnails clean css-vars locale-keys build serve-dist stop-dist

# Default target
help:
	@echo "Available commands:"
	@echo "  make server      - Start local server with clean URL support (Python)"
	@echo "  make server-simple - Start simple Python HTTP server"
	@echo "  make stop        - Stop the server running on port 8000"
	@echo "  make restart     - Stop and start the server"
	@echo "  make build       - Build static site into dist/"
	@echo "  make serve-dist  - Serve dist/ on port 8001"
	@echo "  make stop-dist   - Stop dist server on port 8001"
	@echo "  make thumbnails  - Generate thumbnails for diplomas"
	@echo "  make clean       - Remove generated thumbnails and dist/"
	@echo "  make css-vars    - List all CSS custom properties"
	@echo "  make locale-keys - Show translation key structure"

# Start server with clean URL support
server:
	@echo "Starting server with clean URL support..."
	@python3 server.py

# Start simple Python HTTP server (fallback)
server-simple:
	@echo "Starting simple HTTP server..."
	@python3 -m http.server 8000

# Stop server running on port 8000
stop:
	@echo "Stopping server on port 8000..."
	@-lsof -ti:8000 | xargs kill -9 2>/dev/null || echo "No server running on port 8000"

# Restart server (stop and start)
restart: stop
	@echo "Waiting for port to be released..."
	@sleep 1
	@echo "Starting server..."
	@python3 server.py

# Generate thumbnails for diplomas
thumbnails:
	@echo "Generating thumbnails for diplomas..."
	@mkdir -p images/diplomas/thumbs
	@for img in images/diplomas/*.jpg images/diplomas/*.jpeg; do \
		if [ -f "$$img" ]; then \
			filename=$$(basename "$$img"); \
			name=$${filename%.*}; \
			extension=$${filename##*.}; \
			sips -Z 800 -s format jpeg -s formatOptions 80 "$$img" --out "images/diplomas/thumbs/$${name}_thumb.$${extension}" && \
			echo "Created thumbnail for: $$filename"; \
		fi \
	done
	@echo "✅ Thumbnails generation complete!"

# List all CSS custom properties with values
css-vars:
	@grep -h -E '^\s+\-\-[a-zA-Z-]+:' css/style.css | sed 's/^[[:space:]]*//' | sort -u

# Show translation key structure (top-level keys with subkeys)
locale-keys:
	@python3 -c "\
	import json; \
	data = json.load(open('locales/en.json')); \
	[print(f'{k}: {sorted(v.keys()) if isinstance(v, dict) else v}') for k, v in data.items()]"

# Build static site (SSG)
build:
	@cd scripts && npm install --silent
	@node scripts/build.js

# Serve dist/ for testing (port 8001)
serve-dist:
	@echo "Serving dist/ on http://localhost:8001"
	@cd dist && python3 -m http.server 8001

# Stop dist server on port 8001
stop-dist:
	@echo "Stopping server on port 8001..."
	@-lsof -ti:8001 | xargs kill -9 2>/dev/null || echo "No server running on port 8001"

# Clean generated files
clean:
	@echo "Removing thumbnails and dist/..."
	@rm -rf images/diplomas/thumbs
	@rm -rf dist
	@echo "✅ Clean complete!"

