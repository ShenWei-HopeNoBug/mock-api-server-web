import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [{
    name: 'downloadProxy',
    path: '/downloadProxy',
    component: () => import('apps/configEdit/views/downloadProxy/index.vue'),
  }],
});

export default router;
