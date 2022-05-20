import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/pro-table',
  },
  {
    path: '/pro-table',
    name: 'ProTableExample',
    component: () => import('@examples/views/ProTableExample/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
