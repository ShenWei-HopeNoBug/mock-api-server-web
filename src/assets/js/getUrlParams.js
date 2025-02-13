import qs from 'qs';

// 获取 url 参数
const getUrlParams = () => {
  const { href = '' } = window.location;
  const list = href.split('?');
  list.shift();
  const paramStr = list.join('?');
  return qs.parse(paramStr);
};

export default getUrlParams;
