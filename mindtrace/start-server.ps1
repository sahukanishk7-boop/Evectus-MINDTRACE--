# MINDTRACE — Launch Script
# Starts a local lightweight web server using Python

Write-Host "==========================================================" -ForegroundColor DarkGreen
Write-Host "   MINDTRACE: Adaptive AI Learning & Knowledge Tracing" -ForegroundColor Green
Write-Host "   'Know what you know. Learn what you don't.'" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor DarkGreen
Write-Host ""
Write-Host "Starting local HTTP server at http://localhost:8080..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to terminate the server at any time." -ForegroundColor Gray
Write-Host ""

Start-Process "http://localhost:8080"
python -m http.server 8080
