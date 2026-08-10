const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const LOG_FILE = path.join(__dirname, 'requests.log');

const server = http.createServer((req, res) => {
    
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;

    
    fs.appendFile(LOG_FILE, logMessage, (err) => {
        if (err) {
            console.error('Failed to write log:', err);
        }
    });

    
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the Node.js HTTP Server!');
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This server demonstrates HTTP and FS modules in Node.js.');
    } else if (req.url === '/logs') {
        
        fs.readFile(LOG_FILE, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading log file or no logs available yet.');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});


server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});