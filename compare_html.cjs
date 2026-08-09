const https = require('https');

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function check() {
  try {
    const html1 = await fetchHTML('https://thewebpagebuilder.in');
    const html2 = await fetchHTML('https://www.thewebpagebuilder.in');
    
    console.log("Bare domain HTML length:", html1.length);
    console.log("www domain HTML length:", html2.length);
    
    if (html1.length !== html2.length) {
      console.log("The HTML is DIFFERENT! Vercel is serving two different deployments.");
      
      const js1 = [...html1.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
      const js2 = [...html2.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
      console.log("Bare JS:", js1);
      console.log("www JS:", js2);
    } else {
      console.log("The HTML is IDENTICAL.");
    }
  } catch (e) {
    console.error(e);
  }
}

check();
