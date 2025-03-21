import { resolve } from 'path';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue2 from '@vitejs/plugin-vue2';
import dynamicImport from 'vite-plugin-dynamic-import';
import antdvFix from 'vite-plugin-antdv-fix';
import basicSsl from '@vitejs/plugin-basic-ssl';
import proxy from './proxy';

const ROOT = resolve(__dirname);
const APPS = `${ROOT}/apps`;
const SRC = `${ROOT}/src`;

export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
    proxy,
  },
  build: {
    sourcemap: false,
    brotliSize: false,
    commonjsOptions: {
      transformMixedEsModules: true,
      sourceMap: false,
    },
    dynamicImportVarsOptions: {
      // 使用动态的import
      warnOnError: true,
    },
    rollupOptions: {
      input: [`${APPS}/dataPreview/index.html`, `${APPS}/document/index.html`],
      output: {
        dir: 'web',
        chunkFileNames: 'static/chunk/[name]-[hash].js',
        entryFileNames: 'static/entry/[name]-[hash].js',
        extend: ['ant-design-vue'],
        // 分包
        manualChunks: {
          vue: ['vue'],
          elementUi: ['element-ui'],
        },
      },
    },
  },
  plugins: [
    basicSsl(),
    dynamicImport(),
    vue2(),
    antdvFix(),
    legacy({
      targets: ['ie >= 11', 'IOS >=13', 'Android > 5'],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.vue', '.js', '.mjs'],
    alias: [
      {
        find: 'apps/',
        replacement: `${APPS}/`,
      },
      {
        find: 'src/',
        replacement: `${SRC}/`,
      },
    ],
  },
});
