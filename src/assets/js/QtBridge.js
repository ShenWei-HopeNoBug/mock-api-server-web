import { isObject } from 'lodash';
import { EventBus } from 'src/assets/js/eventBus';


class QtBridge extends EventBus {
  constructor(props = {}) {
    super();
    const { bridge = null } = props;

    // 是否注册成功
    this.register = false;
    // 通信对象
    this.bridge = null;

    this.init(bridge);
  }

  isRegister() {
    return this.register;
  }

  init(bridge) {
    this.register = isObject(bridge);
    if (!this.register) {
      return;
    }

    this.bridge = bridge;
    const onReceive = this._receive.bind(this);
    // 绑定接受消息的回调
    this.bridge.qt2js_signal?.connect?.(onReceive);
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
