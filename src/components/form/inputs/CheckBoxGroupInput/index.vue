<template>
  <span>
    <el-checkbox-group class="input" v-model="checkList" @change="onChange">
      <el-checkbox
        v-for="(item, i) in valueEnum"
        :key="`checkbox_${i}`"
        :label="item.value"
      >
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>
  </span>
</template>

<script>
export default {
  name: 'CheckBoxGroupInput',
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    inputValue: {},
    options: {
      type: Object,
      default: () => ({}),
    },
    size: {
      type: String,
      default: 'small'
    },
  },
  data() {
    return {
      checkList: [],
    };
  },
  computed: {
    valueEnum() {
      const { valueEnum = [] } = this.options || {};
      return valueEnum;
    },
  },
  watch: {
    inputValue: {
      handler(list) {
        if (!Array.isArray(list)) {
          this.checkList = [];
          this.onChange();
          return;
        }

        this.checkList = list;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    onChange() {
      this.$emit('change', this.checkList);
    },
  },
};
</script>

<style scoped lang="less">
.input {
  width: 100%;
}
</style>
