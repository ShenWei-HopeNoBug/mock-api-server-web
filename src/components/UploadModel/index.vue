<template>
  <el-upload
    class="upload-model"
    action
    :auto-upload="false"
    :accept="accept"
    :file-list="fileList"
    :limit="1"
    :on-change="onUpload"
  >
    <slot name="content"></slot>
  </el-upload>
</template>

<script>
export default {
  name: 'UploadModel',
  props: {
    // 可上传文件类型
    accept: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    onUpload(file) {
      if (!file) {
        return;
      }

      this.fileList = [];

      this.$emit('upload', file.raw);
    },
  },
};
</script>

<style scoped lang="less">
.upload-model {
  line-height: 1;
}
</style>
