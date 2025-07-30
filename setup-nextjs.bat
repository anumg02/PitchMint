@echo off
echo 🔧 PitchMint Next.js Setup Script
echo ==================================
echo.

echo 📋 Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed
    echo 📥 Please install Node.js from: https://nodejs.org
    echo    Choose the LTS version ^(recommended^)
    pause
    exit /b 1
)

echo ✅ Node.js is installed
node --version
echo.

echo 📦 Installing Next.js dependencies...
echo This may take a few minutes...
echo.

npm install

if %errorlevel% neq 0 (
    echo ❌ npm install failed
    echo.
    echo 🔧 Trying alternative installation methods:
    echo.
    echo 1. Clear npm cache:
    npm cache clean --force
    echo.
    echo 2. Retry installation:
    npm install --legacy-peer-deps
    
    if %errorlevel% neq 0 (
        echo ❌ Installation still failed
        echo.
        echo 💡 Try these troubleshooting steps:
        echo 1. Delete node_modules folder and package-lock.json
        echo 2. Run: npm install
        echo 3. If still failing, run as Administrator
        pause
        exit /b 1
    )
)

echo.
echo ✅ Dependencies installed successfully!
echo.
echo 🚀 Starting development server...
echo 📱 Your app will open at: http://localhost:3000
echo.
echo 💡 Press Ctrl+C to stop the server
echo.

npm run dev

pause
