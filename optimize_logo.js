import sharp from 'sharp';
import path from 'path';

const input = path.resolve('src/assets/logo.png');
const output = path.resolve('src/assets/logo_optimized.png');

sharp(input)
  .resize(400) // 400px width
  .png({ quality: 80 })
  .toFile(output)
  .then(() => {
    console.log('Logo optimized successfully');
  })
  .catch(err => {
    console.error('Error optimizing logo:', err);
  });
