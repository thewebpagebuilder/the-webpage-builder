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
    } else if (filePath.endsWith('page.tsx')) {
      results.push(filePath);
    }
  }
  return results;
}

const files = walk(srcDir);

for (const filePath of files) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('"use client"') && content.includes('export const metadata')) {
    // Extract metadata
    const metadataMatch = content.match(/export const metadata = {[\s\S]*?};\n/);
    if (!metadataMatch) continue;
    
    const metadataCode = metadataMatch[0];
    
    // Remove metadata from client component content
    let clientContent = content.replace(metadataCode, '');
    
    // The client component path
    const clientFileName = 'ClientPage.tsx';
    const clientFilePath = path.join(path.dirname(filePath), clientFileName);
    
    // We need to rename the default export in client file to ClientPage
    clientContent = clientContent.replace(/export\s+default\s+function\s+[A-Za-z0-9_]+/, 'export default function ClientPage');
    
    fs.writeFileSync(clientFilePath, clientContent);
    
    // Create server component
    const serverContent = `
${metadataCode}
import ClientPage from './ClientPage';

export default function Page() {
  return <ClientPage />;
}
`;
    fs.writeFileSync(filePath, serverContent);
    console.log(`Split ${filePath}`);
  }
}
