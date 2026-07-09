const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processImages() {
  const publicDir = path.join(__dirname, 'public');
  const logoPath = path.join(publicDir, 'logo.webp');
  const nexusPath = path.join(publicDir, 'nexus.webp');
  
  console.log('Processing logo.webp (resizing to 64x64)...');
  const logoBuffer = fs.readFileSync(logoPath);
  await sharp(logoBuffer)
    .resize(64, 64, { fit: 'inside' })
    .webp({ quality: 80 })
    .toFile(logoPath);
    
  console.log('Processing nexus.webp (increasing compression)...');
  const nexusBuffer = fs.readFileSync(nexusPath);
  await sharp(nexusBuffer)
    .webp({ quality: 50, effort: 6 })
    .toFile(nexusPath);
    
  console.log('Images successfully optimized!');
}

processImages().catch(console.error);
