import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

// Import version from package.json
const packageJson = require('../package.json');
const version = packageJson.version;

// Define reusable paths and options
const fileNameSuffix = '';

// Custom plugin to wrap output in an IIFE and include CSS
const wrapOutputInIIFE = () => {
  return {
    name: 'wrap-in-iife',
    generateBundle(options, bundle) {
      for (const [key, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'chunk') {
          // Find the corresponding CSS file
          const cssFileName = chunk.facadeModuleId && path.basename(chunk.facadeModuleId, path.extname(chunk.facadeModuleId)) + '.css';
          const cssFilePath = path.resolve(process.env.VITE_SRC_DIR, cssFileName);

          // Read and prepare the CSS content if the file exists
          let cssContent = '';
          if (fs.existsSync(cssFilePath)) {
            const rawCss = fs.readFileSync(cssFilePath, 'utf-8');
            cssContent = `var style = document.createElement('style'); style.textContent = ${JSON.stringify(rawCss)}; document.head.appendChild(style);`;
          }

          // Wrap JS code and CSS in an IIFE
          chunk.code = `(function() {${cssContent}\n${chunk.code}\n})();`;
        }
      }
    },
  };
};

export default defineConfig({
  // Alias configurations
  resolve: {
    alias: {
      '@': process.env.VITE_SRC_DIR,
    },
  },
  // Environment variable configurations
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(version),
    'import.meta.env.VITE_APP_BASE_URL': JSON.stringify(process.env.VITE_URL),
    'import.meta.env.VITE_APP_FILE_SUFFIX': JSON.stringify(fileNameSuffix),
  },
  // Project root directory
  root: process.env.VITE_SRC_DIR,
  // Build configurations
  build: {
    polyfillModulePreload: false,
    sourcemap: true,
    emptyOutDir: false,
    manifest: true,
    minify: false,
    shrinkResources: false,
    outDir: process.env.VITE_OUT_DIR,
    esbuild: {
      jsxFactory: 'ts',
      jsxFragment: 'ts',
    },
    rollupOptions: {
      //make the build type iif
      input: [
        path.resolve(process.env.VITE_SRC_DIR, 'IDE.html')
      ],
      output: {
        format: 'iife',
        entryFileNames: `widget-js/[name]-${fileNameSuffix}${version}.js`,
        chunkFileNames: `widget-js/sharedjs/[name]-${fileNameSuffix}${version}.js`,
        assetFileNames: (assetInfo) => {
          const extension = path.extname(assetInfo.name);
          const generateName = (type) => `${type}/[name]-${fileNameSuffix}${version}${extension}`;
          switch (extension) {
            case '.js':
              return generateName('widget-js');
            case '.css':
              return generateName('widget-css');
            case '.svg':
              return generateName('widget-svg');
            case '.html':
              return generateName('html');
            default:
              return `[name]-${fileNameSuffix}-${version}${extension}`;
          }
        },
      },
      external: ['face-api'],
    },
    plugins: [wrapOutputInIIFE()],
  },
});

