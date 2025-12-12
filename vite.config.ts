import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to GitHub Pages under a repo path, set VITE_BASE="/your-repo/"
const base = process.env.VITE_BASE || '/'

export default defineConfig({
  plugins: [react()],
  base,
})