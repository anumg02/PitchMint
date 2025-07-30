const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

// In-memory data storage (simulating database)
let startups = [];
let investors = [];
let interests = [];
let rsvps = [];

// Sample data for demo
const sampleStartups = [
  {
    id: 1,
    name: "EcoTech Solutions",
    founders: "Sarah Chen, Michael Rodriguez",
    email: "contact@ecotech.com",
    domain: "Clean Technology",
    fundingGoal: 2000000,
    tractionSummary: "100+ enterprise clients, $500K ARR, 50% month-over-month growth",
    videoDemo: "https://youtube.com/watch?v=demo1",
    logo: "default-logo.png",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "HealthAI Analytics",
    founders: "Dr. Emily Watson, Alex Kim",
    email: "founders@healthai.com",
    domain: "Healthcare Technology",
    fundingGoal: 5000000,
    tractionSummary: "Partnership with 3 major hospitals, FDA approval in progress",
    videoDemo: "https://youtube.com/watch?v=demo2",
    logo: "default-logo.png",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "FinanceFlow",
    founders: "David Park, Lisa Johnson",
    email: "team@financeflow.com",
    domain: "Financial Technology",
    fundingGoal: 3000000,
    tractionSummary: "25,000 active users, $200K MRR, Series A ready",
    videoDemo: "https://youtube.com/watch?v=demo3",
    logo: "default-logo.png",
    createdAt: new Date().toISOString()
  }
];

const sampleInvestors = [
  {
    id: 1,
    name: "Jennifer Chang",
    email: "j.chang@venturecap.com",
    focus: "Clean Technology",
    stage: "Series A",
    geography: "North America",
    minInvestment: 500000,
    maxInvestment: 5000000,
    verified: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Marcus Thompson",
    email: "m.thompson@techfund.com",
    focus: "Healthcare Technology",
    stage: "Seed",
    geography: "Global",
    minInvestment: 100000,
    maxInvestment: 2000000,
    verified: true,
    createdAt: new Date().toISOString()
  }
];

// Initialize with sample data
startups = [...sampleStartups];
investors = [...sampleInvestors];

// Helper function to get content type
function getContentType(filePath) {
  const ext = path.extname(filePath);
  const types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };
  return types[ext] || 'text/plain';
}

// Helper function to serve files
function serveFile(res, filePath) {
  const fullPath = path.join(__dirname, 'public', filePath);
  
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - File Not Found</h1>');
      return;
    }
    
    const contentType = getContentType(fullPath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

// Helper function to parse POST data
function parsePostData(req, callback) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    callback(querystring.parse(body));
  });
}

