<template>
  <el-form
    class="formContainer"
    ref="ruleForm"
    :model="form"
    v-bind="getBindAttrs('formContainer', formBindAttrs)"
  >
    <el-form-item
      class="formItem"
      v-for="(item,i) in inputColumns"
      v-if="!item.hideInput"
      :key="`${item.key}_${i}`"
      :label="item.label"
      :prop="item.key"
      :rules="getFormItemRules(item)"
      v-bind="getBindAttrs('formItem', item.formItemBindAttrs)"
    >
      <template v-if="Array.isArray(item.labelTips) && item.labelTips.length" slot="label">
        {{ item.label }}
        <Tooltip :slotContent="true" v-bind="getBindAttrs('labelTips', item.labelTipsBindAttrs)">
          <template #content>
            <div class="labelTip" v-for="(tip, i) in item.labelTips" :key="`labelTip_${i}`">{{ tip }}</div>
          </template>
        </Tooltip>
      </template>
      <slot
        v-if="item.slot"
        name="inputSlot"
        :size="size"
        :options="item"
        :inputKey="item.key"
        :inputValue="form[item.key]"
        :form="form"
        :index="i"
        :onChange="onChange"
      ></slot>
      <ComplexInputRender
        v-else
        v-model="form[item.key]"
        :options="item"
        :size="size"
        :publicBindAttrs="publicBindAttrs"
        @change="onChange"
      />
      <slot
        name="inputAfterSlot"
        :size="size"
        :options="item"
        :inputKey="item.key"
        :inputValue="form[item.key]"
        :form="form"
        :index="i"
        :onChange="onChange"
      ></slot>
    </el-form-item>
  </el-form>
</template>

<script>
import { cloneDeep, isObject } from 'lodash';
import Tooltip from 'src/components/Tooltip/index.vue';
import ComplexInputRender from '../inputs/ComplexInputRender/index.vue';
import { defaultAttrsMap, defaultConfig, getInputRuleMessageMap, inputRuleTriggerMap } from './config';

