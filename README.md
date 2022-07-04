
# yoo-ui-pro

# 简介

一套基于 `vue3.x` + `Element Plus` ，使用 `TypeScript` 开发的业务组件。

项目使用 [vue3-base-project](https://github.com/Yoo-96/vue3-base-project) 框架进行快速搭建

# 安装使用

## 使用 npm 或 yarn 安装

```shell
# npm
npm i yoo-ui-pro -S

# yarn
yarn add yoo-ui-pro
```

## 引入 yoo-ui-pro

### 完整引入

```js
import { createApp } from 'vue'
import App from './App.vue'
import 'yoo-ui-pro/lib/yoo-ui-pro.css';
import YUI from 'yoo-ui-pro';

const app = createApp(App);
app.use(YUI);
app.mount('#app');
```

### 按需引入

`yoo-ui-pro`  提供了基于  `ES Module`  开箱即用的  `Tree Shaking`  功能。

```vue
// main.js 导入样式
import 'yoo-ui-pro/lib/yoo-ui-pro.css';

// 引入组件
import { ProTable } from 'yoo-ui-pro';
```

# 已开发组件

- [ProTable](./docs/ProTable.md)

# 仓库地址

[github](https://github.com/Yoo-96/yoo-ui-pro)，欢迎使用和点亮小星星。

[gitee](https://gitee.com/developer-yoo-group/yoo-ui-pro)，欢迎使用和点亮小星星。

