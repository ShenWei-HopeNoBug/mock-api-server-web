<template>
  <div class="download-proxy">
    <div class="form-area">
      <div class="scroll">
        <div class="row">
          <div class="label">下载代理</div>
          <ProxyListInput v-model="list" />
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </div>
  </div>
</template>

<script>
import ProxyListInput from 'apps/configEdit/views/downloadProxy/components/ProxyListInput/index.vue';
import { isDownloadProxyListValid, processDownloadProxyList } from 'apps/configEdit/views/downloadProxy/tools';


export default {
  name: 'downloadProxy',
  components: {
    ProxyListInput,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    onSubmit() {
      const valid = isDownloadProxyListValid(this.list);
      if (!valid) {
        this.$message.error('存在没填写完整的配置');
        return;
      }

      const submitProxyList = processDownloadProxyList(this.list);
      console.log('submitProxyList', submitProxyList);
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
