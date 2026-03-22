const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'images');
const destDir = path.join(__dirname, 'public', 'showcase');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

let files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'));
// just take 5 files
files = files.slice(0, 5);

files.forEach((file, index) => {
  fs.copyFileSync(
    path.join(srcDir, file),
    path.join(destDir, `slide-${index + 1}.jpg`)
  );
});

console.log('Copied 5 placeholder images for slideshow.');
