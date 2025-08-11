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
let messages = [];
let meetings = [];
let events = [];
let analytics = [];

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
    stage: "Series A",
    founded: 2022,
    location: "San Francisco, CA",
    employees: "15-25",
    website: "https://ecotech-solutions.com",
    views: 1247,
    interests: 23,
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
    stage: "Series A",
    founded: 2021,
    location: "Boston, MA",
    employees: "25-50",
    website: "https://healthai.com",
    views: 892,
    interests: 18,
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
    stage: "Series A",
    founded: 2023,
    location: "New York, NY",
    employees: "10-15",
    website: "https://financeflow.com",
    views: 1156,
    interests: 31,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "GreenStart",
    founders: "Maria Garcia, James Wilson",
    email: "hello@greenstart.io",
    domain: "Clean Energy",
    fundingGoal: 1500000,
    tractionSummary: "3 pilot projects completed, partnership with 2 utilities",
    videoDemo: "https://youtube.com/watch?v=demo4",
    logo: "default-logo.png",
    stage: "Seed",
    founded: 2023,
    location: "Austin, TX",
    employees: "5-10",
    website: "https://greenstart.io",
    views: 654,
    interests: 12,
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    name: "EduTech Pro",
    founders: "Kevin Chang, Rachel Smith",
    email: "team@edutechpro.com",
    domain: "Education Technology",
    fundingGoal: 2500000,
    tractionSummary: "50K students using platform, 200+ schools signed up",
    videoDemo: "https://youtube.com/watch?v=demo5",
    logo: "default-logo.png",
    stage: "Series A",
    founded: 2022,
    location: "Seattle, WA",
    employees: "20-30",
    website: "https://edutechpro.com",
    views: 987,
    interests: 27,
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
    company: "VentureCapital Partners",
    title: "Managing Partner",
    checkSize: "500K-2M",
    portfolio: ["CleanEnergy Corp", "GreenTech Solutions"],
    minInvestment: 500000,
    maxInvestment: 5000000,
    verified: true,
    profileViews: 234,
    dealsCompleted: 12,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Marcus Thompson",
    email: "m.thompson@techfund.com",
    focus: "Healthcare Technology",
    stage: "Seed",
    geography: "Global",
    company: "TechFund Ventures",
    title: "Principal",
    checkSize: "100K-1M",
    portfolio: ["MedTech AI", "HealthFirst Analytics"],
    minInvestment: 100000,
    maxInvestment: 2000000,
    verified: true,
    profileViews: 189,
    dealsCompleted: 8,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Sarah Wilson",
    email: "s.wilson@angelnetwork.com",
    focus: "Financial Technology",
    stage: "Pre-Seed",
    geography: "North America",
    company: "Angel Network Group",
    title: "Angel Investor",
    checkSize: "50K-500K",
    portfolio: ["PayFlow", "CreditSmart"],
    minInvestment: 50000,
    maxInvestment: 500000,
    verified: true,
    profileViews: 167,
    dealsCompleted: 15,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "Robert Chen",
    email: "r.chen@innovationfund.com",
    focus: "Education Technology",
    stage: "Series A",
    geography: "Asia Pacific",
    company: "Innovation Fund Asia",
    title: "Investment Director",
    checkSize: "1M-5M",
    portfolio: ["EduPlatform", "LearnSmart"],
    minInvestment: 1000000,
    maxInvestment: 10000000,
    verified: true,
    profileViews: 298,
    dealsCompleted: 6,
    createdAt: new Date().toISOString()
  }
];

// Initialize with sample data
startups = [...sampleStartups];
investors = [...sampleInvestors];

// Sample events data
events = [
  {
    id: 1,
    title: "CleanTech Demo Day 2024",
    date: "2024-12-27T14:00:00Z",
    type: "Demo Day",
    status: "upcoming",
    description: "Join the premier CleanTech pitch event featuring 15 innovative startups",
    startups: ["EcoTech Solutions", "GreenStart", "CleanAir Dynamics"],
    maxAttendees: 500,
    currentAttendees: 247,
    isLive: false,
    streamUrl: null,
    sponsors: ["GreenVentures", "EcoFund"],
    tags: ["CleanTech", "Sustainability", "Energy"]
  },
  {
    id: 2,
    title: "HealthTech Innovation Summit",
    date: "2024-12-30T16:00:00Z",
    type: "Summit",
    status: "upcoming",
    description: "Discover the latest in healthcare technology and digital health solutions",
    startups: ["HealthAI Analytics", "MedTech Pro"],
    maxAttendees: 300,
    currentAttendees: 189,
    isLive: false,
    streamUrl: null,
    sponsors: ["HealthVentures", "MedFund"],
    tags: ["HealthTech", "AI", "Digital Health"]
  }
];

