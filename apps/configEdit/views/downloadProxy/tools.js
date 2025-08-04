import { cloneDeep, isObject } from 'lodash';
import { protocolValueEnum } from 'apps/configEdit/views/downloadProxy/config';

// 下载代理配置是否合法
export const isDownloadProxyValid = (proxyConfig = {}) => {
  if (!isObject(proxyConfig)) {
    return false;
  }

  const { protocol, proxy, includes } = proxyConfig;
  const protocolValid = protocolValueEnum.some(item => item.value === protocol);
  const proxyValid = Boolean(typeof proxy === 'string' && proxy.trim());
  return protocolValid && proxyValid && Array.isArray(includes);
};

// 处理下载配置数据
export const processDownloadProxyList = (proxyList = []) => {
  const list = [];
  proxyList.forEach(item => {
    if (!isDownloadProxyValid(item)) {
      return;
    }

    const config = cloneDeep(item);

    const { proxy, includes = [] } = config;
    // 输入项处理
    config.proxy = proxy.trim();
    config.includes = [...new Set(includes)].filter(str => typeof str === 'string' && str.trim());
    list.push(config);
  });

  return list;
};
