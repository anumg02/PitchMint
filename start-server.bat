@echo off
echo 🚀 PitchMint - Virtual Shark Tank Platform
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is NOT installed
    echo.
    echo 📥 To install Node.js:
    echo    1. Visit: https://nodejs.org
    echo    2. Download the LTS version ^(recommended^)
    echo    3. Install with default settings
    echo    4. Restart this script
    echo.
    echo 💡 Alternative: Open public/index.html directly in browser
    echo    ^(Limited functionality without server^)
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
node --version

echo.
echo 🌐 Starting PitchMint server...
echo 📂 Using standalone CSS ^(no npm build needed^)
echo � Server will start at: http://localhost:3000
echo.
echo 💡 Press Ctrl+C to stop the server
echo ========================================
echo.

REM Start the server
node simple-server.js

echo.
echo 👋 Server stopped. Press any key to exit.
pause >nul
