const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'pages');
const appDir = path.join(__dirname, 'src', 'app');

const files = fs.readdirSync(srcDir);

for (const file of files) {
  if (file === 'HomePage.tsx') {
    migrateFile(file, 'page.tsx');
  } else if (file === 'AdminDashboard.tsx') {
    migrateFile(file, 'admin/page.tsx');
  } else if (file === 'AdminLogin.tsx') {
    migrateFile(file, 'admin/login/page.tsx');
  } else if (file === 'AdminSetup.tsx') {
    migrateFile(file, 'admin/setup/page.tsx');
  } else if (file === 'AdminResetPassword.tsx') {
    migrateFile(file, 'admin/reset-password/page.tsx');
  } else if (file.endsWith('Page.tsx')) {
    const route = file.replace('Page.tsx', '').toLowerCase();
    migrateFile(file, `${route}/page.tsx`);
  }
}

function migrateFile(fileName, targetRoute) {
  const sourcePath = path.join(srcDir, fileName);
  const targetPath = path.join(appDir, targetRoute);
  
  // Create dir if needed
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  
  let content = fs.readFileSync(sourcePath, 'utf8');
  
  // Extract SEO info
  let titleMatch = content.match(/title="([^"]+)"/);
  let descMatch = content.match(/description="([^"]+)"/);
  
  // Remove SEO import and component
  content = content.replace(/import\s+{\s*SEO\s*}\s+from\s+["'].*?["'];?\n?/g, '');
  content = content.replace(/<SEO[^>]*\/>/g, '');
  
  // Add metadata export for non-admin pages
  if (titleMatch && !fileName.includes('Admin')) {
    const title = titleMatch[1];
    const desc = descMatch ? descMatch[1] : '';
    const metadataStr = `\nexport const metadata = {\n  title: "${title}",\n  description: "${desc}",\n};\n`;
    
    // insert after imports
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfImports = content.indexOf('\n', lastImportIndex) + 1;
    content = content.slice(0, endOfImports) + metadataStr + content.slice(endOfImports);
  }
  
  // Add "use client" if it uses client hooks or framer-motion or lucide-react (temporarily for safety)
  if (content.includes('framer-motion') || content.includes('useState') || content.includes('useEffect') || content.includes('react-router-dom') || content.includes('useLocation')) {
    if (!content.includes('"use client"')) {
      content = '"use client";\n' + content;
      // Note: metadata cannot be used with "use client" in the same file. 
      // If it has "use client", we must split it. For now we will handle this manually later.
    }
  }

  // Next.js uses default exports for pages
  content = content.replace(/export\s+function\s+([A-Za-z0-9_]+)/g, 'export default function $1');
  
  fs.writeFileSync(targetPath, content);
  console.log(`Migrated ${fileName} to ${targetRoute}`);
}
