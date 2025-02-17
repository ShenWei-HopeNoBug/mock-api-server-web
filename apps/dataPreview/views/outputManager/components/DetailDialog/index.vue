<template>
  <el-dialog
    title="抓包接口数据详情"
    :visible.sync="visible"
    top="5vh"
    :destroy-on-close="true"
    :center="true"
    :append-to-body="true"
    custom-class="__mitmproxy-preview_dialog__"
    @close="close"
  >
    <div v-if="visible" class="scroll">
      <div class="content">
        <div class="info-item" v-for="(item, i) in columns" :key="`info_${i}`">
          <div class="label">{{ item.label }}</div>
          <div v-if="item.type === 'jsonString'" class="value">
            <div class="json-area">
              <JsonInput
                :input-value="dataSource[item.key]"
                :code-editor-bind-attrs="item.codeEditorProps"
                :copy="true"
                default-copy-content="{}"
              />
            </div>
          </div>
          <div v-else class="value">{{ dataSource[item.key] }}</div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import JsonInput from 'src/components/form/inputs/JsonInput/index.vue';
import { columns } from './config';

export default {
  name: 'DetailDialog',
  components: { JsonInput },
  props: {
    dataSource: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      columns,
      visible: false,
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="less">
.scroll {
  width: 100%;
  height: calc(100vh - 214px);
  overflow: hidden;
  overflow-y: auto;
}

.content {
  width: 100%;
  padding-right: 8px;
  scrollbar-gutter: stable;
  word-break: break-word;

  .info-item {
    width: 100%;
    margin-bottom: 20px;

    .label {
      font-size: 16px;
      font-weight: bold;
      line-height: 28px;
      margin-bottom: 4px;

      &:after {
        content: ':';
        padding: 0 4px;
      }
    }
  }
}

.json-area {
  padding: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>

<style lang="less">
.__mitmproxy-preview_dialog__ {
  margin-top: 0;
  width: calc(100vw - 100px) !important;
}
</style>
