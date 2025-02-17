<template>
  <div v-if="visible" class="searchFormContainer">
    <el-form :inline="true">
      <el-form-item>
        <slot name="beforeContent" />
      </el-form-item>
      <el-form-item
        class="formItem"
        v-for="(item,i) in showColumns"
        :key="`${item.key}_${i}`"
        :label="item.label"
      >
        <ComplexInputRender
          v-model="searchForm[item.key]"
          :options="item"
          :size="size"
          :publicBindAttrs="publicBindAttrs"
        />
      </el-form-item>
      <el-form-item class="formItem">
        <slot name="afterContent" />
      </el-form-item>
      <el-form-item>
        <el-popover v-if="showMoreButton" v-bind="getBindAttrs('morePopover', morePopoverBindAttrs)">
          <div class="moreContainer">
            <div
              class="moreFormItem"
              v-for="(item,i) in moreColumns"
              :key="`${item.key}_more_${i}`"
            >
              <span class="moreLabel" :style="`min-width: ${moreLabelMinWidth}px`">{{ item.label }}</span>
              <ComplexInputRender
                class="moreInput"
                v-model="searchForm[item.key]"
                :options="item"
                :publicBindAttrs="publicBindAttrs" />
            </div>
          </div>
          <el-button
            slot="reference"
            class="buttonItem"
            :size="size"
            v-bind="getBindAttrs('moreButton', moreButtonOption.bindAttrs)"
          >{{ getButtonText(moreButtonOption, '更多') }}
          </el-button>
        </el-popover>
        <el-button
          v-if="searchConfig.showSearchButton"
          class="buttonItem"
          :size="size"
          v-bind="getBindAttrs('searchButton', searchButtonOption.bindAttrs)"
          @click="onSearch"
        >{{ getButtonText(searchButtonOption, '查询') }}
        </el-button>
        <el-button
          v-if="searchConfig.showResetButton"
          class="buttonItem"
          :size="size"
          v-bind="getBindAttrs('resetButton', resetButtonOption.bindAttrs)"
          @click="onReset"
        >{{ getButtonText(resetButtonOption, '重置') }}
        </el-button>
      </el-form-item>
      <el-form-item class="toolBox">
        <slot name="toolBox" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import { defaultAttrsMap, defaultConfig } from './config';
import ComplexInputRender from 'src/components/form/inputs/ComplexInputRender/index.vue';

