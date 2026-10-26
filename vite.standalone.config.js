import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

/* Build config for the single-file export of the landing page's top
   section. Kept apart from vite.config.js so the site's SSG setup and dev
   API plugin stay out of the way.

   Everything is forced into one script and one stylesheet so that
   scripts/build-standalone.mjs only has two files to inline. */
export default defineConfig({
  plugins: [react()],
  root: path.resolve('standalone'),
  // Public assets are referenced as "/name.png" and rewritten to data URIs
  // after the build, so the base only has to be predictable.
  base: '/',
  publicDir: false,
  build: {
    outDir: path.resolve('dist-standalone'),
    emptyOutDir: true,
    cssCodeSplit: false,
    // Imported assets become data URIs rather than separate files.
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    rollupOptions: {
      output: {
        // The Lottie player and its icons are dynamic imports; without this
        // they would land in extra chunks that a single file cannot load.
        inlineDynamicImports: true,
        entryFileNames: 'app.js',
        assetFileNames: 'app[extname]',
      },
    },
  },
})
