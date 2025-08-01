<template>
  <div class="output-manager">
    <el-card class="header">
      <div class="search-bar">
        <SearchForm :show-columns="searchFormColumns" @onSearch="onSearchSubmit" />
      </div>
      <div class="tool-bar">
        <div class="btn-group">
          <el-button type="primary" size="small" @click="onEditUserApi">用户接口编辑器</el-button>
        </div>
      </div>
    </el-card>
    <el-card v-dom-resize="onResize" class="content">
      <el-table
        ref="table"
        row-key="id"
        :data="paginationTableData"
        highlight-current-row
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
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="onDetail(scope.row)">查看详情</el-button>
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
    <UserApiEditorDialog ref="userApiEditorDialog" />
    <DetailDialog ref="detailDialog" :data-source="curRow" @close="onDialogClose" />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import SearchForm from 'src/components/form/SearchForm/index.vue';
import UserApiEditorDialog from './components/UserApiEditorDialog/index.vue';
import DetailDialog from './components/DetailDialog/index.vue';
import UploadModel from 'src/components/UploadModel/index.vue';
import { searchFormColumns, tableColumns, filterMethod } from './config';

export default {
  name: 'outputManager',
  components: { SearchForm, UserApiEditorDialog, DetailDialog, UploadModel },
  data() {
    return {
      tableColumns,
      searchFormColumns,
      searchForm: {},
      dataSource: [],
      tableData: [],
      curRow: {},
      tableHeight: '550px',
      total: 0,
      pagination: {
        currentPage: 1,
        pageSize: 50,
        pageSizes: [10, 20, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
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
  },
  created() {
    this.dataSource = Array.isArray(window.MITMPROXY_OUTPUT) ? window.MITMPROXY_OUTPUT : [];
    this.tableData = this.dataSource;
    this.total = this.tableData.length;
  },
  methods: {
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
      this.searchForm = cloneDeep(searchForm);
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
    onEditUserApi() {
      this.$refs.userApiEditorDialog?.show?.();
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
      const offset = 80;
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
    -webkit-line-clamp: 3;
  }
}
</style>
