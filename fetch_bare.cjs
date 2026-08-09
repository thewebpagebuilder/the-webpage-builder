const https = require('https');
const fs = require('fs');

https.get('https://thewebpagebuilder.in', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('bare_html.txt', data);
    console.log('Saved to bare_html.txt');
  });
});
