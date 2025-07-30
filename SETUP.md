# 🔧 PitchMint Setup Guide

## ❌ Current Issue: Node.js Not Installed

You're seeing errors because **Node.js is not installed** on your system. Here's how to fix it:

## 🚀 Step-by-Step Installation

### 1. Install Node.js
1. **Download Node.js**: Go to [nodejs.org](https://nodejs.org)
2. **Choose LTS version** (recommended for stability)
3. **Download the Windows Installer** (.msi file)
4. **Run the installer** with these settings:
   - ✅ Check "Add to PATH" (very important!)
   - ✅ Install npm package manager
   - ✅ Install additional tools for native modules

### 2. Verify Installation
After installation, open a **NEW** Command Prompt or PowerShell and run:
```bash
node --version
npm --version
```
You should see version numbers like `v18.17.0` and `9.6.7`

### 3. Install Project Dependencies
```bash
cd "C:\Users\anubh\OneDrive\Documents\PitchMint"
npm install
```

### 4. Build Tailwind CSS
```bash
npm run build
```

### 5. Start the Server
```bash
npm start
```

## 🛠️ Troubleshooting

### Problem: "node is not recognized"
**Solution**: 
1. Restart your terminal/command prompt
2. If still not working, manually add Node.js to PATH:
   - Search "Environment Variables" in Windows
   - Add `C:\Program Files\nodejs` to PATH
   - Restart terminal

### Problem: npm install fails
**Solution**:
1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules` folder and `package-lock.json`
3. Run `npm install` again

### Problem: Permission errors
**Solution**:
1. Run Command Prompt as Administrator
2. Or configure npm to use different directory:
   ```bash
   npm config set prefix "C:\Users\%USERNAME%\AppData\Roaming\npm"
   ```

## 🎯 Alternative: Use Standalone Version (No npm needed)

If you can't install Node.js, the standalone version already works:

1. **Install only Node.js** (no npm packages needed)
2. **Double-click** `start-server.bat`
3. **Open** `http://localhost:3000`

The standalone CSS (`tailwind-standalone.css`) already has all your colors and styles!

## 📁 File Structure After Setup

```
PitchMint/
├── 📄 tailwind.config.js          ✅ Fixed (JS instead of TS)
├── 📄 package.json                ✅ Updated scripts
├── 📄 simple-server.js             ✅ Works without npm install
├── 📄 start-server.bat             ✅ Easy startup
├── 📂 public/
│   ├── 📄 index.html               ✅ Modern design
│   ├── 📂 css/
│   │   ├── 📄 tailwind-standalone.css  ✅ Ready to use
│   │   ├── 📄 input.css             ✅ For Tailwind build
│   │   └── 📄 output.css            🔄 Generated after npm run build
│   └── 📂 js/
│       └── 📄 main.js               ✅ Frontend logic
└── 📄 README.md                    ✅ Documentation
```

## 🎨 Current Status

- ✅ **HTML pages** - Working perfectly
- ✅ **Standalone CSS** - Beautiful design with your colors
- ✅ **JavaScript** - All functionality works
- ✅ **Server** - Node.js server ready
- ❌ **Tailwind build** - Needs Node.js + npm install
- ❌ **TypeScript config** - Fixed (converted to JS)

## 🌟 Next Steps

**Option A: Full Setup**
```bash
# After installing Node.js:
npm install
npm run build
npm start
```

**Option B: Quick Start**
```bash
# Just install Node.js, then:
node simple-server.js
```

**Option C: No Setup**
- Open `public/index.html` directly in browser
- Limited functionality (no backend)

---

**Need help?** The project works great with the standalone CSS! 🚀
