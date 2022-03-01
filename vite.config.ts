import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
// import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 开启可以自动引入第三方库api
    // AutoImport({
    //   imports: ['vue', 'vue-router'],
    // }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vueJsx(),
  ],
  resolve: {
    alias: {
      // __dirname找不到，需要安装 npm install @types/node --save-dev
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${resolve(__dirname, 'src/assets/css/custom.less')}";`,
      },
    },
  },
});
