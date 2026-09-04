const fs = require('fs');

let file = fs.readFileSync('src/components/3d/FloatingCoder.tsx', 'utf8');

if (!file.includes('RoundedBox')) {
  file = file.replace('import { Canvas, useFrame } from "@react-three/fiber";', 'import { Canvas, useFrame } from "@react-three/fiber";\nimport { RoundedBox } from "@react-three/drei";');
}

file = file.replace('Math.sin(t * 0.8) * 0.04', 'Math.sin(t * 2.5) * 0.08');
file = file.replace('lerp(headRef.current.rotation.y, targetRotY, 0.08)', 'lerp(headRef.current.rotation.y, targetRotY, 0.2)');
file = file.replace('lerp(headRef.current.rotation.x, targetRotX, 0.08)', 'lerp(headRef.current.rotation.x, targetRotX, 0.2)');
file = file.replace('Math.sin(t * 8) * 0.08 + 0.3', 'Math.sin(t * 16) * 0.15 + 0.3');
file = file.replace('Math.sin(t * 8 + Math.PI) * 0.08 + 0.3', 'Math.sin(t * 16 + Math.PI) * 0.15 + 0.3');

const regex = /<mesh([^>]*)>\s*<boxGeometry args={([^}]+)}\s*\/>\s*<meshStandardMaterial([^>]+)\/>\s*<\/mesh>/g;
file = file.replace(regex, '<RoundedBox args={$2} radius={0.04} smoothness={4}$1>\n  <meshStandardMaterial$3/>\n</RoundedBox>');

fs.writeFileSync('src/components/3d/FloatingCoder.tsx', file);
console.log("Done");
