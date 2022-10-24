import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vueJsx from '@vitejs/plugin-vue-jsx';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import typescript2 from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const pkg = require('../package.json');

const createBanner = () => {
  return `/*!
  * ${pkg.name} v${pkg.version}
  */`;
};

const baseOutputConfig = {
  banner: createBanner(),
  name: pkg.name,
  dir: 'lib',
  sourcemap: false,
  globals: {
    vue: 'Vue',
  },
};

export default {
  input: 'packages/index.ts',
  external: ['vue', 'vue-router'],
  plugins: [
    typescript2(),
    vue(),
    vueJsx(),
    resolve(),
    commonjs(),
    postcss({
      // extract: true,
      minimize: true,
      // modules: true,
      extensions: ['.css', '.less'],
      use: [
        [
          'less',
          {
            javascriptEnabled: true,
          },
        ],
      ],
      extract: `${pkg.name}.css`,
    }),
    // 开启可以自动引入第三方库api
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      directoryAsNamespace: true,
    }),
    terser({
      compress: {
        pure_funcs: ['console.log'],
      },
    }),
  ],
  output: [
    {
      ...baseOutputConfig,
      format: 'esm',
      entryFileNames: `${pkg.name}.esm.mjs`,
    },
    {
      ...baseOutputConfig,
      format: 'umd',
      entryFileNames: `${pkg.name}.umd.js`,
    },
    {
      ...baseOutputConfig,
      format: 'cjs',
      exports: 'named',
      entryFileNames: `${pkg.name}.cjs.js`,
    },
  ],
};
