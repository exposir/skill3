import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        portal: 'http://localhost:3001/assets/remoteEntry.js',
        workspace: 'http://localhost:3002/assets/remoteEntry.js',
        docs: 'http://localhost:3003/assets/remoteEntry.js',
        admin: 'http://localhost:3004/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'zustand']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
