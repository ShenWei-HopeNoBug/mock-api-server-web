import Vue from 'vue';
import App from './App.vue';

import 'src/assets/style/reset.css';

/**
 * 引入 element
 * */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

/**
 * 引入代码编辑器插件
 * */
import CodeEditor from 'bin-code-editor';

Vue.use(CodeEditor);

window.vm = new Vue({
  render: h => h(App),
}).$mount('#app');
