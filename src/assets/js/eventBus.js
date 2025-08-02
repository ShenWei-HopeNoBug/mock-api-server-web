class EventBus {
  constructor() {
    this._events = {};
  }

  on(eventName, callback) {
    // 已经绑定过的回调，不重复绑定
    if (!eventName || this.isEventBind(eventName, callback)) {
      return;
    }

    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    this._events[eventName].push(callback);
  }

  off(eventName, callback) {
    if (!eventName) {
      return;
    }

    const callbacks = this._events[eventName];
    if (!callbacks) {
      return;
    }
    const index = callbacks.indexOf(callback);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }

  emit(eventName, ...args) {
    if (!eventName) {
      return;
    }

    const callbacks = this._events[eventName];
    if (!callbacks) {
      return;
    }

    callbacks.forEach((callback) => {
      callback(...args);
    });
  }

  // 事件回调是否已经绑定过
  isEventBind(eventName, callback) {
    if (!eventName) {
      return false;
    }

    const callbacks = this._events[eventName];
    if (!callbacks) {
      return false;
    }

    const index = callbacks.indexOf(callback);
    return index !== -1;
  }

  // 删除所有的绑定事件
  removeAllEvents() {
    this._events = {};
  }
}

const createEventBus = () => new EventBus();

export default createEventBus();
export { EventBus, createEventBus };
