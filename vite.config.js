import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Absolute asset paths, so a nested address such as /aui/payments loads
  // when opened directly. The site is served from the domain root.
  base: '/'
})
