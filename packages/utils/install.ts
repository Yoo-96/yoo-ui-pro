import type { App, Plugin } from 'vue';

export const install = <T>(main: T) => {
  (main as T & Plugin).install = (Vue: App) => {
    // @ts-ignore
    Vue.component(main.name, main);
  };
  return main;
};
