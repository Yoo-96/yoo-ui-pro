/*
 * @module: 组件库包入口
 * @Author: yoo
 * @Date: 2022-05-21 15:28:36
 * @Description:
 */
import components, { ProTable, FullScreenIcon } from './components';
import type { App } from 'vue';
const pkg = require('../package.json');

interface OptsType {}

/**
 * 全局注册使用
 * @param Vue Vue
 * @param opts 配置项参数
 */
const install = (Vue: App, opts?: OptsType) => {
  // @ts-ignore
  if (install.installed) return;

  Object.keys(components).forEach((key: string) => {
    Vue.component(key, components[key]);
  });
};

// script标签引入
// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
  // @ts-ignore
  install(window.Vue);
}

export { ProTable, FullScreenIcon };

export default {
  version: pkg.version,
  install,
};
