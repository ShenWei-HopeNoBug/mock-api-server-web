import { limitNumRange } from 'src/assets/js/utils';

/**
 * 注册 dom-exposure directive，监听元素的可见性变化
 * 使用指令 v-dom-exposure:[arg].modifiers="callback"
 * [arg] threshold 出现在视口的比例
 */
const installDomExposureDirective = Vue => {
  if (!Vue) {
    return;
  }

  Vue.directive('dom-exposure', {
    bind: (el, binding) => {
      let { threshold } = binding.arg || {};
      const defaultArgs = {
        threshold: 0.5,
      };

      if (typeof threshold === 'number') {
        threshold = limitNumRange(threshold, 0, 1);
      } else {
        threshold = defaultArgs.threshold;
      }

      const domObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // 元素不存在，解除可见性监听
          if (!entry) {
            domObserver.disconnect();
          }

          binding.value(entry);
        });
      }, {
        threshold,
      });
      domObserver.observe(el);
    }
  });
};

export default installDomExposureDirective;
