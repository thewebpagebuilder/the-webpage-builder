const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'app', 'demos', 'ClientPage.tsx');

let content = fs.readFileSync(targetPath, 'utf8');
content = content.replace(/import\s+{\s*Link\s*}\s+from\s+["']next\/link["'];?\n?/, '');
content = content.replace(/import\s+{\s*(.*?)ArrowRight(.*?)\s*}\s+from\s+["']lucide-react["'];?/, (match, p1, p2) => {
    let newImports = [];
    if (p1.trim()) newImports.push(p1.trim().replace(/,$/, ''));
    if (p2.trim()) newImports.push(p2.trim().replace(/^,/, ''));
    
    // clean up commas
    let inner = (p1 + p2).split(',').map(s => s.trim()).filter(s => s && s !== 'ArrowRight').join(', ');
    if (!inner) return '';
    return `import { ${inner} } from "lucide-react";`;
});

fs.writeFileSync(targetPath, content);
console.log('Fixed ClientPage.tsx');
