// Simple HTTP server that works without npm install
// This uses only Node.js built-in modules - no external dependencies

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Simple in-memory storage (no database needed)
let startups = [];
let investors = [];
let pitches = [];
let events = [];

// MIME types for different file extensions
const mimeTypes = {
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

// Helper function to serve static files
function serveStaticFile(filePath, response) {
    const fullPath = path.join(__dirname, 'public', filePath);
    const extname = path.extname(fullPath);
    const contentType = mimeTypes[extname] || 'text/plain';
    
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            console.log(`File not found: ${fullPath}`);
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('File not found');
            return;
        }
        
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(data);
    });
}

// Create the server
const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const pathname = parsedUrl.pathname;
    const method = request.method;
    
    // Handle CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (method === 'OPTIONS') {
        response.writeHead(200);
        response.end();
        return;
    }
    
    // API Routes
    if (pathname.startsWith('/api/')) {
        response.setHeader('Content-Type', 'application/json');
        
        if (pathname === '/api/startups' && method === 'GET') {
            response.writeHead(200);
            response.end(JSON.stringify(startups));
            
        } else if (pathname === '/api/startups' && method === 'POST') {
            let body = '';
            request.on('data', chunk => body += chunk);
            request.on('end', () => {
                try {
                    const startup = JSON.parse(body);
                    startup.id = Date.now();
                    startup.createdAt = new Date();
                    startups.push(startup);
                    response.writeHead(201);
                    response.end(JSON.stringify(startup));
                } catch (error) {
                    response.writeHead(400);
                    response.end(JSON.stringify({ error: 'Invalid JSON' }));
                }
            });
            
        } else if (pathname === '/api/investors' && method === 'GET') {
            response.writeHead(200);
            response.end(JSON.stringify(investors));
            
        } else if (pathname === '/api/investors' && method === 'POST') {
            let body = '';
            request.on('data', chunk => body += chunk);
            request.on('end', () => {
                try {
                    const investor = JSON.parse(body);
                    investor.id = Date.now();
                    investor.createdAt = new Date();
                    investors.push(investor);
                    response.writeHead(201);
                    response.end(JSON.stringify(investor));
                } catch (error) {
                    response.writeHead(400);
                    response.end(JSON.stringify({ error: 'Invalid JSON' }));
                }
            });
            
        } else if (pathname === '/api/pitches' && method === 'GET') {
            response.writeHead(200);
            response.end(JSON.stringify(pitches));
            
        } else if (pathname === '/api/events' && method === 'GET') {
            response.writeHead(200);
            response.end(JSON.stringify(events));
            
        } else {
            response.writeHead(404);
            response.end(JSON.stringify({ error: 'Not found' }));
        }
        
    } else {
        // Serve static files
        let filePath = pathname === '/' ? '/index.html' : pathname;
        
        // Route handling for SPA-like behavior
        if (!path.extname(filePath)) {
            filePath = '/index.html';
        }
        
        serveStaticFile(filePath, response);
    }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`🚀 PitchMint server running at http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${path.join(__dirname, 'public')}`);
    console.log('✨ No npm install required - using built-in Node.js modules only!');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down server gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});
