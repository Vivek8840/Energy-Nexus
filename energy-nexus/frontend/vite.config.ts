// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { resolve } from 'path'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, './src'),
//       '@components': resolve(__dirname, './src/components'),
//       '@pages': resolve(__dirname, './src/pages'),
//       '@types': resolve(__dirname, './src/types'),
//       '@utils': resolve(__dirname, './src/utils'),
//       '@hooks': resolve(__dirname, './src/hooks'),
//       '@stores': resolve(__dirname, './src/stores'),
//       '@styles': resolve(__dirname, './src/styles'),
//     },
//   },
//   server: {
//     port: 3000,
//     open: true,
//   },
//   build: {
//     outDir: 'dist',
//     sourcemap: true,
//   },
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@types': resolve(__dirname, './src/types'),
      '@utils': resolve(__dirname, './src/utils'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@stores': resolve(__dirname, './src/stores'),
      '@styles': resolve(__dirname, './src/styles'),
    },
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      strict: true
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  define: {
    'process.env': {}
  }
})
