const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Hex colors
  content = content.replace(/#e8650a/gi, '#A0CC3A'); 
  content = content.replace(/#ff7a1a/gi, '#BBE95A');
  content = content.replace(/#0a0a1e/gi, '#050505'); // Darker bg for Torque aesthetic
  content = content.replace(/#060612/gi, '#000000'); // Black base
  content = content.replace(/#050510/gi, '#030303');
  
  // RGB values
  content = content.replace(/232,\s*101,\s*10/g, '160,204,58');
  content = content.replace(/232,101,10/g, '160,204,58');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function traverseDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

traverseDir(srcDir);
console.log('Done!');
