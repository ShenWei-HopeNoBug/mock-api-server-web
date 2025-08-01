<template>
  <div v-loading="pageLoading" class="output-manager">
    <el-card class="header">
      <div class="search-bar">
        <SearchForm
          :init-form-data="initSearchForm"
          :show-columns="searchFormColumns"
          @onSearch="onSearchSubmit"
        />
      </div>
      <div class="tool-bar">
        <div class="btn-group">
          <el-button type="primary" size="small" @click="onAdd">新增 Mock 接口</el-button>
        </div>
      </div>
    </el-card>
    <el-card v-dom-resize="onResize" class="content">
      <el-table
        ref="table"
        row-key="id"
        v-loading="tableLoading"
        :data="paginationTableData"
        :highlight-current-row="true"
        :height="tableHeight"
        :stripe="true"
      >
        <el-table-column type="index" width="50">
          <template slot-scope="scope">
            {{ getRowIndex(scope.$index) }}
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item, i) in tableColumns"
          :key="`column-${i}`"
          :prop="item.key"
          :label="item.label"
          v-bind="item.props"
        >
          <template slot-scope="scope">
            <div class="params" v-if="item.key === 'params'">
              {{ scope.row[item.key] }}
            </div>
            <div v-else>{{ scope.row[item.key] }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="220">
          <template slot-scope="scope">
            <div class="operation">
              <el-button type="text" @click="onDetail(scope.row)">查看详情</el-button>
              <template v-if="scope.row.type === 'USER'">
                <el-button type="text" @click="onEdit(scope.row)">编辑</el-button>
                <el-popconfirm style="margin-left: 10px;" title="确认删除？" @confirm="onDelete(scope.row)">
                  <el-button slot="reference" type="text" style="color: rgb(245, 108, 108)">删除</el-button>
                </el-popconfirm>
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :total="total"
          v-bind="pagination"
          @size-change="onSizeChange"
          @current-change="onPageChange"
        />
      </div>
    </el-card>
    <UserApiEditorDialog
      ref="userApiEditorDialog"
      :init-form-data="curRow"
      :loading="editLoading"
      @submit="onUserApiEditorSubmit"
      @close="onUserApiEditorDialogClose"
    />
    <DetailDialog ref="detailDialog" :data-source="curRow" @close="onDetailDialogClose" />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import SearchForm from 'src/components/form/SearchForm/index.vue';
import UserApiEditorDialog from './components/UserApiEditorDialog/index.vue';
import DetailDialog from './components/DetailDialog/index.vue';
import UploadModel from 'src/components/UploadModel/index.vue';
import { initSearchForm, searchFormColumns, tableColumns } from './config';
import InteractObjManager from 'src/assets/js/InteractObjManager';
import { isJsonString, generateUUID } from 'src/assets/js/utils';

export default {
  name: 'outputManager',
  components: { SearchForm, UserApiEditorDialog, DetailDialog, UploadModel },
  data() {
    return {
      tableColumns,
      initSearchForm,
      searchFormColumns,
      searchForm: cloneDeep(initSearchForm),
      dataSource: [],
      tableData: [],
      curRow: {},
      tableHeight: '550px',
      total: 0,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
      },
      actionIdMap: {
        get_mock_data: '',
        fix_mock_data: '',
        edit_mock_data: '',
        add_mock_data: '',
        delete_mock_data: '',
      },
    };
  },
  computed: {
    paginationTableData() {
      if (!this.total) {
        return [];
      }
      const { currentPage, pageSize } = this.pagination;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = (currentPage) * pageSize;
      return this.tableData.slice(startIndex, endIndex);
    },
    pageLoading() {
      return Boolean(this.actionIdMap?.fix_mock_data);
    },
    tableLoading() {
      const { get_mock_data = '', delete_mock_data = '' } = this.actionIdMap || {};
      return Boolean(get_mock_data || delete_mock_data);
    },
    editLoading() {
      const { edit_mock_data = '', add_mock_data = '' } = this.actionIdMap || {};
      return Boolean(edit_mock_data || add_mock_data);
    },
  },
  beforeDestroy() {
    InteractObjManager.off('receive', this.onReceive);
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      InteractObjManager.on('receive', this.onReceive);
      InteractObjManager.sendObjMsg({ type: 'loaded' });
      this.$nextTick(() => {
        this.getDataSource(true);
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
      if (!InteractObjManager.isRegistered()) {
        return;
      }

      const { data = {}, name = '', extra = {} } = options;
      if (!name) {
        return;
      }

      const action_id = generateUUID();
      this.actionIdMap[name] = action_id;
      InteractObjManager.sendObjMsg({
        params: {},
        ...data,
        type: 'request',
        name,
        action_id,
        extra,
      });
    },
    // 处理请求类型的事件
    onRequestEvent(eventData = {}) {
      const { type = '', name = '', data = {}, action_id = '', extra = {} } = eventData;
      if (type !== 'request') {
        return;
      }

      if (!action_id || action_id !== this.actionIdMap[name]) {
        return;
      }

      switch (name) {
        case 'get_mock_data': {
          const { list = [] } = data;
          this.dataSource = Array.isArray(list) ? list : [];
          const { refresh = true } = extra;
          // 判断是否需要刷新页码
          if (refresh) {
            this.pagination.currentPage = 1;
          }
          this.onSearch();
          break;
        }
        case 'fix_mock_data': {
          if (data) {
            this.$message.success('修复异常接口数据成功');
          } else {
            this.$message.error('修复异常接口数据失败');
          }

          // 刷新数据源
          this.getDataSource(true);
          break;
        }
        case 'edit_mock_data': {
          if (data) {
            this.$message.success('更新接口数据成功');
            this.getDataSource(false);
            this.$refs.userApiEditorDialog?.close?.();
          } else {
            this.$message.error('更新接口数据失败');
          }

          break;
        }
        case 'add_mock_data': {
          if (data) {
            this.$message.success('新增接口数据成功');
            this.getDataSource(true);
            this.$refs.userApiEditorDialog?.close?.();
          } else {
            this.$message.error('新增接口数据失败');
          }

          break;
        }
        case 'delete_mock_data': {
          if (data) {
            this.$message.success('删除接口数据成功');
            this.getDataSource(true);
          } else {
            this.$message.error('删除接口数据失败');
          }

          break;
        }
        default:
      }

      // 清除对应的 action_id
      if (this.actionIdMap[name]) {
        this.actionIdMap[name] = '';
      }
    },
    // 获取数据源
    getDataSource(refresh = true, params = {}) {
      // webChannel 未注册成功，跳过
      if (!InteractObjManager.isRegistered()) {
        return;
      }

      this.sendRequestMessage({
        name: 'get_mock_data',
        params,
        extra: { refresh },
      });
    },
    getRowIndex(index) {
      const { currentPage, pageSize } = this.pagination;
      const startIndex = (currentPage - 1) * pageSize;
      return startIndex + index + 1;
    },
    onSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.onSearch();
    },
    onPageChange(page) {
      this.pagination.currentPage = page;
      this.onSearch();
    },
    onSearchSubmit(searchForm = {}) {
      const { type: oldType = '' } = this.searchForm;
      const { type: newType = '' } = searchForm;
      this.searchForm = cloneDeep(searchForm);
      // 筛选的数据源有变动，重新请求对应数据
      if (oldType !== newType) {
        this.getDataSource(true, { type: newType });
        return;
      }

      this.pagination.currentPage = 1;
      this.onSearch();
    },
    onSearch() {
      const keyList = searchFormColumns.map(item => item.key);
      const matchList = [];
      // 模糊匹配配置
      keyList.forEach(key => {
        const value = this.searchForm[key];
        if (!value) {
          return;
        }

        const regexp = new RegExp(`${value}`, 'i');
        matchList.push({ key, regexp });
      });

      // 是否模糊匹配
      const isMatch = (record = {}) => {
        for (let i = 0; i < matchList.length; i++) {
          const config = matchList[i];
          const { key, regexp } = config;
          const value = String(record[key]);
          if (!regexp?.test(value)) {
            return false;
          }
        }

        return true;
      };

      this.tableData = this.dataSource.filter(item => isMatch(item));
      this.total = this.tableData.length;
    },
    onDetail(record = {}) {
      this.curRow = cloneDeep(record);
      this.$refs.detailDialog?.show?.();
    },
    onDetailDialogClose() {
      this.curRow = {};
    },
    onResize(entry) {
      if (!entry?.target) {
        return;
      }

      const { height } = entry.target.getBoundingClientRect();
      const offset = 80;
      const minHeight = 200;
      const tableHeight = Math.max(minHeight, height - offset);
      this.tableHeight = `${tableHeight}px`;
    },
    checkApiDataValid(record = {}) {
      const { id = '' } = record || {};
      const valid = Boolean(id);

      if (!valid) {
        this.$confirm('检测到接口数据异常，是否修复？', '确认', {
          type: 'error',
        }).then(() => {
          this.onFixMockData();
        });
      }

      return Boolean(id);
    },
    onEdit(record = {}) {
      // 检查数据是否合法
      if (!this.checkApiDataValid(record)) {
        return;
      }

      this.curRow = cloneDeep(record);
      this.$refs.userApiEditorDialog?.show?.({ isEdit: true });
    },
    onFixMockData() {
      this.sendRequestMessage({
        name: 'fix_mock_data',
      });
    },
    onEditSubmit(formData = {}) {
      const { id = '' } = this.curRow;
      if (!id) {
        this.$message.error('编辑接口数据失败！');
        return;
      }

      const params = { id, ...formData };
      this.sendRequestMessage({
        name: 'edit_mock_data',
        data: { params },
      });
    },
    onAdd() {
      this.curRow = {};
      this.$refs.userApiEditorDialog?.show?.({ isEdit: false });
    },
    onAddSubmit(formData = {}) {
      this.sendRequestMessage({
        name: 'add_mock_data',
        data: { params: formData },
      });
    },
    onUserApiEditorSubmit(data = {}) {
      const { form = {}, isEdit = true } = data;
      if (isEdit) {
        this.onEditSubmit(form);
      } else {
        this.onAddSubmit(form);
      }
    },
    onUserApiEditorDialogClose() {
      this.curRow = {};
      this.actionIdMap.edit_mock_data = '';
      this.actionIdMap.add_mock_data = '';
    },
    onDelete(record = {}) {
      // 检查数据是否合法
      if (!this.checkApiDataValid(record)) {
        return;
      }

      const { id = '' } = record;
      const params = { id };
      this.sendRequestMessage({
        name: 'delete_mock_data',
        data: { params },
      });
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

    .search-bar {
      width: 100%;
    }

    .tool-bar {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;

      .btn-group {
        display: flex;
        gap: 14px;
      }
    }
  }

  .content {
    flex: 1;
    width: 100%;
    height: 100%;

    /deep/ .el-card__body {
      padding: 14px 20px 0;
    }

    .operation {
      display: flex;
      gap: 6px;
    }

    .pagination {
      height: 60px;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
    }
  }

  .params {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>
