const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

async function processImages() {
  const files = fs.readdirSync(publicDir);
  
  for (const file of files) {
    if (file.endsWith('.png')) {
      const inputPath = path.join(publicDir, file);
      const outputPath = path.join(publicDir, file.replace('.png', '.webp'));
      
      console.log(`Converting ${file}...`);
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
        
      fs.unlinkSync(inputPath); // remove old png
      console.log(`Removed ${file}`);
    }
  }
}

processImages().catch(console.error);
