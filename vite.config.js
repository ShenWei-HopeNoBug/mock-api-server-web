import { resolve } from 'path';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue2 from '@vitejs/plugin-vue2';
import dynamicImport from 'vite-plugin-dynamic-import';
import antdvFix from 'vite-plugin-antdv-fix';
import proxy from './proxy';
import basicSsl from '@vitejs/plugin-basic-ssl';

const ROOT = resolve(__dirname);
const PACKAGES = `${ ROOT }/packages`;
const EXAMPLE = `${ ROOT }/example`;
const SRC = `${ ROOT }/src`;

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
      input: [
        {
          entry: `${ ROOT }/example/answerRender/index.html`,
        },
      ],
      output: {
        dir: 'html',
        chunkFileNames: 'static/chunk/[name]-[hash].js',
        entryFileNames: 'static/entry/[name]-[hash].js',
        assetFileNames: ({ name = '' }) => {
          let dir;
          if (/\.(png|jpg|gif|jpeg|webp)$/.test(name)) {
            dir = '/img';
          } else if (/\.css$/.test(name)) {
            dir = '/css';
          } else {
            dir = '';
          }

          return `static${ dir }/[name]-[hash].[ext]`;
        },
        extend: ['ant-design-vue'],
        // 分包
        manualChunks: {
          vue: ['vue'],
          elementUi: ['element-ui'],
        },
      }
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
        find: 'packages/',
        replacement: `${ PACKAGES }/`,
      },
      {
        find: 'example/',
        replacement: `${ EXAMPLE }/`,
      },
      {
        find: 'src/',
        replacement: `${ SRC }/`,
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ],
  },
})
