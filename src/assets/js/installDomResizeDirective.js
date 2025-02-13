/**
 * 注册 dom-resize directive，监听元素的可见性变化
 * 使用指令 v-dom-resize:[arg].modifiers="callback"
 * [arg] threshold 出现在视口的比例
 */
const installDomResizeDirective = Vue => {
  if (!Vue) {
    return;
  }

  Vue.directive('dom-resize', {
    bind: (el, binding) => {
      const domObserver = new ResizeObserver((entries) => {
        entries.forEach(entry => {
          // 元素不存在，解除可见性监听
          if (!entry) {
            domObserver.disconnect();
          }

          binding.value(entry);
        });
      });
      domObserver.observe(el);
    }
  });
};

export default installDomResizeDirective;
