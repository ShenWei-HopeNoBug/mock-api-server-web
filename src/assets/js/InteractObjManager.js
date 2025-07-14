import getWebChannelInteractObj from 'src/assets/js/getWebChannelInteractObj';
import { Message } from 'element-ui';
import { isObject } from 'lodash';
import { createEventBus } from 'src/assets/js/eventBus';

let interactObj = null;

const InteractObjManager = {
  init() {
    return new Promise(resolve => {
      getWebChannelInteractObj().then(result => {
        const { interactObj: interact, error, message: msg = '' } = result;
        if (error) {
          msg && Message.error(msg);
          resolve();
          return;
        }

        interactObj = interact;
        const onReceive = this._receive.bind(InteractObjManager);
        // 绑定接受消息的回调
        interactObj.qt2js_signal?.connect(onReceive);

        // 发送 WebChannel 注册成功的消息
        this.sendObjMsg({
          type: 'register',
        });
        resolve();
      });
    });
  },

  // 发送消息给 qt 客户端
  send(message = '') {
    interactObj?.send_js2qt_msg?.(message);
  },

  // 发送 object 类型的数据
  sendObjMsg(data = {}) {
    const sendData = isObject(data) ? data : {};
    this.send(JSON.stringify(sendData));
  },

  // 接受 qt 客户端的消息
  _receive(message) {
    this.emit('receive', message);
  },
};

// 将 InteractObjManager 原型指向 bus 继承属性和方法
Object.setPrototypeOf(InteractObjManager, createEventBus());

export default InteractObjManager;
