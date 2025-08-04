<template>
  <div class="download-proxy">
    <div class="form-area">
      <div class="scroll">
        <ProxyListInput v-model="list" />
      </div>
    </div>
    <div class="footer">
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </div>
  </div>
</template>

<script>
import ProxyListInput from 'apps/configEdit/views/downloadProxy/components/ProxyListInput/index.vue';
import { processDownloadProxyList } from 'apps/configEdit/views/downloadProxy/tools';


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

  .footer {
    margin-top: 24px;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
}
</style>
