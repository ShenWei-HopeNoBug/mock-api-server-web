<template>
  <el-dialog
    title="抓包接口数据详情"
    :visible.sync="visible"
    top="5vh"
    destroy-on-close
    center
    append-to-body
    width="800px"
    @close="close"
  >
    <div class="scroll">
      <div class="content">
        <div class="info-item" v-for="(item, i) in columns" :key="`info_${i}`">
          <div class="label">{{ item.label }}</div>
          <div v-if="item.type === 'jsonString'" class="value">
            <div class="json-area">
              <JsonInput :input-value="dataSource[item.key]" :code-editor-bind-attrs="item.codeEditorProps" />
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


const columns = [
  {
    label: 'Url',
    key: 'Url',
    type: 'text',
  },
  {
    label: 'Method',
    key: 'Method',
    type: 'text',
  },
  {
    label: 'Params',
    key: 'Params',
    type: 'jsonString',
    codeEditorProps: { height: '300px' },
  },
  {
    label: 'Response',
    key: 'Response',
    type: 'jsonString',
    codeEditorProps: { height: '600px' },
  },
];

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
  height: calc(90vh - 100px);
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
