const https = require('https');

function checkDomain(hostname) {
  const options = {
    hostname: hostname,
    port: 443,
    path: '/',
    method: 'HEAD'
  };

  const req = https.request(options, (res) => {
    console.log(`\n--- ${hostname} ---`);
    console.log(`Status: ${res.statusCode}`);
    console.log(`Location: ${res.headers.location || 'none'}`);
    console.log(`Server: ${res.headers.server || 'unknown'}`);
  });

  req.on('error', (e) => {
    console.error(`Error checking ${hostname}: ${e.message}`);
  });

  req.end();
}

checkDomain('thewebpagebuilder.in');
checkDomain('www.thewebpagebuilder.in');
