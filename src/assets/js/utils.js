// 限制数值的范围
export const limitNumRange = (num, min, max) => {
  if (typeof num !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
    return num;
  }

  let numCp = num;
  if (numCp < min) {
    numCp = min;
  }
  if (num > max) {
    numCp = max;
  }

  return numCp;
};

// 是否为 Json 字符串
export const isJsonString = (str = '') => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * 复制字符串文本
 */
export const copy = (text = '') => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const input = document.createElement('input');
    input.setAttribute('value', text);
    input.style.position = 'fixed';
    input.style.clip = 'rect(0 0 0 0 )';
    input.style.top = '50px';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy', false);
    document.body.removeChild(input);
  }
};

// 生成uuid
export const generateUUID = () => {
  const NUM1 = 16;
  const NUM2 = 0x3;
  const NUM3 = 0x8;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * NUM1) | 0;
    const v = c === 'x' ? r : (r & NUM2) | NUM3;
    return v.toString(NUM1);
  });
};

export const isArrayValid = arr => Array.isArray(arr) && arr.length > 0;
