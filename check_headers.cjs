const https = require('https');

https.get('https://thewebpagebuilder.in', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    const jsFilesMatches = [...html.matchAll(/src="([^"]+\.js)"/g)];
    const preloadMatches = [...html.matchAll(/href="([^"]+\.js)"/g)];
    
    const allFiles = [...new Set([...jsFilesMatches.map(m => m[1]), ...preloadMatches.map(m => m[1])])];
    
    console.log('Found files:', allFiles);
    
    allFiles.forEach(file => {
      const url = file.startsWith('http') ? file : 'https://thewebpagebuilder.in' + file;
      https.get(url, (r) => {
        console.log(`URL: ${url} | Content-Type: ${r.headers['content-type']} | Length: ${r.headers['content-length']} | Status: ${r.statusCode}`);
      });
    });
  });
}).on('error', err => console.log('Error fetching HTML:', err));
