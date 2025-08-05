import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // 👈 important: allows LAN access
    port: 5173, // or whatever port you want
  },
  // Environment variable configuration
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
})
