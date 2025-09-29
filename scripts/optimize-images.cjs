const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration for different image types
const OPTIMIZATION_CONFIG = {
  team: {
    sizes: [150, 200, 250], // Small, medium, large
    quality: 85,
    formats: ['webp', 'jpg'], // WebP primary, JPG fallback
    targetSize: 50 // Target 50KB max
  },
  sponsor: {
    sizes: [80, 120, 160], // Sponsor logos are smaller
    quality: 90,
    formats: ['webp', 'png'], // WebP primary, PNG fallback for transparency
    targetSize: 30 // Target 30KB max
  },
  hero: {
    sizes: [800, 1200, 1600], // Large hero images
    quality: 80,
    formats: ['webp', 'jpg'],
    targetSize: 200 // Target 200KB max
  }
};

class ImageOptimizer {
  constructor() {
    this.stats = {
      processed: 0,
      originalSize: 0,
      optimizedSize: 0,
      savings: 0
    };
  }

  async optimizeImage(inputPath, outputDir, config, basename) {
    try {
      const originalStats = await fs.stat(inputPath);
      this.stats.originalSize += originalStats.size;

      console.log(`📸 Processing: ${basename}`);
      
      // Get image metadata
      const metadata = await sharp(inputPath).metadata();
      console.log(`   Original: ${metadata.width}x${metadata.height}, ${(originalStats.size / 1024).toFixed(2)}KB`);

      let totalOptimizedSize = 0;

      // Generate optimized versions for each size and format
      for (const size of config.sizes) {
        for (const format of config.formats) {
          const filename = `${path.parse(basename).name}_${size}w.${format}`;
          const outputPath = path.join(outputDir, filename);

          let sharpInstance = sharp(inputPath)
            .resize(size, size, {
              fit: 'cover',
              position: 'center'
            });

          // Apply format-specific optimizations
          if (format === 'webp') {
            sharpInstance = sharpInstance.webp({ 
              quality: config.quality,
              effort: 6 // Max compression effort
            });
          } else if (format === 'jpg' || format === 'jpeg') {
            sharpInstance = sharpInstance.jpeg({ 
              quality: config.quality,
              progressive: true,
              mozjpeg: true
            });
          } else if (format === 'png') {
            sharpInstance = sharpInstance.png({ 
              quality: config.quality,
              compressionLevel: 9
            });
          }

          await sharpInstance.toFile(outputPath);
          
          const optimizedStats = await fs.stat(outputPath);
          totalOptimizedSize += optimizedStats.size;
          
          console.log(`   ✅ ${filename}: ${(optimizedStats.size / 1024).toFixed(2)}KB`);
        }
      }

      this.stats.optimizedSize += totalOptimizedSize;
      this.stats.processed++;

      const savings = ((originalStats.size - totalOptimizedSize) / originalStats.size) * 100;
      console.log(`   💾 Savings: ${savings.toFixed(1)}%\n`);

    } catch (error) {
      console.error(`❌ Error processing ${basename}:`, error.message);
    }
  }

  async optimizeDirectory(inputDir, outputDir, config) {
    try {
      // Ensure output directory exists
      await fs.mkdir(outputDir, { recursive: true });

      const files = await fs.readdir(inputDir);
      const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png|webp)$/i.test(file)
      );

      console.log(`🚀 Starting optimization of ${imageFiles.length} images from ${inputDir}`);
      console.log(`📁 Output directory: ${outputDir}\n`);

      for (const file of imageFiles) {
        const inputPath = path.join(inputDir, file);
        await this.optimizeImage(inputPath, outputDir, config, file);
      }

    } catch (error) {
      console.error('❌ Directory optimization failed:', error.message);
    }
  }

  printStats() {
    const savingsPercent = ((this.stats.originalSize - this.stats.optimizedSize) / this.stats.originalSize) * 100;
    
    console.log('\n📊 OPTIMIZATION SUMMARY');
    console.log('='.repeat(50));
    console.log(`Images processed: ${this.stats.processed}`);
    console.log(`Original size: ${(this.stats.originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Optimized size: ${(this.stats.optimizedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total savings: ${((this.stats.originalSize - this.stats.optimizedSize) / 1024 / 1024).toFixed(2)} MB (${savingsPercent.toFixed(1)}%)`);
    console.log('='.repeat(50));
  }
}

async function main() {
  const optimizer = new ImageOptimizer();

  // Define paths
  const publicDir = path.join(__dirname, '../public');
  const optimizedDir = path.join(__dirname, '../public/optimized');

  try {
    // Optimize team images
    await optimizer.optimizeDirectory(
      path.join(publicDir, 'teams'),
      path.join(optimizedDir, 'teams'),
      OPTIMIZATION_CONFIG.team
    );

    // Optimize sponsor images
    await optimizer.optimizeDirectory(
      path.join(publicDir, 'sponser'),
      path.join(optimizedDir, 'sponsors'),
      OPTIMIZATION_CONFIG.sponsor
    );

    // Print final statistics
    optimizer.printStats();

    console.log('\n🎉 Image optimization completed!');
    console.log('📝 Next steps:');
    console.log('1. Update image imports to use optimized versions');
    console.log('2. Implement responsive image component');
    console.log('3. Add lazy loading');

  } catch (error) {
    console.error('❌ Optimization failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { ImageOptimizer, OPTIMIZATION_CONFIG };