const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Hex colors
  content = content.replace(/#A0CC3A/gi, '#e8650a'); 
  content = content.replace(/#BBE95A/gi, '#ff7a1a');
  content = content.replace(/#050505/gi, '#0a0a1e'); 
  content = content.replace(/#000000/gi, '#060612'); 
  content = content.replace(/#030303/gi, '#050510');
  
  // RGB values
  content = content.replace(/160,\s*204,\s*58/g, '232,101,10');
  content = content.replace(/160,204,58/g, '232,101,10');
  
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
console.log('Revert done!');
