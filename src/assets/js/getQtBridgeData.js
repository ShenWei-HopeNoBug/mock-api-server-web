import { isObject } from 'lodash';

// 获取 webChannel 通信对象
const getQtBridgeData = () => new Promise(resolve => {
  const errorRes = {
    channel: null,
    channelObj: null,
    error: true,
    message: '',
  };

  if (!window.QWebChannel || !window.qt) {
    resolve({
      ...errorRes,
      message: 'QWebChannel 依赖加载失败',
    });
    return;
  }

  try {
    // 初始化 webChannel
    new window.QWebChannel(window.qt.webChannelTransport, channel => {
      const error = !isObject(channel?.objects);
      const channelObj = error ? null : channel?.objects;
      const message = error ? '获取 channelObj 对象失败' : '';

      resolve({
        channel,
        channelObj,
        error,
        message,
      });
    });
  } catch (e) {
    resolve({
      ...errorRes,
      message: String(e),
    });
  }
});

export default getQtBridgeData;
