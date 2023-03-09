import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import mkcert from 'vite-plugin-mkcert'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true
  },
  plugins: [react(), tsconfigPaths(), mkcert()],
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
})
