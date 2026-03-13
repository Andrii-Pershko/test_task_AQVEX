import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Заміни '/your-repo-name/' на реальну назву репозиторію GitHub перед деплоєм
export default defineConfig({
  plugins: [react()],
  base: './'
});

