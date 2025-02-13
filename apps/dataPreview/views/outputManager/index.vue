<template>
  <div class="output-manager">
    <el-card v-if="!isHttpProtocol" class="header">
      <UploadModel accept=".json" @upload="onUpload">
        <template #content>
          <el-button type="primary">选择本地抓包数据</el-button>
        </template>
      </UploadModel>
    </el-card>
    <el-card class="content">
      <el-table :data="dataSource" highlight-current-row>
        <el-table-column
          v-for="(item, i) in tableColumns"
          :key="`column-${i}`"
          :prop="item.key"
          :label="item.label"
          v-bind="item.props"
        />
        <el-table-column label="操作" fixed="right" width="250">
          <template slot-scope="scope">
            <el-button type="text" @click="onDetail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <DetailDialog ref="detailDialog" :data-source="curRow" @close="onDialogClose" />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import DetailDialog from './components/DetailDialog.vue';
import { tableColumns } from './config';
import UploadModel from 'src/components/UploadModel/index.vue';
import { isJsonString } from 'src/assets/js/utils';

export default {
  name: 'outputManager',
  components: { DetailDialog, UploadModel },
  data() {
    return {
      tableColumns,
      dataSource: [],
      curRow: {},
      isHttpProtocol: true,
    };
  },
  created() {
    this.isHttpProtocol = window.location.protocol.startsWith('http');
    const dataSource = isJsonString(window.MITMPROXY_OUTPUT) ? JSON.parse(window.MITMPROXY_OUTPUT) : [];
    this.dataSource = Array.isArray(dataSource) ? dataSource : [];
  },
  methods: {
    onDetail(record = {}) {
      this.curRow = cloneDeep(record);
      this.$refs.detailDialog?.show?.();
    },
    onDialogClose() {
      this.curRow = {};
    },
    onUpload(file) {
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const dataSource = isJsonString(content) ? JSON.parse(content) : [];
        this.dataSource = Array.isArray(dataSource) ? dataSource : [];
      };

      reader.readAsText(file);
    },
  },
};
</script>

<style scoped lang="less">
.output-manager {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    width: 100%;
    margin-bottom: 24px;
    display: flex;
    flex-direction: row-reverse;
  }

  .content {
    flex: 1;
    width: 100%;
    height: 100%;
  }
}
</style>