export default {
  name: 'BaseForm',
  components: { ComplexInputRender, Tooltip },
  model: {
    prop: 'inputForm',
    event: 'change',
  },
  props: {
    inputForm: {},
    size: {
      type: String,
      default: 'small'
    },
    // 输入框配置项
    columns: {
      type: Array,
      default: () => [],
    },
    /**
     * @description 是否需要初始化表单
     * 注意：如果出现 BaseForm 输入项配置了插槽 slot 且又插槽插了个内嵌 BaseForm 这种套娃的情况，
     * 被内嵌的 BaseForm 最好 needInitForm 设成 false，拿 initFormData 那个 props 初始化表单会有赋值时机的问题，导致初始化表单异常
     * */
    needInitForm: {
      type: Boolean,
      default: true,
    },
    // 初始化表单数据
    initFormData: {
      type: Object,
      default: () => ({}),
    },
    // 公共绑定标签属性
    publicBindAttrs: {
      type: Object,
      default: () => ({}),
    },
    // 表单绑定标签属性
    formBindAttrs: {
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
      form: {},
      inputColumns: [],
      formConfig: {},
      unwatchFormFunc: null, // 取消监听表单数据函数
      unwatchFormSingleValueFuncMap: {}, // 取消监听单个表单数据函数map表
      resetTimer: null, // 重置为初始化表单定时器
    };
  },
  computed: {
    inputOptionMap() {
      const map = {};
      const inputColumns = cloneDeep(this.inputColumns);
      inputColumns.forEach(item => {
        const { key } = item || {};
        map[key] = item;
      });

      return map;
    },
    // 受监控的输入项列表
    watchKeyList() {
      const list = [];
      this.inputColumns.forEach(item => {
        const { watch = false, key = '' } = item || {};
        if (!watch || !key) {
          return;
        }
        list.push(key);
      });

      return list;
    },
  },
  watch: {
    columns: {
      handler() {
        this.init();
      },
      deep: true,
      immediate: true,
    },
    config: {
      handler(val) {
        const formConfig = cloneDeep(val) || {};
        this.formConfig = {
          ...defaultConfig,
          ...formConfig,
        };
      },
      deep: true,
      immediate: true,
    },
    initFormData: {
      handler() {
        this.onReset();
      },
      deep: true,
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
        this.unwatchFormFunc = this.$watch('form',
          formData => {
            this.$emit('formChange', this.form, this.dealFormDataBeforeOnSubmit(formData));
          },
          { deep: true });
      },
      immediate: true,
    },
    // 外部双向绑定表单值变化
    inputForm: {
      handler(val) {
        if (isObject(val)) {
          this.form = val;
        } else {
          this.form = {};
          this.$emit('change', this.form);
        }
      },
      deep: true,
    },
  },
  beforeDestroy() {
    clearTimeout(this.resetTimer);
  },
  methods: {
    init() {
      this.refreshState();
      this.$nextTick(() => {
        this.inputColumns = this.getInputColumns(this.columns, this.initFormData);
        // 初始化表单和动态添加表单项 watch
        this.resetFormValue(true);
      });
    },
    // 重置表单数据
    resetFormValue(addWatch = false) {
      clearTimeout(this.resetTimer);

      const callback = () => {
        // 根据配置项监听表单单项数据变化
        addWatch && this.addFormSingleValueWatch();

        // 不需要初始化表单，退出
        if (!this.needInitForm) {
          return;
        }

        // 初始化表单数据
        const initForm = this.dealInitFormData(this.initFormData, this.inputOptionMap);
        this.$set(this, 'form', initForm);
        this.onChange();
      };

      /**
       * 这里用个宏任务异步下初始化表单操作，因为存可能在 BaseForm 表单项目设置了 slot 又内嵌了一层 BaseForm 的这种套娃用法，
       * 表单项可能赋值时机会有问题，赋值不进去，比如 sliderInput
       * */
      this.resetTimer = setTimeout(() => {
        callback();
      });
    },
    refreshState() {
      this.form = {};
      this.inputColumns = [];
    },
    // 获取输入框设置列表
    getInputColumns(columns = [], initFormData = {}) {
      const columnsCp = cloneDeep(columns) || [];
      const initValueMap = initFormData || {};

      const inputColumns = [];
      columnsCp.forEach(item => {
        const { key, inputType } = item || {};

        let inputOption = item;
        // 为复杂输入框设置初始化列表长度
        if (inputType === 'complexInput') {
          const initValue = initValueMap[key];
          if (Array.isArray(initValue)) {
            inputOption = {
              ...item,
              initValueLength: initValue.length,
            };
          }
        }

        inputColumns.push(inputOption);
      });

      return inputColumns;
    },
    // 获取表单项校验规则
    getFormItemRules(options = {}) {
      const {
        required = false, // 是否是必填项
        rules, // 完整的校验规则（覆盖默认）
        label = '',
        inputType = '',
        firstRule = {}, // 第一个校验规则（会和内置的第一个校验项合并）
        extraRules = [], // 内置校验规则外还要补充的校验规则
      } = options;

      if (Array.isArray(rules) && rules.length) {
        return rules;
      }

      if (!required) {
        return [];
      }

      const inputRuleMessageMap = getInputRuleMessageMap();
      const inputMsg = inputRuleMessageMap[inputType] || '请输入';

      // 第一个校验项
      const firstRuleItem = { required, message: `${inputMsg}${label}` };

      // 校验触发条件
      const trigger = inputRuleTriggerMap[inputType];
      if (trigger) {
        firstRuleItem.trigger = trigger;
      }

      // 合并校验配置项
      return [{ ...firstRuleItem, ...firstRule }, ...extraRules];
    },
    // 解除对单个表单数据变化的监测
    removeFormSingleValueWatch() {
      Object.keys(this.unwatchFormSingleValueFuncMap).forEach(key => {
        const unwatchFunc = this.unwatchFormSingleValueFuncMap[key];
        if (typeof unwatchFunc === 'function') {
          unwatchFunc();
        }
        this.unwatchFormSingleValueFuncMap[key] = null;
      });
      this.unwatchFormSingleValueFuncMap = {};
    },
    // 监测单个表单数据的变化
    addFormSingleValueWatch() {
      // 解除监测
      this.removeFormSingleValueWatch();

      // 添加监测
      this.watchKeyList.forEach(key => {
        const unwatchFuncMap = {};
        unwatchFuncMap[key] = this.$watch(`form.${key}`,
          value => {
            this.$emit('formValueChange',
              value,
              key,
              this.form,
              this.dealFormDataBeforeOnSubmit(this.form),
            );
          },
          { deep: true },
        );
        this.unwatchFormSingleValueFuncMap = unwatchFuncMap;
      });
    },
    // 初始化表单赋值
    dealInitFormData(initFormData = {}, inputOptionMap = {}) {
      const initValueMap = cloneDeep(initFormData) || {};
      const optionMap = inputOptionMap || {};

      const form = {};
      Object.keys(optionMap).forEach(key => {
        const option = optionMap[key] || {};
        const { inputType = '', valueEnum = [], defaultValue } = option;
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
    formatFormData(inputColumns = [], form = {}) {
      const inputColumnsCp = cloneDeep(inputColumns) || [];

      const formCp = cloneDeep(form);
      inputColumnsCp.forEach(option => {
        const { dataFormat, key = '' } = option || {};
        if (key && typeof dataFormat === 'function') {
          formCp[key] = dataFormat(form[key], cloneDeep(option));
        }
      });

      return form;
    },
    // 过滤表单中的特定值
    filterFormData(form = {}, filterSet = new Set()) {
      const filterForm = {};
      Object.keys(form).forEach(key => {
        const data = form[key];
        if (filterSet.has(data)) {
          return;
        }
        filterForm[key] = data;
      });

      return filterForm;
    },
    // 设置待提交表单默认参数
    setDefaultSubmitValue(form = {}) {
      const formCp = cloneDeep(form);
      const { submitDefaultValueForm = {} } = this.formConfig;
      Object.keys(submitDefaultValueForm).forEach(key => {
        const submitDefaultValue = submitDefaultValueForm[key];
        if (typeof submitDefaultValue === 'undefined') {
          return;
        }

        if (typeof formCp[key] === 'undefined') {
          formCp[key] = submitDefaultValue;
        }
      });

      return formCp;
    },
    // 提交表单前统一处理表单数据
    dealFormDataBeforeOnSubmit() {
      let form = this.formatFormData(this.inputColumns, this.form);
      const { filterSet = new Set(), reprocessFormData } = this.formConfig;

      // 表单过滤指定值
      form = this.filterFormData(form, filterSet);

      // 设置待提交表单默认参数
      form = this.setDefaultSubmitValue(form);

      // 对表单数据的再处理
      if (typeof reprocessFormData === 'function') {
        form = reprocessFormData(cloneDeep(form));
      }

      return form;
    },
    // 获取绑定的标签属性
    getBindAttrs(type, bindAttrs = {}) {
      const { publicBindAttrs = {} } = this;
      const defaultAttrs = defaultAttrsMap[type] || {};
      const elemAttrs = bindAttrs || {};
      return {
        ...publicBindAttrs,
        ...defaultAttrs,
        ...elemAttrs,
      };
    },
    // 重载表单dom
    reloadFormDom(initFormData = {}) {
      this.refreshState();
      this.$nextTick(() => {
        this.inputColumns = this.getInputColumns(this.columns, initFormData);
        // 重置表单
        this.resetFormValue(false);
      });
    },
    // 更新表单数据
    onUpdate(updateData = {}) {
      if (Object.prototype.toString.call(updateData) !== '[object Object]') {
        return;
      }

      const updateKeyList = Object.keys(updateData);
      if (!updateKeyList.length) {
        return;
      }

      for (let i = 0; i < updateKeyList.length; i++) {
        const key = updateKeyList[i];
        const oldValue = JSON.stringify(this.form[key]);
        const newValue = JSON.stringify(updateData[key]);
        if (oldValue !== newValue) {
          const updateForm = {
            ...this.form,
            ...updateData,
          };

          this.reloadFormDom(updateForm);
          break;
        }
      }
    },
    // 重置表单数据
    onReset() {
      this.reloadFormDom(this.initFormData);
    },
    // 提交表单数据
    onSubmit() {
      if (!this.$refs.ruleForm) {
        return;
      }

      // 检验必填项目
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit('onSubmit', this.dealFormDataBeforeOnSubmit(this.form));
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: '请将表单填写完整',
          });
        }
      });
    },
    // 检验必填项目
    onValidate(...args) {
      if (!this.$refs.ruleForm) {
        return;
      }

      this.$refs.ruleForm.validate(...args);
    },
    onChange() {
      this.$emit('change', this.form);
    },
  },
};
</script>

<style scoped lang="less">
.formContainer {
  width: 100%;
}

.formItem {
  padding: 10px;
  margin-bottom: 0;
}

.labelTip {
  &:not(:last-child) {
    margin-bottom: 6px;
  }
}
</style>
