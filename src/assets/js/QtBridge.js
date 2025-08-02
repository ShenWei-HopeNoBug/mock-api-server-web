import getWebChannelInteractObj from 'src/assets/js/getWebChannelInteractObj';
import { Message } from 'element-ui';
import { isObject } from 'lodash';
import { EventBus } from 'src/assets/js/eventBus';


class QtBridge extends EventBus {
  constructor() {
    super();
    // 是否注册成功
    this.register = false;
    // 通信对象
    this.bridge = null;
  }

  init() {
    return new Promise(resolve => {
      getWebChannelInteractObj().then(result => {
        const { interactObj: interact, error, message: msg = '' } = result;
        // 更新是否注册标志
        this.register = !error;
        if (error) {
          msg && Message.error(msg);
          resolve();
          return;
        }

        this.bridge = interact;
        const onReceive = this._receive.bind(this);
        // 绑定接受消息的回调
        this.bridge.qt2js_signal?.connect(onReceive);

        // 发送 WebChannel 注册成功的消息
        this.sendObjMsg({
          type: 'register',
        });

        resolve({
          register: this.register,
        });
      });
    });
  }

  // 发送消息给 qt 客户端
  send(message = '') {
    if (!this.register) {
      return;
    }

    this.bridge?.send_js2qt_msg?.(message);
  }

  // 发送 object 类型的数据
  sendObjMsg(data = {}) {
    const sendData = isObject(data) ? data : {};
    this.send(JSON.stringify(sendData));
  }

  // 接受 qt 客户端的消息
  _receive(message) {
    this.emit('receive', message);
  }
}


export default QtBridge;
