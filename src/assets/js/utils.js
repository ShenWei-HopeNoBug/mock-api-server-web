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
