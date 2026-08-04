const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const publicPages = files.filter(f => !f.startsWith('Admin'));

for (const file of publicPages) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('import { SEO }')) continue;
  
  const pageName = file.replace('Page.tsx', '').replace('.tsx', '');
  const titleFormatted = pageName.replace(/([A-Z])/g, ' $1').trim();
  
  const title = `${titleFormatted} | The Webpage Builder`;
  const url = `https://thewebpagebuilder.in/${pageName.toLowerCase()}`;
  const description = `The Webpage Builder - ${titleFormatted}. Premium 3D web development and custom AI software agency.`;
  
  // Insert import at the top
  content = `import { SEO } from "../components/seo/SEO";\n` + content;
  
  // Insert <SEO ... /> inside the first <> or <div
  const seoTag = `\n      <SEO title="${title}" description="${description}" url="${url}" />`;
  content = content.replace(/(return\s*\(\s*(?:<>\s*|<div[^>]*>\s*))/i, `$1${seoTag}`);
  
  fs.writeFileSync(filePath, content);
  console.log(`Added SEO to ${file}`);
}
