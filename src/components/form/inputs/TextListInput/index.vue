<template>
  <div class="text-list-input">
    <MultipleEditModule :columns="list" @add="onAdd" @delete="onDelete">
      <template #row="scope">
        <el-input v-model="list[scope.index]" placeholder="请输入" clearable @change="onChange" />
      </template>
    </MultipleEditModule>
  </div>
</template>

<script>
import MultipleEditModule from 'src/components/MultipleEditModule/index.vue';

export default {
  name: 'TextListInput',
  components: {
    MultipleEditModule,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Array,
    },
    limit: {
      type: Number,
      default: 9999,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  watch: {
    value: {
      handler(arr) {
        if (!Array.isArray(arr)) {
          this.list = [];
          this.onChange();
          return;
        }

        this.list = arr;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    onChange() {
      this.$emit('change', this.list);
    },
    onAdd() {
      this.list?.push?.('');
      this.onChange();
    },
    onDelete(index) {
      this.list?.splice?.(index, 1);
      this.onChange();
    },
  },
};
</script>

<style scoped lang="less">
.text-list-input {
  width: 100%;
  overflow: hidden;
}
</style>
