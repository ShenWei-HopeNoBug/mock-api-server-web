<template>
  <div class="download-proxy" element-loading-text="配置加载中...">
    <div class="form-area" v-loading="loading">
      <div class="scroll">
        <div class="row">
          <div class="label">下载代理</div>
          <ProxyListInput v-model="list" />
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button type="primary" :disabled="loading" @click="onSubmit">确定</el-button>
    </div>
  </div>
</template>

<script>
import { isObject } from 'lodash';
import { mapState } from 'vuex';
import QtBridge from 'src/assets/js/QtBridge';
import ProxyListInput from 'apps/configEdit/views/downloadProxy/components/ProxyListInput/index.vue';
import { isDownloadProxyListValid, processDownloadProxyList } from 'apps/configEdit/views/downloadProxy/tools';
import { generateUUID, isJsonString } from 'src/assets/js/utils';


export default {
  name: 'downloadProxy',
  components: {
    ProxyListInput,
  },
  data() {
    return {
      list: [],
      bridge: new QtBridge(),
      actionIdMap: {
        get_download_proxy: '',
        update_download_proxy: '',
      },
    };
  },
  computed: {
    ...mapState('bridge', ['channelObj', 'register']),
    loading() {
      const { get_download_proxy = '', update_download_proxy = '' } = this.actionIdMap || {};
      return Boolean(get_download_proxy || update_download_proxy);
    },
  },
  watch: {
    register: {
      handler(bool) {
        if (bool) {
          this.init();
        }
      },
      immediate: true,
    },
  },
  methods: {
    init() {
      const { downloadProxy = null } = this.channelObj || {};
      if (!isObject(downloadProxy)) {
        this.$message.error('downloadProxy 通信对象获取失败！');
        return;
      }

      // 初始化通信对象
      this.bridge.init(downloadProxy);
      this.bridge.on('receive', this.onReceive);
      this.$nextTick(() => {
        this.getDownloadProxyList();
      });
    },
    onReceive(message = '') {
      const eventData = isJsonString(message) ? JSON.parse(message) : {};
      const { type = '' } = eventData;
      if (type === 'request') {
        this.onRequestEvent(eventData);
      }
    },
    sendRequestMessage(options = {}) {
      // webChannel 未注册成功，跳过
      if (!this.bridge.isRegister()) {
        return;
      }

      const { data = {}, name = '', extra = {} } = options;
      if (!name) {
        return;
      }

      const action_id = generateUUID();
      this.actionIdMap[name] = action_id;
      this.bridge.sendObjMsg({
        params: {},
        ...data,
        type: 'request',
        name,
        action_id,
        extra,
      });
    },
    onRequestEvent(eventData = {}) {
      const { type = '', name = '', data = {}, action_id = '', extra = {} } = eventData;
      if (type !== 'request') {
        return;
      }

      if (!action_id || action_id !== this.actionIdMap[name]) {
        return;
      }

      switch (name) {
        // 获取下载代理配置返回
        case 'get_download_proxy': {
          const { list = [] } = data;
          this.list = Array.isArray(list) ? list : [];
          break;
        }

        default:
      }

      // 清除对应的 action_id
      if (this.actionIdMap[name]) {
        this.actionIdMap[name] = '';
      }
    },
    getDownloadProxyList() {
      if (!this.bridge.isRegister()) {
        return;
      }

      this.sendRequestMessage({
        name: 'get_download_proxy',
      });
    },
    onSubmit() {
      const valid = isDownloadProxyListValid(this.list);
      if (!valid) {
        this.$message.error('存在没填写完整的配置');
        return;
      }

      const submitProxyList = processDownloadProxyList(this.list);
      const params = {
        download_proxy_list: submitProxyList,
      };
      this.sendRequestMessage({
        name: 'update_download_proxy',
        data: { params },
      });
    },
  },
};
</script>

<style scoped lang="less">
.download-proxy {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .form-area {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;

    .scroll {
      width: 100%;
      scrollbar-gutter: stable;
      padding-right: 14px;
    }
  }

  .row {
    width: 100%;
    display: flex;
    gap: 8px;

    .label {
      width: 80px;
      font-weight: bold;

      &:after {
        content: ':';
        padding: 0 4px 0 2px;
      }
    }

    .input {
      width: 100%;
      flex: 1;
    }
  }

  .footer {
    margin-top: 24px;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
}
</style>
