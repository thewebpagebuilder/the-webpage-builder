const fs = require('fs');
const path = require('path');

const brainDir = "C:\\Users\\lokha\\.gemini\\antigravity-ide\\brain\\439f5d2b-9f76-404e-b899-c3efba4a5e06";
const publicDir = path.join(__dirname, 'public');

const copies = [
  // Generated in this session
  { src: path.join(brainDir, "lumina_ecommerce_1788445530775.png"), dest: path.join(publicDir, "lumina.png") },
  { src: path.join(brainDir, "nexus_dashboard_1788445542035.png"), dest: path.join(publicDir, "nexus.png") },
  { src: path.join(brainDir, "studio_alpha_agency_1788445566067.png"), dest: path.join(publicDir, "studio_alpha.png") },
  { src: path.join(brainDir, "horizon_fintech_1788465927540.png"), dest: path.join(publicDir, "horizon.png") },
  { src: path.join(brainDir, "aura_branding_1788465947697.png"), dest: path.join(publicDir, "aura.png") },
  { src: path.join(brainDir, "og_image_1788465909827.png"), dest: path.join(publicDir, "og-image.png") },
];

let ok = 0, fail = 0;
for (const { src, dest } of copies) {
  try {
    if (!fs.existsSync(src)) {
      console.log(`⚠️  Missing: ${path.basename(src)}`);
      fail++;
      continue;
    }
    fs.copyFileSync(src, dest);
    console.log(`✅ Copied → ${path.basename(dest)}`);
    ok++;
  } catch (e) {
    console.error(`❌ Failed ${path.basename(dest)}:`, e.message);
    fail++;
  }
}
console.log(`\nDone: ${ok} copied, ${fail} failed.`);
