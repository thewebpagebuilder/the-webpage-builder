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

  // Link to -> href (handle multi-line or any whitespace)
  if (content.includes('to=')) {
    const regex = /<Link([^>]*?)to=/g;
    if (regex.test(content)) {
      content = content.replace(regex, '<Link$1href=');
      changed = true;
    }
  }
  
  // navigate('/path') -> navigate.push('/path')
  // We replaced useNavigate with useRouter, so the variable might be named 'navigate'
  // But wait, it's called navigate(...)
  const navigateRegex = /navigate\(([^)]+)\)/g;
  if (navigateRegex.test(content) && content.includes('useRouter')) {
    content = content.replace(navigateRegex, 'navigate.push($1)');
    changed = true;
  }
  
  // ProtectRoute.tsx <Navigate> -> redirect
  if (content.includes('<Navigate ')) {
    content = content.replace(/<Navigate\s+to=(["'][^"']+["'])\s+replace\s*\/>/g, '(() => { window.location.href = $1; return null; })()');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed in ${path.basename(filePath)}`);
  }
}
