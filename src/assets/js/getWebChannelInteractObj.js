// 获取 webChannel 通信对象
const getWebChannelInteractObj = () => new Promise(resolve => {
  const errorRes = {
    interactObj: null,
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
    let interactObj = null;
    // 初始化 webChannel
    new window.QWebChannel(window.qt.webChannelTransport, channel => {
      interactObj = channel?.objects?.interactObj || null;
      const error = !interactObj;
      const message = error ? '获取 interactObj 对象失败' : '';

      resolve({
        interactObj,
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

export default getWebChannelInteractObj;
