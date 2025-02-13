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
