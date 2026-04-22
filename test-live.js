const http = require('http');

// Tiny 1x1 white PNG base64
const tinyPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==';

const payload = JSON.stringify({ image: tinyPng, prompt: 'What do you see?' });

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/recognize',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
  });
});

req.on('error', e => console.error('Request error:', e.message));
req.write(payload);
req.end();
