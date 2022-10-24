import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve, join } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import checker from 'vite-plugin-checker';

export default defineConfig({
  base: './',
  root: join(__dirname, '../examples'),
  plugins: [
    vue(),
    // 开启可以自动引入第三方库api
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      directoryAsNamespace: true,
    }),
    vueJsx(),
    // checker({ vueTsc: true }),
  ],
  resolve: {
    alias: {
      // __dirname找不到，需要安装 npm install @types/node --save-dev
      '@': resolve(__dirname, '../'),
      '@packages': resolve(__dirname, '../packages'),
      '@examples': resolve(__dirname, '../examples'),
      '@yui': resolve(__dirname, '../packages'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${resolve(__dirname, '../packages/assets/css/custom.less')}";`,
      },
    },
  },
});
