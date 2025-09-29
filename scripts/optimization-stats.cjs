const fs = require('fs').promises;
const path = require('path');

class OptimizationStats {
  constructor() {
    this.publicDir = path.join(__dirname, '../public');
    this.optimizedDir = path.join(__dirname, '../public/optimized');
  }

  async generateStats() {
    console.log('📊 Generating optimization statistics...\n');

    try {
      const stats = {
        teams: await this.analyzeDirectory('teams'),
        sponsors: await this.analyzeDirectory('sponser', 'sponsors') // Note: original is 'sponser', optimized is 'sponsors'
      };

      this.printStats(stats);

    } catch (error) {
      console.error('❌ Error generating stats:', error.message);
      process.exit(1);
    }
  }

  async analyzeDirectory(originalDir, optimizedDir = originalDir) {
    const originalPath = path.join(this.publicDir, originalDir);
    const optimizedPath = path.join(this.optimizedDir, optimizedDir);

    const result = {
      original: { count: 0, size: 0, files: [] },
      optimized: { count: 0, size: 0, files: [] },
      savings: { size: 0, percentage: 0 }
    };

    // Analyze original files
    try {
      const originalFiles = await fs.readdir(originalPath);
      const imageFiles = originalFiles.filter(file => 
        /\.(jpg|jpeg|png|webp)$/i.test(file)
      );

      for (const file of imageFiles) {
        const filePath = path.join(originalPath, file);
        const stats = await fs.stat(filePath);
        result.original.files.push({ name: file, size: stats.size });
        result.original.size += stats.size;
      }
      result.original.count = imageFiles.length;

    } catch (error) {
      console.log(`⚠️  Could not read original ${originalDir} directory`);
    }

    // Analyze optimized files
    try {
      const optimizedFiles = await fs.readdir(optimizedPath);
      const imageFiles = optimizedFiles.filter(file => 
        /\.(jpg|jpeg|png|webp)$/i.test(file)
      );

      for (const file of imageFiles) {
        const filePath = path.join(optimizedPath, file);
        const stats = await fs.stat(filePath);
        result.optimized.files.push({ name: file, size: stats.size });
        result.optimized.size += stats.size;
      }
      result.optimized.count = imageFiles.length;

    } catch (error) {
      console.log(`⚠️  Could not read optimized ${optimizedDir} directory`);
    }

    // Calculate savings
    result.savings.size = result.original.size - result.optimized.size;
    result.savings.percentage = result.original.size > 0 
      ? (result.savings.size / result.original.size) * 100 
      : 0;

    return result;
  }

  printStats(stats) {
    console.log('📈 OPTIMIZATION STATISTICS');
    console.log('='.repeat(60));

    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let totalOriginalCount = 0;
    let totalOptimizedCount = 0;

    // Print stats for each category
    Object.entries(stats).forEach(([category, data]) => {
      console.log(`\n🔸 ${category.toUpperCase()}`);
      console.log('-'.repeat(30));
      console.log(`Original files: ${data.original.count} (${(data.original.size / 1024 / 1024).toFixed(2)} MB)`);
      console.log(`Optimized files: ${data.optimized.count} (${(data.optimized.size / 1024 / 1024).toFixed(2)} MB)`);
      
      if (data.savings.size > 0) {
        console.log(`💾 Savings: ${(data.savings.size / 1024 / 1024).toFixed(2)} MB (${data.savings.percentage.toFixed(1)}%)`);
      } else if (data.optimized.count === 0) {
        console.log(`⚠️  No optimized files found - run "npm run optimize:all"`);
      }

      // Show top 3 largest original files
      if (data.original.files.length > 0) {
        const sortedFiles = data.original.files
          .sort((a, b) => b.size - a.size)
          .slice(0, 3);
        
        console.log(`📋 Largest files:`);
        sortedFiles.forEach(file => {
          console.log(`   • ${file.name}: ${(file.size / 1024).toFixed(1)} KB`);
        });
      }

      totalOriginalSize += data.original.size;
      totalOptimizedSize += data.optimized.size;
      totalOriginalCount += data.original.count;
      totalOptimizedCount += data.optimized.count;
    });

    // Print totals
    console.log('\n' + '='.repeat(60));
    console.log('🎯 TOTAL SUMMARY');
    console.log('='.repeat(60));
    console.log(`Original: ${totalOriginalCount} files, ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Optimized: ${totalOptimizedCount} files, ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
    
    const totalSavings = totalOriginalSize - totalOptimizedSize;
    const totalSavingsPercentage = totalOriginalSize > 0 
      ? (totalSavings / totalOriginalSize) * 100 
      : 0;

    if (totalSavings > 0) {
      console.log(`💰 Total savings: ${(totalSavings / 1024 / 1024).toFixed(2)} MB (${totalSavingsPercentage.toFixed(1)}%)`);
    }

    // Recommendations
    console.log('\n📝 RECOMMENDATIONS');
    console.log('='.repeat(60));
    
    if (totalOptimizedCount === 0) {
      console.log('🚀 Run "npm run optimize:all" to create optimized versions');
    } else if (totalOptimizedCount < totalOriginalCount * 3) {
      console.log('⚠️  Some images may not be optimized. Run "npm run optimize:all" to ensure all are processed');
    } else {
      console.log('✅ All images appear to be optimized!');
    }

    if (totalSavingsPercentage > 50) {
      console.log('🎉 Excellent optimization! You\'ve saved significant bandwidth and loading time.');
    } else if (totalSavingsPercentage > 20) {
      console.log('👍 Good optimization results. Consider further compression if needed.');
    } else if (totalOriginalCount > 0) {
      console.log('💡 Consider running optimization to improve loading performance.');
    }

    console.log('\n🔧 Available commands:');
    console.log('   • npm run optimize:all    - Optimize all images');
    console.log('   • npm run optimize:clean  - Clean optimized images');
    console.log('   • npm run dev:auto        - Start dev server with auto-optimization');
    console.log('='.repeat(60));
  }
}

// Run if called directly
if (require.main === module) {
  const statsGenerator = new OptimizationStats();
  statsGenerator.generateStats();
}

module.exports = { OptimizationStats };