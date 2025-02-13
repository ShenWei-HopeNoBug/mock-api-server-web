// eslint-disable-next-line filenames/match-exported
import moment from 'moment';

const getLogTime = () => moment().format('HH:mm:ss');

// 检查麦克风权限
const checkMicrophonePermission = () =>
  new Promise(resolve => {
    const errorRes = { permission: false };

    const errorCallback = e => {
      console.error(`[${getLogTime()}] 获取麦克风权限失败`, e);
      resolve(errorRes);
    };

    const main = () => {
      navigator.permissions
        .query({ name: 'microphone' })
        .then(permissionStatus => {
          const permission = permissionStatus?.state === 'granted';
          resolve({ permission });
        })
        .catch(e => {
          errorCallback(e);
        });
    };

    try {
      main();
    } catch (e) {
      errorCallback(e);
    }
  });

// 唤起麦克风权限
export const triggerMicrophonePermission = () =>
  new Promise(resolve => {
    const errorRes = { permission: false };

    const errorCallback = e => {
      console.error(`[${getLogTime()}] 唤起麦克风权限失败`, e);
      resolve(errorRes);
    };

    const main = () => {
      if (!navigator.mediaDevices) {
        resolve(errorRes);
      }

      // 用于获取媒体列表的函数
      let getUserMediaFunc =
        navigator.mediaDevices.getUserMedia ||
        navigator.mediaDevices.webkitGetUserMedia ||
        navigator.mediaDevices.mozGetUserMedia ||
        navigator.mediaDevices.msGetUserMedia;

      // 调整调用时的 this 指向
      getUserMediaFunc = getUserMediaFunc.bind(navigator.mediaDevices);

      getUserMediaFunc({ audio: true })
        .then(stream => {
          stream.getTracks().forEach(track => {
            track.stop();
          });
          resolve({ permission: true });
        })
        .catch(e => {
          errorCallback(e);
        });
    };

    try {
      main();
    } catch (e) {
      errorCallback(e);
    }
  });

// 检查麦克风设备
const getMicrophoneDevices = () =>
  new Promise(resolve => {
    const errorRes = { devices: [], success: false };

    const errorCallback = e => {
      console.error(`[${getLogTime()}] 获取麦克风设备失败`, e);
      resolve(errorRes);
    };

    const main = () => {
      if (!navigator.mediaDevices) {
        resolve(errorRes);
      }

      navigator.mediaDevices
        .enumerateDevices()
        .then(devices => {
          resolve({ devices, success: true });
        })
        .catch(e => {
          errorCallback(e);
        });
    };

    try {
      main();
    } catch (e) {
      errorCallback(e);
    }
  });

class MicrophonePermissionManager {
  constructor() {
    this.permissionChangeCallback = [];
  }

  init() {
    return this._setPermissionChangeCallback(this._onPermissionChange.bind(this));
  }

  // 新增麦克风权限变化监听事件
  addPermissionChangeListener(callback) {
    this.permissionChangeCallback.push(callback);
  }

  // 删除麦克风权限变化监听事件
  removePermissionChangeListener(callback) {
    const callbackList = [];
    this.permissionChangeCallback.forEach(cb => {
      // 为待删除的回调， 跳过
      if (cb === callback) {
        return;
      }

      callbackList.push(cb);
    });

    this.permissionChangeCallback = callbackList;
  }

  // 删除所有麦克风权限变化监听事件
  removeAllPermissionChangeListener() {
    this.permissionChangeCallback = [];
  }

  destroy() {
    this.removeAllPermissionChangeListener();

    this._setPermissionChangeCallback(null);
  }

  // 设置权限变化的回调
  _setPermissionChangeCallback(callback = null) {
    return new Promise(resolve => {
      const errorCallback = e => {
        console.error(`[${getLogTime()}] 设置麦克风权限变化监听回调失败`, e);
        resolve({
          onChangeListener: false,
          state: '',
          permission: false,
        });
      };

      try {
        navigator.permissions
          .query({ name: 'microphone' })
          .then(permissionStatus => {
            // 绑定权限变化监听事件
            permissionStatus.onchange = callback;
            // 是否有权限获取音频流
            const permission = permissionStatus.state === 'granted';

            resolve({
              onChangeListener: true, // 是否设置了监听权限变化的回调
              state: permissionStatus.state,
              permission,
            });
          })
          .catch(e => {
            errorCallback(e);
          });
      } catch (e) {
        errorCallback(e);
      }
    });
  }

  // 权限变化
  _onPermissionChange(e) {
    this.permissionChangeCallback.forEach(cb => {
      if (typeof cb === 'function') {
        cb(e);
      }
    });
  }
}

export default checkMicrophonePermission;

export { MicrophonePermissionManager, getMicrophoneDevices };
