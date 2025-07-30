# PitchMint - Virtual Shark Tank Platform

A modern startup-investor networking platform where entrepreneurs can pitch their ideas to potential investors, just like Shark Tank!

## 🚀 Quick Start Options

### Option 1: Next.js App (Full Features) 🔥
Modern React/Next.js application with TypeScript and Tailwind CSS.

**Prerequisites:**
- Node.js 18+ ([Download here](https://nodejs.org))

**Setup:**
1. Double-click `setup-nextjs.bat` (Windows)
2. Or manually run:
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:3000`

### Option 2: Simple HTML Version (No Setup) ⚡
Standalone HTML/CSS/JS version that works immediately.

**Setup:**
1. Double-click `start-server.bat`
2. Or open `public/index.html` directly in browser
3. Open `http://localhost:3000`

## 🛠️ Tech Stack

### Next.js Version
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM (planned)

### Standalone Version  
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Styling**: Tailwind-inspired utility classes
- **Backend**: Node.js with built-in modules
- **Database**: In-memory storage

## 🎨 Design System

### Color Palette
- **Primary Navy**: `#004E89` - Headers, logo, main branding
- **Secondary Sky Blue**: `#00A8E8` - Action buttons, highlights  
- **Accent Gold**: `#FDC500` - Charts, icons, visual elements
- **Background**: `#F8FAFC` - Main background
- **Surface**: `#FFFFFF` - Cards, modals, containers
- **Text**: `#1F2937` - Primary text

## 🌟 Pages & Features

1. **Homepage** (`/`) - Hero section, stats, navigation
2. **Startup Registration** (`/register-startup.html`) - Register your startup
3. **Investor Registration** (`/register-investor.html`) - Join as investor
4. **Browse Pitches** (`/pitches.html`) - View startup pitches
5. **Live Events** (`/events.html`) - Virtual pitch events
6. **Find Mentors** (`/mentors.html`) - Connect with mentors

## 🔧 Customization

### Changing Colors
Edit the CSS variables in `public/css/tailwind-standalone.css`:

```css
:root {
  --primary: #004E89;      /* Change primary color */
  --secondary: #00A8E8;    /* Change secondary color */
  --accent: #FDC500;       /* Change accent color */
}
```

### Adding New Pages
1. Create a new HTML file in the `public/` folder
2. Use the same CSS classes as other pages
3. The server will automatically serve it

## 🔄 API Endpoints

The server provides these REST API endpoints:

- `GET /api/startups` - Get all startups
- `POST /api/startups` - Register a new startup
- `GET /api/investors` - Get all investors  
- `POST /api/investors` - Register a new investor
- `GET /api/pitches` - Get all pitches
- `GET /api/events` - Get all events

## 🚀 Deployment Ready

This application is ready to deploy to any platform that supports Node.js:
- Heroku
- Vercel
- Netlify
- Railway
- DigitalOcean App Platform

## 📝 License

MIT License - Feel free to use this project for your own ventures!

---

**Happy Pitching! 🦈💰**
