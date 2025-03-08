const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/api/products',
  method: 'GET',
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(data);
      console.log('API Response:');
      console.log(JSON.stringify(parsedData, null, 2).slice(0, 500) + '...');
      console.log('\nAPI is working successfully!');
    } catch (e) {
      console.error('Error parsing JSON response:', e);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();