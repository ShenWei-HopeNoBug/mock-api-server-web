import axios from 'axios';

export const getMitmproxyOutputList = () =>
  axios.get(`/mitmproxy_output.json?_${new Date().getTime()}`)
    .then(res => res.data);
