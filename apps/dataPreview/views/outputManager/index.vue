<template>
  <div class="output-manager">
    <el-card class="header">
      <div class="btn-group">
        <el-button type="primary" @click="onClearFilter">清除所有过滤器</el-button>
        <UploadModel v-if="!isHttpProtocol" accept=".json" @upload="onUpload">
          <template #content>
            <el-button type="primary">选择本地抓包数据</el-button>
          </template>
        </UploadModel>
      </div>
    </el-card>
    <el-card class="content">
      <el-table ref="table" :data="dataSource" highlight-current-row height="550px">
        <el-table-column type="index" width="50" />
        <el-table-column
          v-for="(item, i) in tableColumns"
          :key="`column-${i}`"
          :prop="item.key"
          :label="item.label"
          v-bind="item.props"
        />
        <el-table-column label="操作" fixed="right" width="200">
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
import UploadModel from 'src/components/UploadModel/index.vue';
import { isJsonString } from 'src/assets/js/utils';
import { tableColumns, filterMethod } from './config';

export default {
  name: 'outputManager',
  components: { DetailDialog, UploadModel },
  data() {
    return {
      dataSource: [],
      curRow: {},
      isHttpProtocol: true,
    };
  },
  computed: {
    urlFilters() {
      const urlSet = new Set();
      this.dataSource.forEach(item => {
        const { Url = '' } = item;
        const pathList = Url.split('?');
        if (pathList.length > 1) {
          pathList.pop();
        }
        const saveUrl = pathList.join('?');
        if (saveUrl && !urlSet.has(saveUrl)) {
          urlSet.add(saveUrl);
        }
      });

      return [...urlSet].map(url => ({ text: url, value: url }));
    },
    tableColumns() {
      const columns = cloneDeep(tableColumns);
      return columns.map(item => {
        if (item.key === 'Url') {
          return {
            ...item,
            props: {
              ...item.props,
              filters: this.urlFilters,
              'filter-method': filterMethod,
            },
          };
        }

        return item;
      });

    },
  },
  created() {
    this.isHttpProtocol = window.location.protocol.startsWith('http');
    this.dataSource = Array.isArray(window.MITMPROXY_OUTPUT) ? window.MITMPROXY_OUTPUT : [];
  },
  methods: {
    onClearFilter() {
      this.$refs.table?.clearFilter?.();
    },
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

    .btn-group {
      display: flex;
      gap: 14px;
    }
  }

  .content {
    flex: 1;
    width: 100%;
    height: 100%;
  }
}
</style>