// API Routes
function handleAPI(req, res, pathname) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // GET /api/startups - Get all startups
  if (pathname === '/api/startups' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ success: true, data: startups }));
    return;
  }

  // POST /api/startups - Create new startup
  if (pathname === '/api/startups' && req.method === 'POST') {
    parsePostData(req, (data) => {
      const newStartup = {
        id: startups.length + 1,
        name: data.name || '',
        founders: data.founders || '',
        email: data.email || '',
        domain: data.domain || '',
        fundingGoal: parseInt(data.fundingGoal) || 0,
        tractionSummary: data.tractionSummary || '',
        videoDemo: data.videoDemo || '',
        logo: data.logo || 'default-logo.png',
        pitchDeck: data.pitchDeck || '',
        createdAt: new Date().toISOString()
      };
      
      startups.push(newStartup);
      console.log('📊 New startup registered:', newStartup.name);
      
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: newStartup }));
    });
    return;
  }

  // GET /api/investors - Get all investors
  if (pathname === '/api/investors' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ success: true, data: investors }));
    return;
  }

  // POST /api/investors - Create new investor
  if (pathname === '/api/investors' && req.method === 'POST') {
    parsePostData(req, (data) => {
      const newInvestor = {
        id: investors.length + 1,
        name: data.name || '',
        email: data.email || '',
        focus: data.focus || '',
        stage: data.stage || '',
        geography: data.geography || '',
        minInvestment: parseInt(data.minInvestment) || 0,
        maxInvestment: parseInt(data.maxInvestment) || 0,
        verified: true, // Auto-verify for demo
        createdAt: new Date().toISOString()
      };
      
      investors.push(newInvestor);
      console.log('💼 New investor registered:', newInvestor.name);
      
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: newInvestor }));
    });
    return;
  }

  // POST /api/interests - Record investor interest
  if (pathname === '/api/interests' && req.method === 'POST') {
    parsePostData(req, (data) => {
      const interest = {
        id: interests.length + 1,
        startupId: parseInt(data.startupId),
        investorName: data.investorName || '',
        investorEmail: data.investorEmail || '',
        message: data.message || '',
        createdAt: new Date().toISOString()
      };
      
      interests.push(interest);
      console.log('💡 New interest recorded for startup ID:', data.startupId);
      
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: interest }));
    });
    return;
  }

  // POST /api/rsvp - Record event RSVP
  if (pathname === '/api/rsvp' && req.method === 'POST') {
    parsePostData(req, (data) => {
      const rsvp = {
        id: rsvps.length + 1,
        eventId: data.eventId || '',
        name: data.name || '',
        email: data.email || '',
        type: data.type || '', // startup or investor
        createdAt: new Date().toISOString()
      };
      
      rsvps.push(rsvp);
      console.log('📅 New RSVP recorded for event:', data.eventId);
      
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: rsvp }));
    });
    return;
  }

  // GET /api/matches/:investorId - Get startup matches for investor
  if (pathname.startsWith('/api/matches/') && req.method === 'GET') {
    const investorId = parseInt(pathname.split('/')[3]);
    const investor = investors.find(i => i.id === investorId);
    
    if (!investor) {
      res.writeHead(404);
      res.end(JSON.stringify({ success: false, message: 'Investor not found' }));
      return;
    }

    // Simple matching logic based on domain/focus
    const matches = startups.filter(startup => 
      startup.domain.toLowerCase().includes(investor.focus.toLowerCase()) ||
      investor.focus.toLowerCase().includes(startup.domain.toLowerCase())
    ).slice(0, 3); // Limit to 3 matches

    res.writeHead(200);
    res.end(JSON.stringify({ success: true, data: matches }));
    return;
  }

  // Default 404 for unmatched API routes
  res.writeHead(404);
  res.end(JSON.stringify({ success: false, message: 'API endpoint not found' }));
}

// Create server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;

  console.log(`${req.method} ${pathname}`);

  // Handle API routes
  if (pathname.startsWith('/api/')) {
    handleAPI(req, res, pathname);
    return;
  }

  // Handle static file routes
  if (pathname === '/') {
    serveFile(res, 'index.html');
  } else if (pathname === '/register-startup') {
    serveFile(res, 'register-startup-new.html');
  } else if (pathname === '/register-investor') {
    serveFile(res, 'register-investor.html');
  } else if (pathname === '/pitches') {
    serveFile(res, 'pitches.html');
  } else if (pathname === '/events') {
    serveFile(res, 'events.html');
  } else if (pathname === '/mentors') {
    serveFile(res, 'mentors.html');
  } else if (pathname.startsWith('/css/') || pathname.startsWith('/js/') || pathname.startsWith('/images/')) {
    serveFile(res, pathname.substring(1));
  } else {
    // Try to serve as static file
    serveFile(res, pathname.substring(1));
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('🚀 PitchMint MVP Server Started!');
  console.log(`📁 Server running at http://localhost:${PORT}`);
  console.log('📊 Features available:');
  console.log('   ✅ Startup Registration');
  console.log('   ✅ Investor Registration');
  console.log('   ✅ Pitch Listings');
  console.log('   ✅ Interest Tracking');
  console.log('   ✅ Event RSVPs');
  console.log('   ✅ Mock Matchmaking');
  console.log('   ✅ Sample Data Loaded');
  console.log('');
  console.log('💡 Open http://localhost:3000 to view the platform');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🔴 Shutting down PitchMint server...');
  server.close(() => {
    console.log('✅ Server closed successfully');
    process.exit(0);
  });
});
