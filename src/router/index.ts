import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/pro-table',
  },
  {
    path: '/pro-table',
    name: 'ProTable',
    component: () => import('@/views/ProTable/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
