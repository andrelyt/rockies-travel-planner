import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Vercel 默认根路径部署；GitHub Pages 保留子路径
  base: process.env.VERCEL ? '/' : '/rockies-travel-planner/',
})
