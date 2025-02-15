<template>
  <div class="output-manager">
    <el-card class="header">
      <div class="btn-group">
        <el-button type="primary" @click="onClearFilter">清除所有过滤器</el-button>
      </div>
    </el-card>
    <el-card v-dom-resize="onResize" class="content">
      <el-table ref="table" :data="dataSource" highlight-current-row :height="tableHeight">
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
import { tableColumns, filterMethod } from './config';

export default {
  name: 'outputManager',
  components: { DetailDialog, UploadModel },
  data() {
    return {
      dataSource: [],
      curRow: {},
      tableHeight: '550px',
    };
  },
  computed: {
    urlFilters() {
      const urlSet = new Set();
      const httpReg = new RegExp('^https?:');
      const queryReg = new RegExp('\\?.*$');

      this.dataSource.forEach(item => {
        const { url = '' } = item;

        let saveUrl = url.replace(queryReg, '');
        saveUrl = saveUrl.replace(httpReg, '');

        if (saveUrl && !urlSet.has(saveUrl)) {
          urlSet.add(saveUrl);
        }
      });

      return [...urlSet].map(url => ({ text: url, value: url }));
    },
    tableColumns() {
      const columns = cloneDeep(tableColumns);
      return columns.map(item => {
        if (item.key === 'url') {
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
    onResize(entry) {
      if (!entry?.target) {
        return;
      }

      const { height } = entry.target.getBoundingClientRect();
      const offset = 40;
      const minHeight = 200;
      const tableHeight = Math.max(minHeight, height - offset);
      this.tableHeight = `${tableHeight}px`;
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
