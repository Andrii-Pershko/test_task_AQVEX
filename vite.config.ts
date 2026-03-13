import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// Для GitHub Pages: base має збігатися з шляхом репозиторію (https://user.github.io/repo-name/)
export default defineConfig({
  plugins: [react(), svgr()],
  base: '/test_task_AQVEX/'
});