// Sample messages data
messages = [
  {
    id: 1,
    from: "jennifer.chang@venturecap.com",
    to: "contact@ecotech.com",
    subject: "Investment Interest - EcoTech Solutions",
    message: "Hi Sarah, I'm very interested in EcoTech Solutions and would love to learn more about your clean technology approach.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    type: "investor_to_startup"
  }
];

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

  // GET /api/events - Get all events
  if (pathname === '/api/events' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ success: true, data: events }));
    return;
  }

  // POST /api/events/rsvp - RSVP to event
  if (pathname === '/api/events/rsvp' && req.method === 'POST') {
    parsePostData(req, (data) => {
      const newRSVP = {
        id: rsvps.length + 1,
        eventId: parseInt(data.eventId),
        userEmail: data.userEmail,
        userName: data.userName,
        userType: data.userType || 'attendee',
        timestamp: new Date().toISOString()
      };
      
      rsvps.push(newRSVP);
      
      // Update event attendee count
      const event = events.find(e => e.id === newRSVP.eventId);
      if (event) {
        event.currentAttendees++;
      }
      
      console.log('📅 New RSVP:', newRSVP);
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: newRSVP }));
    });
    return;
  }

  // GET /api/messages - Get messages for user
  if (pathname.startsWith('/api/messages') && req.method === 'GET') {
    const urlParts = pathname.split('/');
    const userEmail = urlParts[3]; // /api/messages/{email}
    
    if (userEmail && userEmail !== 'messages') {
      const decodedEmail = decodeURIComponent(userEmail);
      const userMessages = messages.filter(m => 
        m.from === decodedEmail || m.to === decodedEmail
      );
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: userMessages }));
    } else {
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: messages }));
    }
    return;
  }

  // POST /api/messages - Send message
  if (pathname === '/api/messages' && req.method === 'POST') {
    parsePostData(req, (data) => {
      const newMessage = {
        id: messages.length + 1,
        from: data.from,
        to: data.to,
        subject: data.subject || '',
        message: data.message,
        timestamp: new Date().toISOString(),
        read: false,
        type: data.type || 'general'
      };
      
      messages.push(newMessage);
      console.log('💬 New message:', newMessage);
      
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data: newMessage }));
    });
    return;
  }

  // GET /api/analytics/startup/:id - Get startup analytics
  if (pathname.startsWith('/api/analytics/startup/') && req.method === 'GET') {
    const startupId = parseInt(pathname.split('/')[4]);
    const startup = startups.find(s => s.id === startupId);
    
    if (!startup) {
      res.writeHead(404);
      res.end(JSON.stringify({ success: false, message: 'Startup not found' }));
      return;
    }

    const analyticsData = {
      views: {
        total: startup.views || 0,
        thisWeek: Math.floor((startup.views || 0) * 0.3),
        thisMonth: Math.floor((startup.views || 0) * 0.7)
      },
      interests: {
        total: startup.interests || 0,
        thisWeek: Math.floor((startup.interests || 0) * 0.4),
        thisMonth: Math.floor((startup.interests || 0) * 0.8)
      },
      messages: {
        total: messages.filter(m => m.to === startup.email).length,
        unread: messages.filter(m => m.to === startup.email && !m.read).length
      },
      topInvestorInterests: [
        { name: "Jennifer Chang", company: "VentureCapital Partners", interest: "High" },
        { name: "Marcus Thompson", company: "TechFund Ventures", interest: "Medium" }
      ]
    };

    res.writeHead(200);
    res.end(JSON.stringify({ success: true, data: analyticsData }));
    return;
  }

  // GET /api/search/startups - Search startups
  if (pathname.startsWith('/api/search/startups') && req.method === 'GET') {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const query = urlObj.searchParams.get('q') || '';
    const domain = urlObj.searchParams.get('domain') || '';
    const stage = urlObj.searchParams.get('stage') || '';
    const fundingMin = parseInt(urlObj.searchParams.get('fundingMin')) || 0;
    const fundingMax = parseInt(urlObj.searchParams.get('fundingMax')) || Infinity;

    let filteredStartups = startups;

    if (query) {
      filteredStartups = filteredStartups.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.domain.toLowerCase().includes(query.toLowerCase()) ||
        s.tractionSummary.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (domain) {
      filteredStartups = filteredStartups.filter(s => s.domain === domain);
    }

    if (stage) {
      filteredStartups = filteredStartups.filter(s => s.stage === stage);
    }

    if (fundingMin || fundingMax !== Infinity) {
      filteredStartups = filteredStartups.filter(s => 
        s.fundingGoal >= fundingMin && s.fundingGoal <= fundingMax
      );
    }

    res.writeHead(200);
    res.end(JSON.stringify({ success: true, data: filteredStartups }));
    return;
  }

  // GET /api/recommendations/investor/:email - Get personalized startup recommendations
  if (pathname.startsWith('/api/recommendations/investor/') && req.method === 'GET') {
    const investorEmail = decodeURIComponent(pathname.split('/')[4]);
    const investor = investors.find(i => i.email === investorEmail);
    
    if (!investor) {
      res.writeHead(404);
      res.end(JSON.stringify({ success: false, message: 'Investor not found' }));
      return;
    }

    // Simple recommendation based on investor focus
    const recommendations = startups.filter(s => 
      s.domain.includes(investor.focus.split(' ')[0]) &&
      s.fundingGoal >= investor.minInvestment &&
      s.fundingGoal <= investor.maxInvestment
    ).slice(0, 5);

    res.writeHead(200);
    res.end(JSON.stringify({ success: true, data: recommendations }));
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
  } else if (pathname === '/messages') {
    serveFile(res, 'messages.html');
  } else if (pathname === '/dashboard-startup') {
    serveFile(res, 'dashboard-startup.html');
  } else if (pathname === '/dashboard-investor') {
    serveFile(res, 'dashboard-investor.html');
  } else if (pathname === '/live-event') {
    serveFile(res, 'live-event.html');
  } else if (pathname === '/analytics') {
    serveFile(res, 'analytics.html');
  } else if (pathname === '/profile-settings') {
    serveFile(res, 'profile-settings.html');
  } else if (pathname === '/discover') {
    serveFile(res, 'discover.html');
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
