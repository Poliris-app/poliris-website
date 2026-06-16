import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { LANGS, PAGE_SLUGS } from './src/seo.js'

export default defineConfig({
  plugins: [react()],
  // vite-react-ssg build options (read from vite config at build time).
  ssgOptions: {
    // Emit /en/visibility/index.html so routes resolve as clean directory URLs.
    dirStyle: 'nested',
    // Expand the dynamic "/:lang" route into the concrete paths to prerender.
    includedRoutes() {
      const slugs = Object.values(PAGE_SLUGS)
      return LANGS.flatMap((lang) =>
        slugs.map((slug) => (slug ? `/${lang}/${slug}` : `/${lang}/`)),
      )
    },
  },
})