export default {
  name: 'SearchForm',
  components: { ComplexInputRender },
  props: {
    size: {
      type: String,
      default: 'small',
    },
    // 直接显示的输入框配置
    showColumns: {
      type: Array,
      default: () => [],
    },
    // 点击更多按钮显示的输入框配置
    moreColumns: {
      type: Array,
      default: () => [],
    },
    // 更多按钮属性配置
    moreButtonOption: {
      type: Object,
      default: () => ({}),
    },
    // 重置按钮属性配置
    resetButtonOption: {
      type: Object,
      default: () => ({}),
    },
    // 查询按钮属性配置
    searchButtonOption: {
      type: Object,
      default: () => ({}),
    },
    // 更多输入框标题最小宽度
    moreLabelMinWidth: {
      type: Number,
      default: Number('65'),
    },
    // 更多弹出框绑定标签属性
    morePopoverBindAttrs: {
      type: Object,
      default: () => ({}),
    },
    // 初始化表单数据
    initFormData: {
      type: Object,
      default: () => ({}),
    },
    // 表单整体配置
    config: {
      type: Object,
      default: () => ({}),
    },
    // 是否监测表单数据的变化
    watchFormChange: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchForm: {}, // 填写的搜索表单数据
      historyForm: {}, // 点击搜索后的历史搜索表单数据
      searchConfig: {}, // 搜索条设置
      unwatchFormFunc: null, // 取消监听表单数据函数
    };
  },
  computed: {
    // 是否显示更多的按钮
    showMoreButton() {
      return Boolean(Array.isArray(this.moreColumns) && this.moreColumns.length);
    },
    // 所有的输入框配置
    allColumns() {
      return [...cloneDeep(this.showColumns), ...cloneDeep(this.moreColumns)];
    },
    // 整个搜索框是否显示
    visible() {
      return Boolean(Array.isArray(this.allColumns) && this.allColumns.length);
    },
    inputOptionMap() {
      const map = {};
      const inputColumns = cloneDeep(this.allColumns);
      inputColumns.forEach(item => {
        const { key } = item || {};
        map[key] = item;
      });

      return map;
    },
    publicBindAttrs() {
      const { bindAttrs = {} } = this.searchConfig;
      return bindAttrs;
    },
  },
  watch: {
    allColumns: {
      handler() {
        this.init();
      },
      deep: true,
      immediate: true,
    },
    initFormData: {
      handler() {
        this.init();
      },
      deep: true,
    },
    config: {
      handler(obj) {
        const configObj = cloneDeep(obj) || {};
        this.searchConfig = { ...defaultConfig, ...configObj };
      },
      deep: true,
      immediate: true,
    },
    watchFormChange: {
      handler(isWatch) {
        if (!isWatch) {
          // 解除监听表单变化
          if (typeof this.unwatchFormFunc === 'function') {
            this.unwatchFormFunc();
          }
          this.unwatchFormFunc = null;
          return;
        }

        // 监听表单变化
        this.unwatchFormFunc = this.$watch('searchForm',
          formData => {
            this.$emit('formChange', this.searchForm, this.dealFormDataBeforeOnSubmit(formData));
          },
          { deep: true });
      },
      immediate: true,
    },
  },
  methods: {
    init() {
      this.refreshState();
      this.$nextTick(() => {
        const searchForm = this.initSearchFormValue(this.initFormData, this.inputOptionMap);
        this.$set(this, 'searchForm', searchForm);
        this.historyForm = cloneDeep(this.searchForm);
      });
    },
    refreshState() {
      this.searchForm = {};
      this.historyForm = {};
    },
    // 获取绑定的标签属性
    getBindAttrs(type, bindAttrs = {}) {
      const defaultAttrs = defaultAttrsMap[type] || {};
      const elemAttrs = bindAttrs || {};
      return {
        ...this.publicBindAttrs,
        ...defaultAttrs,
        ...elemAttrs,
      };
    },
    // 获取按钮文本
    getButtonText(buttonOptions = {}, defaultText = '') {
      const { text } = buttonOptions || {};
      return typeof text === 'string' ? text : defaultText;
    },
    // 初始化表单数据（默认值赋值）
    initSearchFormValue(initFormData = {}, inputOptionMap = {}) {
      const initValueMap = cloneDeep(initFormData) || {};
      const optionMap = inputOptionMap || {};

      const form = {};
      Object.keys(inputOptionMap).forEach(key => {
        const option = optionMap[key] || {};
        const { defaultValue, inputType = '', valueEnum = [] } = option;

        const initData = typeof initValueMap[key] === 'undefined' ? defaultValue : initValueMap[key];
        if (typeof initData === 'undefined') {
          return;
        }

        form[key] = initData;

        // 单选输入框初始值不在枚举列表的值置空，多选输入框不做处理
        if (inputType === 'selectInput' && !Array.isArray(initData)) {
          const selectValue = valueEnum.find(item => item.value === initData);
          if (!selectValue) {
            form[key] = undefined;
          }
        }
      });

      return form;
    },
    // 表单数据转换数据格式
    formatFormData(formData = {}) {
      const form = cloneDeep(formData);
      this.allColumns.forEach(option => {
        const { dataFormat, key = '' } = option || {};
        if (key && typeof dataFormat === 'function') {
          form[key] = dataFormat(form[key]);
        }
      });

      return form;
    },
    // 过滤表单中的特定值
    filterEmptyFormData(formData = {}, filterSet = new Set()) {
      const form = {};
      Object.keys(formData).forEach(key => {
        const data = formData[key];
        if (filterSet.has(data)) {
          return;
        }
        form[key] = data;
      });

      return form;
    },
    // 提交表单前统一处理查询数据
    dealFormDataBeforeOnSearch(searchForm = {}) {
      // 转换数据格式
      let formData = this.formatFormData(searchForm);
      const { filterSet = new Set(), reprocessFormData } = this.searchConfig;

      // 表单过滤指定值
      formData = this.filterEmptyFormData(formData, filterSet);

      // 对表单数据的再处理
      if (typeof reprocessFormData === 'function') {
        formData = reprocessFormData(cloneDeep(formData));
      }

      return formData;
    },
    onReset() {
      this.searchForm = this.initSearchFormValue(this.initFormData, this.inputOptionMap);
      this.onSearch();
    },
    onSearch() {
      this.historyForm = cloneDeep(this.searchForm);
      this.$emit('onSearch', this.dealFormDataBeforeOnSearch(this.searchForm));
    },
    // 获取历史搜索表单数据
    getHistorySubmitSearchForm() {
      return this.dealFormDataBeforeOnSearch(this.historyForm);
    },
  },
};
</script>

<style scoped lang="less">
.searchFormContainer {
  width: 100%;
}

.formItem {
  margin-bottom: 14px;

  &:not(:first-child) {
    margin-left: 10px;
  }
}

.buttonItem {
  margin-left: 8px;
}

.toolBox {
  margin-left: 8px;
}

.moreContainer {
  padding: 12px 10px;
  max-height: 525px;
  overflow: hidden;
  overflow-y: auto;

  .moreFormItem {
    line-height: 48px;
    display: flex;
  }

  .moreLabel {
    display: inline-block;
    margin-right: 8px;
  }

  .moreInput {
    flex: 1;
  }
}

.searchInput {
  width: 100%;
}
</style>
