export default {
  // 大屏人工接管轮询接口
  '/manual/takeover': {
    target: 'http://10.0.32.118:8090',
    changeOrigin: true,
  },
  'https://appleid.apple.com/appleauth/auth/oauth/consent/complete': {
    target: 'https://rtatest.10jqka.com.cn',
    changeOrigin: true,
  },
  'https://appleid.apple.com/appleauth/auth/oauth/authorize': {
    target: 'https://rtatest.10jqka.com.cn',
    changeOrigin: true,
  },
  '/dream-plus': {
    target: 'http://127.0.0.1:5000',
    changeOrigin: true,
    rewrite: path => path.replace('/dream-plus', '/api/dream-plus'),
  },
};
