import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'introduction',
      component: () => import('./views/introduction/index.vue'),
    },
    {
      path: '/select-work-dir',
      name: 'select-work-dir',
      component: () => import('./views/document/selectWorkDir/index.vue'),
    },
    {
      path: '/request-catch',
      name: 'request-catch',
      component: () => import('./views/document/requestCatch/index.vue'),
    },
    {
      path: '/download',
      name: 'download',
      component: () => import('./views/document/download/index.vue'),
    },
  ],
});

export default router;
