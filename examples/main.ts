import { createApp } from 'vue';
import App from './App.vue';
import router from '@examples/router/index';

import '@examples/assets/css/index.less';

const app = createApp(App);
app.use(router);
app.mount('#app');
