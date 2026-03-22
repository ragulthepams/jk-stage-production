import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function upscaleImages() {
  const dir = path.join(process.cwd(), 'public', 'showcase');
  
  for (let i = 1; i <= 5; i++) {
    const filePath = path.join(dir, `slide-${i}.jpg`);
    const tempPath = path.join(dir, `slide-${i}_upscaled.jpg`);
    
    if (fs.existsSync(filePath)) {
      try {
        await sharp(filePath)
          // Upscale to a 1080p target height, auto width. Lanczos3 is great for upscaling.
          .resize({ height: 1080, kernel: 'lanczos3' })
          // Add a subtle sharpen to bring back some edge definition after upscaling
          .sharpen({ sigma: 1.5, m1: 0.5, m2: 2, x1: 2, y2: 10, y3: 20 })
          // Slightly noise-reduce blocking artifacts
          .median(1)
          .jpeg({ quality: 100 })
          .toFile(tempPath);
          
        fs.copyFileSync(tempPath, filePath);
        fs.unlinkSync(tempPath);
        console.log(`Successfully upscaled slide-${i}.jpg`);
      } catch (err) {
        console.error(`Error upscaling slide-${i}.jpg:`, err);
      }
    }
  }
}

upscaleImages();
