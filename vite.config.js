import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform',
      enforce: 'post',
      transformIndexHtml(html, ctx) {
        if (!ctx || !ctx.bundle) return html;

        // Trouve le fichier CSS généré
        const cssFile = Object.values(ctx.bundle).find(
          (file) => file.type === 'asset' && file.fileName.endsWith('.css')
        );

        if (!cssFile) return html;

        // Supprime l’ancienne balise bloquante s’il y en a
        html = html.replace(
          new RegExp(`<link rel="stylesheet"[^>]+${cssFile.fileName}[^>]*>`, 'g'),
          ''
        );

        // Injecte preload + fallback
        const preloadLink = `<link rel="preload" href="/${cssFile.fileName}" as="style" onload="this.onload=null;this.rel='stylesheet'" crossorigin>`;
        const fallbackLink = `<noscript><link rel="stylesheet" href="/${cssFile.fileName}" crossorigin></noscript>`;

        return html.replace('</head>', `${preloadLink}\n${fallbackLink}\n</head>`);
      },
    }
  ],
  build: {
    sourcemap: true,
  },
});