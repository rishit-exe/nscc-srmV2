const chokidar = require('chokidar');
const path = require('path');
const { ImageOptimizer, OPTIMIZATION_CONFIG } = require('./optimize-images.cjs');

function imageOptimizationPlugin() {
  let optimizer;
  let isProduction = false;

  return {
    name: 'image-optimization',
    
    configResolved(config) {
      isProduction = config.command === 'build';
      optimizer = new ImageOptimizer();
    },

    buildStart() {
      if (isProduction) {
        // Run optimization during build
        this.addWatchFile(path.resolve('public/teams'));
        this.addWatchFile(path.resolve('public/sponser'));
      }
    },

    configureServer(server) {
      if (!isProduction) {
        // Set up file watching in development mode
        const watchDirectories = [
          {
            path: path.resolve('public/teams'),
            outputPath: path.resolve('public/optimized/teams'),
            config: OPTIMIZATION_CONFIG.team,
            name: 'teams'
          },
          {
            path: path.resolve('public/sponser'),
            outputPath: path.resolve('public/optimized/sponsors'),
            config: OPTIMIZATION_CONFIG.sponsor,
            name: 'sponsors'
          }
        ];

        watchDirectories.forEach(dir => {
          const watcher = chokidar.watch(dir.path, {
            ignored: /^\./,
            persistent: true,
            ignoreInitial: true
          });

          watcher.on('add', async (filePath) => {
            await optimizeAndReload(filePath, dir, server);
          });

          watcher.on('change', async (filePath) => {
            await optimizeAndReload(filePath, dir, server);
          });

          server.ws.on('connection', () => {
            console.log(`🔗 Hot reload connected for ${dir.name} images`);
          });
        });

        async function optimizeAndReload(filePath, directory, server) {
          const filename = path.basename(filePath);
          const fileExtension = path.extname(filename).toLowerCase();
          
          if (!['.jpg', '.jpeg', '.png', '.webp'].includes(fileExtension)) {
            return;
          }

          try {
            console.log(`🔄 Optimizing and reloading: ${filename}`);
            
            await optimizer.optimizeImage(
              filePath,
              directory.outputPath,
              directory.config,
              filename
            );

            // Trigger hot reload for the optimized images
            server.ws.send({
              type: 'full-reload',
              path: '*'
            });

            console.log(`✅ ${filename} optimized and page reloaded`);

          } catch (error) {
            console.error(`❌ Error optimizing ${filename}:`, error.message);
          }
        }
      }
    },

    generateBundle() {
      if (isProduction) {
        console.log('📦 Building with optimized images...');
        optimizer.printStats();
      }
    }
  };
}

module.exports = { imageOptimizationPlugin };