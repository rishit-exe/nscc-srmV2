const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs').promises;
const { ImageOptimizer, OPTIMIZATION_CONFIG } = require('./optimize-images.cjs');

class AutoImageOptimizer {
  constructor() {
    this.optimizer = new ImageOptimizer();
    this.isProcessing = new Set(); // Track files being processed
    this.debounceTimers = new Map(); // Debounce rapid file changes
    
    // Define watch directories
    this.watchDirectories = [
      {
        path: path.join(__dirname, '../public/teams'),
        outputPath: path.join(__dirname, '../public/optimized/teams'),
        config: OPTIMIZATION_CONFIG.team,
        name: 'teams'
      },
      {
        path: path.join(__dirname, '../public/sponser'),
        outputPath: path.join(__dirname, '../public/optimized/sponsors'),
        config: OPTIMIZATION_CONFIG.sponsor,
        name: 'sponsors'
      }
    ];
    
    this.watchers = [];
  }

  async init() {
    console.log('🚀 Starting Automated Image Optimizer...\n');
    
    // Ensure all output directories exist
    for (const dir of this.watchDirectories) {
      await fs.mkdir(dir.outputPath, { recursive: true });
    }

    // Start watching each directory
    for (const dir of this.watchDirectories) {
      this.startWatching(dir);
    }

    console.log('👀 File watchers started! Add images to watched folders and they\'ll be optimized automatically.\n');
    console.log('📁 Watched directories:');
    this.watchDirectories.forEach(dir => {
      console.log(`   • ${dir.path} → ${dir.outputPath}`);
    });
    console.log('\nPress Ctrl+C to stop watching...\n');
  }

  startWatching(directory) {
    const watcher = chokidar.watch(directory.path, {
      ignored: /^\./,
      persistent: true,
      ignoreInitial: false // Set to true if you don't want to process existing files
    });

    watcher
      .on('add', (filePath) => this.handleFileChange('added', filePath, directory))
      .on('change', (filePath) => this.handleFileChange('changed', filePath, directory))
      .on('unlink', (filePath) => this.handleFileDelete(filePath, directory))
      .on('error', (error) => console.error(`❌ Watcher error in ${directory.name}:`, error));

    this.watchers.push(watcher);
    console.log(`✅ Watching ${directory.name} folder for changes...`);
  }

  async handleFileChange(action, filePath, directory) {
    const filename = path.basename(filePath);
    const fileExtension = path.extname(filename).toLowerCase();
    
    // Only process image files
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(fileExtension)) {
      return;
    }

    // Debounce rapid changes (e.g., when copying large files)
    const debounceKey = filePath;
    if (this.debounceTimers.has(debounceKey)) {
      clearTimeout(this.debounceTimers.get(debounceKey));
    }

    this.debounceTimers.set(debounceKey, setTimeout(async () => {
      await this.processFile(action, filePath, directory);
      this.debounceTimers.delete(debounceKey);
    }, 500)); // 500ms debounce
  }

  async processFile(action, filePath, directory) {
    const filename = path.basename(filePath);
    
    // Prevent processing the same file multiple times
    if (this.isProcessing.has(filePath)) {
      return;
    }

    this.isProcessing.add(filePath);

    try {
      console.log(`📸 ${action.toUpperCase()}: ${filename} in ${directory.name}`);
      
      // Check if file exists and is readable
      try {
        await fs.access(filePath, fs.constants.R_OK);
      } catch (error) {
        console.log(`   ⏳ File not ready yet, skipping...`);
        return;
      }

      // Get file stats to ensure it's fully written
      const stats = await fs.stat(filePath);
      if (stats.size === 0) {
        console.log(`   ⏳ File is empty, waiting for write to complete...`);
        return;
      }

      // Wait a bit more to ensure file write is complete
      await new Promise(resolve => setTimeout(resolve, 100));

      // Process the image
      await this.optimizer.optimizeImage(
        filePath, 
        directory.outputPath, 
        directory.config, 
        filename
      );

      console.log(`   ✅ Optimization complete!\n`);

    } catch (error) {
      console.error(`   ❌ Error processing ${filename}:`, error.message);
    } finally {
      this.isProcessing.delete(filePath);
    }
  }

  async handleFileDelete(filePath, directory) {
    const filename = path.basename(filePath);
    const baseFilename = path.parse(filename).name;
    
    console.log(`🗑️  DELETED: ${filename} from ${directory.name}`);
    
    try {
      // Delete all optimized versions of this file
      const outputDir = directory.outputPath;
      const files = await fs.readdir(outputDir);
      
      const relatedFiles = files.filter(file => 
        file.startsWith(baseFilename + '_') && 
        (file.includes('150w') || file.includes('200w') || file.includes('250w') ||
         file.includes('80w') || file.includes('120w') || file.includes('160w'))
      );

      for (const relatedFile of relatedFiles) {
        const relatedPath = path.join(outputDir, relatedFile);
        await fs.unlink(relatedPath);
        console.log(`   🗑️  Removed optimized: ${relatedFile}`);
      }

      if (relatedFiles.length > 0) {
        console.log(`   ✅ Cleanup complete!\n`);
      }

    } catch (error) {
      console.error(`   ❌ Error cleaning up optimized versions:`, error.message);
    }
  }

  async processExistingFiles() {
    console.log('📁 Processing existing files...\n');
    
    for (const directory of this.watchDirectories) {
      try {
        const files = await fs.readdir(directory.path);
        const imageFiles = files.filter(file => 
          /\.(jpg|jpeg|png|webp)$/i.test(file)
        );

        if (imageFiles.length > 0) {
          console.log(`🔄 Found ${imageFiles.length} existing images in ${directory.name}`);
          
          for (const file of imageFiles) {
            const filePath = path.join(directory.path, file);
            await this.processFile('processed', filePath, directory);
          }
        }
      } catch (error) {
        console.error(`❌ Error processing existing files in ${directory.name}:`, error.message);
      }
    }
  }

  async stop() {
    console.log('\n🛑 Stopping file watchers...');
    
    for (const watcher of this.watchers) {
      await watcher.close();
    }
    
    console.log('✅ All watchers stopped.');
    
    // Print final stats
    this.optimizer.printStats();
  }
}

// CLI interface
async function main() {
  const autoOptimizer = new AutoImageOptimizer();
  
  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    await autoOptimizer.stop();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await autoOptimizer.stop();
    process.exit(0);
  });

  try {
    await autoOptimizer.init();
    
    // Process existing files if --initial flag is passed
    if (process.argv.includes('--initial')) {
      await autoOptimizer.processExistingFiles();
    }
    
    // Keep the process running
    await new Promise(() => {});
    
  } catch (error) {
    console.error('❌ Auto-optimizer failed:', error.message);
    process.exit(1);
  }
}

// Export for use in other scripts
module.exports = { AutoImageOptimizer };

// Run if called directly
if (require.main === module) {
  main();
}