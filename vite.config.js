import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for core React libraries
          'react-vendor': ['react', 'react-dom'],
          
          // Animation libraries chunk
          'animation-vendor': ['framer-motion', 'gsap'],
          
          // Three.js chunk (heavy library)
          'three-vendor': ['three', '@react-three/fiber'],
          
          // UI components chunk
          'ui-vendor': ['lucide-react', 'react-icons', '@fortawesome/react-fontawesome', '@fortawesome/fontawesome-svg-core'],
          
          // Utility libraries chunk
          'utils-vendor': ['react-scroll', 'react-countup', 'react-fast-marquee']
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    
    // Enable source maps for debugging (can disable in production)
    sourcemap: false
  },
  
  // Optimize dev server for faster loading
  server: {
    hmr: {
      overlay: false
    }
  }
})
