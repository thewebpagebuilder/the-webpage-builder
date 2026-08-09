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

  if (content.includes('react-router-dom')) {
    changed = true;
    
    // Check what is imported
    const hasLink = content.includes('Link');
    const hasNavigate = content.includes('useNavigate');
    const hasLocation = content.includes('useLocation');
    
    // Remove react-router-dom import completely
    content = content.replace(/import\s+{([^}]*)}\s+from\s+["']react-router-dom["'];?\n?/g, (match, imports) => {
        let replacement = '';
        if (imports.includes('Link')) {
            replacement += `import Link from "next/link";\n`;
        }
        let navImports = [];
        if (imports.includes('useNavigate')) navImports.push('useRouter');
        if (imports.includes('useLocation')) navImports.push('usePathname');
        
        if (navImports.length > 0) {
            replacement += `import { ${navImports.join(', ')} } from "next/navigation";\n`;
        }
        return replacement;
    });

    // Replace usages
    content = content.replace(/useNavigate\(\)/g, 'useRouter()');
    content = content.replace(/useLocation\(\)/g, 'usePathname()');
    
    // If we use `useLocation` which returns { pathname }, `usePathname` just returns string directly.
    // E.g., `const { pathname } = useLocation();` -> `const pathname = usePathname();`
    content = content.replace(/const\s+{\s*pathname\s*}\s*=\s*useLocation\(\)/g, 'const pathname = usePathname()');
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Refactored react-router-dom in ${path.basename(filePath)}`);
  }
}
