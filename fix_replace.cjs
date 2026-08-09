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

  // Fix navigate.push(url, { replace: true }) -> navigate.replace(url)
  const replaceRegex = /navigate\.push\(([^,]+),\s*{\s*replace:\s*true\s*}\)/g;
  if (replaceRegex.test(content)) {
    content = content.replace(replaceRegex, 'navigate.replace($1)');
    changed = true;
  }
  
  if (path.basename(filePath) === 'ClientPage.tsx' && filePath.includes('demos')) {
      content = content.replace(/import\s+{\s*Link\s*}\s+from\s+["']next\/link["'];?\n?/, '');
      content = content.replace(/,\s*ArrowRight/, '');
      changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed replace in ${path.basename(filePath)}`);
  }
}
