const { spawn } = require('child_process');
const path = require('path');

class DevServerWithImageOptimization {
  constructor() {
    this.processes = [];
    this.isShuttingDown = false;
  }

  async start() {
    console.log('🚀 Starting development server with auto image optimization...\n');

    try {
      // Start Vite dev server
      const viteProcess = this.startProcess('npm', ['run', 'dev'], {
        name: 'Vite Dev Server',
        color: '\x1b[36m' // Cyan
      });

      // Start auto image optimizer
      const optimizerProcess = this.startProcess('node', ['scripts/auto-optimize.cjs'], {
        name: 'Image Optimizer',
        color: '\x1b[35m' // Magenta
      });

      this.processes.push(viteProcess, optimizerProcess);

      // Handle shutdown
      this.setupShutdownHandlers();

      console.log('✅ Development environment ready!\n');
      console.log('📝 Available commands:');
      console.log('   • Add images to public/teams/ or public/sponser/');
      console.log('   • Images will be automatically optimized');
      console.log('   • Vite will hot-reload when changes are detected');
      console.log('   • Press Ctrl+C to stop all processes\n');

    } catch (error) {
      console.error('❌ Failed to start development environment:', error.message);
      await this.shutdown();
      process.exit(1);
    }
  }

  startProcess(command, args, options = {}) {
    const process = spawn(command, args, {
      stdio: 'pipe',
      shell: true,
      cwd: path.join(__dirname, '..')
    });

    const { name, color } = options;

    // Handle stdout
    process.stdout.on('data', (data) => {
      const lines = data.toString().split('\n').filter(line => line.trim());
      lines.forEach(line => {
        console.log(`${color}[${name}]\x1b[0m ${line}`);
      });
    });

    // Handle stderr
    process.stderr.on('data', (data) => {
      const lines = data.toString().split('\n').filter(line => line.trim());
      lines.forEach(line => {
        console.log(`${color}[${name}]\x1b[0m \x1b[31m${line}\x1b[0m`);
      });
    });

    // Handle process exit
    process.on('close', (code) => {
      if (!this.isShuttingDown) {
        console.log(`${color}[${name}]\x1b[0m Process exited with code ${code}`);
        if (code !== 0) {
          console.log(`❌ ${name} failed, shutting down...`);
          this.shutdown();
        }
      }
    });

    return process;
  }

  setupShutdownHandlers() {
    const shutdown = () => {
      if (!this.isShuttingDown) {
        console.log('\n🛑 Shutting down development environment...');
        this.shutdown();
      }
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
    process.on('SIGUSR1', shutdown);
    process.on('SIGUSR2', shutdown);
  }

  async shutdown() {
    this.isShuttingDown = true;

    console.log('⏳ Stopping all processes...');

    // Kill all child processes
    for (const proc of this.processes) {
      if (proc && !proc.killed) {
        proc.kill('SIGTERM');
        
        // Force kill after 5 seconds if process doesn't respond
        setTimeout(() => {
          if (!proc.killed) {
            proc.kill('SIGKILL');
          }
        }, 5000);
      }
    }

    // Wait for processes to exit
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('✅ Development environment stopped.');
    process.exit(0);
  }
}

// Run if called directly
if (require.main === module) {
  const devServer = new DevServerWithImageOptimization();
  devServer.start();
}

module.exports = { DevServerWithImageOptimization };