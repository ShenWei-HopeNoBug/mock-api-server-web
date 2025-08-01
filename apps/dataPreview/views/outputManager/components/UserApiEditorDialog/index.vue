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
    <div v-if="visible" class="content" v-dom-resize="onContentResize">
      <div class="left">
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
                <JsonInput v-model="scope.form[scope.inputKey]" />
              </template>
              <template v-else-if="scope.inputKey === 'response'">
                <JsonInput
                  v-model="scope.form[scope.inputKey]"
                  :code-editor-bind-attrs="responseCodeEditorProps"
                />
              </template>
            </template>
          </BaseForm>
        </div>
      </div>
      <div class="right">
        <div class="header">
          <el-button type="primary" size="small" @click="onOutput">转换</el-button>
        </div>
        <div class="preview">
          <JsonInput
            ref="previewEditor"
            :input-value="dataJson"
            :code-editor-bind-attrs="previewCodeEditorProps"
            :copy="true"
            default-copy-content="{}"
          />
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import JsonInput from 'src/components/form/inputs/JsonInput/index.vue';
import BaseForm from 'src/components/form/BaseForm/index.vue';
import { userApiEditFormColumns, formConfig } from './config';

const initFormValues = {
  method: 'GET',
};

export default {
  name: 'UserApiEditorDialog',
  components: { JsonInput, BaseForm },
  data() {
    return {
      initFormValues,
      userApiEditFormColumns,
      formConfig,
      visible: false,
      dataJson: '{}',
      responseHeight: '300px',
      previewHeight: '300px',
    };
  },
  computed: {
    responseCodeEditorProps() {
      return {
        height: this.responseHeight,
      };
    },
    previewCodeEditorProps() {
      return {
        readonly: true,
        height: this.previewHeight,
      };
    },
  },
  methods: {
    initStates() {
      this.dataJson = '{}';
      this.previewHeight = '300px';
      this.responseHeight = '300px';
    },
    onContentResize(entry) {
      if (!entry?.target) {
        return;
      }

      const { height } = entry.target.getBoundingClientRect();
      const responseOffset = 80;
      const minHeight = 100;

      const responseHeight = Math.max(minHeight, height - responseOffset);
      this.responseHeight = `${responseHeight}px`;

      const previewOffset = 116;
      const previewHeight = Math.max(minHeight, height - previewOffset);
      this.previewHeight = `${previewHeight}px`;
    },
    show() {
      this.initStates();
      this.visible = true;
    },
    close() {
      this.visible = false;
      this.initStates();
      this.$emit('close');
    },
    onOutput() {
      this.$refs.baseForm?.onSubmit?.();
    },
    onSubmit(formData = {}) {
      this.dataJson = JSON.stringify(formData);
      this.$nextTick(() => {
        this.$refs.previewEditor?.formatCode?.();
      });
    },
  },
};
</script>

<style scoped lang="less">
.content {
  width: 100%;
  height: calc(100vh - 160px);
  padding-right: 8px;
  scrollbar-gutter: stable;
  word-break: break-word;
  display: flex;
  justify-content: space-between;
  gap: 14px;

  .left, .right {
    width: 100%;
    height: 100%;
    border: #B4B5B7 1px solid;
    border-radius: 4px;
    padding: 14px;
  }

  .left {
    width: 55%;
    padding-right: 8px;
  }

  .right {
    width: 45%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .header {
      width: 100%;
      margin-bottom: 14px;
    }

    .preview {
      width: 100%;
      height: 100%;
      flex: 1;
      overflow: hidden;
    }
  }
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
</style>

<style lang="less">
.__user-api_editor_dialog__ {
  margin: 24px auto 0 !important;
  width: calc(100vw - 48px) !important;
}
</style>
