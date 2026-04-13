import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/meu-curriculo/', // Tem de ser EXATAMENTE o nome do seu repositório no GitHub
})