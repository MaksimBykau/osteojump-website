.PHONY: help server server-simple stop restart install-deps thumbnails clean

# Default target
help:
	@echo "Available commands:"
	@echo "  make server      - Start local server with clean URL support (Python)"
	@echo "  make server-simple - Start simple Python HTTP server"
	@echo "  make stop        - Stop the server running on port 8000"
	@echo "  make restart     - Stop and start the server"
	@echo "  make thumbnails  - Generate thumbnails for diplomas"
	@echo "  make clean       - Remove generated thumbnails"

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

# Clean generated files
clean:
	@echo "Removing thumbnails..."
	@rm -rf images/diplomas/thumbs
	@echo "✅ Clean complete!"

