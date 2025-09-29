const fs = require('fs').promises;
const path = require('path');

class OptimizedImageCleaner {
  constructor() {
    this.optimizedDir = path.join(__dirname, '../public/optimized');
  }

  async clean() {
    console.log('🧹 Cleaning optimized images...\n');

    try {
      // Check if optimized directory exists
      try {
        await fs.access(this.optimizedDir);
      } catch (error) {
        console.log('📁 No optimized directory found. Nothing to clean.');
        return;
      }

      // Get total size before cleaning
      const sizeBefore = await this.calculateDirectorySize(this.optimizedDir);

      // Remove optimized directory
      await fs.rm(this.optimizedDir, { recursive: true, force: true });

      // Recreate empty directories
      await fs.mkdir(path.join(this.optimizedDir, 'teams'), { recursive: true });
      await fs.mkdir(path.join(this.optimizedDir, 'sponsors'), { recursive: true });

      console.log('✅ Optimized images cleaned successfully!');
      console.log(`💾 Freed up: ${(sizeBefore / 1024 / 1024).toFixed(2)} MB`);
      console.log('\n📝 Next steps:');
      console.log('   • Run "npm run optimize:all" to regenerate optimized images');
      console.log('   • Or run "npm run dev:auto" to start development with auto-optimization');

    } catch (error) {
      console.error('❌ Error cleaning optimized images:', error.message);
      process.exit(1);
    }
  }

  async calculateDirectorySize(dirPath) {
    let totalSize = 0;

    try {
      const files = await fs.readdir(dirPath, { withFileTypes: true });

      for (const file of files) {
        const filePath = path.join(dirPath, file.name);

        if (file.isDirectory()) {
          totalSize += await this.calculateDirectorySize(filePath);
        } else {
          const stats = await fs.stat(filePath);
          totalSize += stats.size;
        }
      }
    } catch (error) {
      // Directory might not exist or be inaccessible
      return 0;
    }

    return totalSize;
  }
}

// Run if called directly
if (require.main === module) {
  const cleaner = new OptimizedImageCleaner();
  cleaner.clean();
}

module.exports = { OptimizedImageCleaner };