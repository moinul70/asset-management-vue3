import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  //  server: {
  //   allowedHosts: ['explicit-surprising-purchasing-carefully.trycloudflare.com']
  // },
  //  hmr: {
  //     clientPort: 443,
  //     protocol: 'wss'
  //   }
})
