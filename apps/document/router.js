import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/introduction',
      name: 'introduction',
      component: () => import('./views/introduction/index.vue'),
    },
    {
      path: '/basic-usage',
      name: 'basic-usage',
      component: () => import('./views/document/basicUsage/index.vue'),
    },
  ],
});

export default router;
