<template>
  <el-dialog
    title="用户接口编辑器"
    :visible.sync="visible"
    :destroy-on-close="true"
    :center="true"
    :append-to-body="true"
    custom-class="__user-api_editor_dialog__"
    @close="close"
  >
    <div v-if="visible" class="content" v-dom-resize="onResize">
      <div class="scroll">
        <BaseForm
          ref="baseForm"
          :columns="userApiEditFormColumns"
          :init-form-data="initFormValues"
          :config="formConfig"
          @onSubmit="onSubmit"
        >
          <template #inputSlot="scope">
            <template v-if="scope.inputKey === 'params'">
              <JsonInput
                v-model="scope.form[scope.inputKey]"
                :copy="true"
                :code-editor-bind-attrs="previewCodeEditorProps"
              />
            </template>
            <template v-else-if="scope.inputKey === 'response'">
              <JsonInput
                v-model="scope.form[scope.inputKey]"
                :copy="true"
                :code-editor-bind-attrs="previewCodeEditorProps"
              />
            </template>
          </template>
        </BaseForm>
      </div>
    </div>
    <div class="footer">
      <el-button
        type="primary"
        size="medium"
        :loading="loading"
        @click="triggerSubmit"
      >
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import JsonInput from 'src/components/form/inputs/JsonInput/index.vue';
import BaseForm from 'src/components/form/BaseForm/index.vue';
import { userApiEditFormColumns, formConfig } from './config';
import { cloneDeep } from 'lodash';

const getDefaultShowOptions = () => ({
  isEdit: true,
});

export default {
  name: 'UserApiEditorDialog',
  components: { JsonInput, BaseForm },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    initFormData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      initFormValues: {},
      userApiEditFormColumns,
      formConfig,
      visible: false,
      previewHeight: '300px',
      showOptions: getDefaultShowOptions(),
    };
  },
  computed: {
    isEdit() {
      const { isEdit = true } = this.showOptions;
      return Boolean(isEdit);
    },
    previewCodeEditorProps() {
      return {
        height: this.previewHeight,
      };
    },
  },
  methods: {
    initStates() {
      this.previewHeight = '300px';
      this.showOptions = getDefaultShowOptions();
    },
    onResize(entry) {
      if (!entry?.target) {
        return;
      }

      const { height } = entry.target.getBoundingClientRect();
      const offset = 42;
      const minHeight = 100;
      const previewHeight = Math.max(minHeight, height - offset);
      this.previewHeight = `${previewHeight}px`;
    },
    show(options = {}) {
      this.initStates();
      this.showOptions = options || getDefaultShowOptions();
      this.$nextTick(() => {
        const { isEdit = true } = options;
        this.initFormValues = isEdit ? cloneDeep(this.initFormData) : { method: 'GET' };
        this.visible = true;
      });
    },
    close() {
      this.visible = false;
      this.$emit('close', this.isEdit);
      this.initStates();
    },
    triggerSubmit() {
      this.$refs.baseForm?.onSubmit?.();
    },
    onSubmit(formData = {}) {
      this.$emit('submit', {
        form: formData,
        isEdit: this.isEdit,
      });
    },
  },
};
</script>

<style scoped lang="less">
.content {
  width: 100%;
  height: calc(100vh - 210px);
  min-height: 200px;
  padding-right: 8px;
  scrollbar-gutter: stable;
  word-break: break-word;
  display: flex;
  justify-content: space-between;
  gap: 14px;
}

.scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;

  .scroll-content {
    width: 100%;
    scrollbar-gutter: stable;
  }
}

.footer {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-top: 14px;
}
</style>

<style lang="less">
.__user-api_editor_dialog__ {
  margin: 24px auto 0 !important;
  width: calc(100vw - 48px) !important;
}
</style>
