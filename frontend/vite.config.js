import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dotenv from 'dotenv';

// Cargar variables de entorno desde un archivo específico
dotenv.config({ path: './.env' });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
})
