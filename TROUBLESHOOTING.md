# 🚨 TypeScript/Next.js Error Troubleshooting

## Current Issues

You're seeing these errors because **Next.js and React dependencies are not installed**:

```
Cannot find module 'next' or its corresponding type declarations.
Cannot find module 'react' or its corresponding type declarations.
JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
```

## ✅ Solution Steps

### 1. Install Node.js (if not already installed)
- Download from [nodejs.org](https://nodejs.org)
- Choose **LTS version** (recommended)
- Make sure "Add to PATH" is checked during installation

### 2. Install Dependencies
**Option A: Automatic Setup**
```bash
# Double-click this file:
setup-nextjs.bat
```

**Option B: Manual Installation**
```bash
# Open terminal in project folder and run:
npm install

# If that fails, try:
npm cache clean --force
npm install --legacy-peer-deps
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Navigate to: `http://localhost:3000`

## 🔧 Common Installation Issues

### Issue: "npm is not recognized"
**Solution:**
1. Restart your terminal/command prompt
2. Verify Node.js installation: `node --version`
3. Verify npm installation: `npm --version`

### Issue: "Permission denied" or "EACCES"
**Solution:**
1. Run Command Prompt as Administrator
2. Or configure npm global directory:
   ```bash
   npm config set prefix "C:\Users\%USERNAME%\AppData\Roaming\npm"
   ```

### Issue: "Network timeout" or "ENETUNREACH"
**Solution:**
1. Check internet connection
2. Try different npm registry:
   ```bash
   npm config set registry https://registry.npmjs.org/
   ```
3. Use corporate proxy settings if needed

### Issue: "Dependency conflicts"
**Solution:**
```bash
# Clear everything and start fresh:
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```

## 📁 Project Structure After Setup

```
PitchMint/
├── 📂 src/                          # Next.js source files
│   ├── 📂 app/                      # App Router files
│   │   ├── 📄 layout.tsx            # Root layout
│   │   ├── 📄 page.tsx              # Homepage
│   │   └── 📄 globals.css           # Global styles
│   └── 📂 components/               # React components
│       ├── 📂 layout/
│       │   ├── 📄 Navbar.tsx        # Navigation
│       │   └── 📄 Footer.tsx        # Footer
│       ├── 📂 providers/
│       │   ├── 📄 AuthProvider.tsx  # Authentication
│       │   └── 📄 ToastProvider.tsx # Notifications
│       └── 📂 sections/
│           └── 📄 HeroSection.tsx   # Hero component
├── 📂 public/                       # Static files
├── 📂 node_modules/                 # Dependencies (after npm install)
├── 📄 package.json                  # Project config
├── 📄 tailwind.config.js            # Tailwind CSS config
├── 📄 tsconfig.json                 # TypeScript config
└── 📄 next.config.js                # Next.js config
```

## 🎯 Verification Steps

After installation, verify everything works:

1. **Check dependencies:**
   ```bash
   npm list next react react-dom
   ```

2. **Check TypeScript:**
   ```bash
   npx tsc --noEmit
   ```

3. **Check Next.js:**
   ```bash
   npm run build
   ```

## 🚀 Alternative: Use Standalone Version

If Next.js setup continues to fail, use the standalone HTML version:

1. **Keep it simple:** Use `public/index.html` directly
2. **Run basic server:** `node simple-server.js`
3. **No dependencies needed:** Works with just Node.js

## 📧 Still Having Issues?

1. **Check Node.js version:** `node --version` (should be 18+)
2. **Check npm version:** `npm --version` (should be 9+)
3. **Clear all caches:**
   ```bash
   npm cache clean --force
   npx clear-npx-cache
   ```
4. **Restart your computer** (sometimes needed for PATH changes)

---

**The project will work perfectly once dependencies are installed!** 🚀
