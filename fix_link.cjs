const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      results.push(filePath);
    }
  }
  return results;
}

const files = walk(srcDir);

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Link to -> href
  if (content.includes('<Link ') && content.includes('to=')) {
    content = content.replace(/<Link([^>]*?)to=/g, '<Link$1href=');
    changed = true;
  }
  
  // pathname fixes
  if (content.includes('usePathname')) {
    // If it was `const location = usePathname()`, then `location.pathname` needs to be `location`
    if (content.includes('location.pathname')) {
      content = content.replace(/location\.pathname/g, 'location');
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed Link/pathname in ${path.basename(filePath)}`);
  }
}
