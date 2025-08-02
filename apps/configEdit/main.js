import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import 'src/assets/style/reset.css';

/**
 * 引入 element
 * */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

/**
 * 注册 v-dom-resize 指令
 * */
import installDomResizeDirective from 'src/assets/js/installDomResizeDirective';

installDomResizeDirective(Vue);

window.vm = new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
