<template>
  <div class="output-manager">
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
    <DetailDialog ref="detailDialog" :data-source="curRow" @close="onDialogClose" />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import DetailDialog from './components/DetailDialog.vue';
import { tableColumns } from './config';
import { getMitmproxyOutputList } from 'apps/dataPreview/api';

export default {
  name: 'outputManager',
  components: { DetailDialog },
  data() {
    return {
      tableColumns,
      dataSource: [],
      curRow: {},
      isHttpProtocol: true,
    };
  },
  mounted() {
    this.isHttpProtocol = window.location.protocol.startsWith('http');
    // 页面部署在服务上，请求静态数据
    if (this.isHttpProtocol) {
      getMitmproxyOutputList().then(res => {
        this.dataSource = Array.isArray(res) ? res : [];
      });
    }
  },
  methods: {
    onDetail(record = {}) {
      this.curRow = cloneDeep(record);
      this.$refs.detailDialog?.show?.();
    },
    onDialogClose() {
      this.curRow = {};
    },
  },
};
</script>

<style scoped lang="less">
.output-manager {
  width: 100%;
}
</style>
