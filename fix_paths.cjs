const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'app');

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

  // Replace ../../components with @/components, etc.
  const regex = /(["'])(?:\.\.\/)+((?:components|lib|hooks|content|utils|pages)\b[^"']*)\1/g;
  
  if (regex.test(content)) {
    changed = true;
    content = content.replace(regex, '"@/$2"');
  }
  
  // Replace ../components with @/components
  const regex2 = /(["'])\.\.\/((?:components|lib|hooks|content|utils|pages)\b[^"']*)\1/g;
  if (regex2.test(content)) {
      changed = true;
      content = content.replace(regex2, '"@/$2"');
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed paths in ${path.basename(filePath)}`);
  }
}
