const fs = require('fs');
const path = require('path');

const dirsToClient = ['components', 'hooks', 'lib'];
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

  // Add "use client" to everything in components, hooks, lib (except maybe pure util functions, but it's safe)
  const isClientDir = dirsToClient.some(d => filePath.includes(path.join('src', d)));
  if (isClientDir && !content.includes('"use client"')) {
    content = '"use client";\n' + content;
    changed = true;
  }

  // Fix ALL relative imports everywhere to use @/
  // Matches ../ or ../../ followed by components|lib|hooks|utils|content
  const regex = /(["'])(?:\.\.\/)+((?:components|lib|hooks|content|utils|pages)\b[^"']*)\1/g;
  if (regex.test(content)) {
    content = content.replace(regex, '"@/$2"');
    changed = true;
  }
  
  // also match ./components or ./lib if in root of src
  const regex2 = /(["'])\.\/((?:components|lib|hooks|content|utils|pages)\b[^"']*)\1/g;
  if (regex2.test(content) && filePath.split(path.sep).length === srcDir.split(path.sep).length + 1) {
    content = content.replace(regex2, '"@/$2"');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${path.basename(filePath)}`);
  }
}
