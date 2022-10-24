import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';

const pkg = require('../package.json');

export default defineConfig({
  build: {
    outDir: 'lib',
    minify: true,
    lib: {
      name: 'yoo-ui-pro',
      entry: resolve(__dirname, '../packages/index.ts'),
      // formats: ['es', 'cjs', 'umd'],
      formats: ['es', 'umd'],
      fileName: (format) => `${pkg.name}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
      input: [resolve(__dirname, '../packages/index.ts')],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@yui': resolve(__dirname, '../packages'),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [ElementPlusResolver()],
      directoryAsNamespace: true,
    }),
    dts({
      entryRoot: resolve(__dirname, '../packages'),
    }),
  ],
});
