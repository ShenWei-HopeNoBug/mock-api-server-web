<template>
  <div class="textListInput">
    <el-button v-if="showFirstAddButton" class="addButton" icon="el-icon-plus" @click="onAdd" />
    <div class="inputRow" v-for="(_, i) in list" :key="`inputRow_${i}`">
      <div class="index">{{ i + 1 }}</div>
      <span class="rowContent">
      <el-input v-model="list[i]" placeholder="请输入" clearable @change="onChange" />
    </span>
      <div class="buttonGroup">
        <div>
          <el-button
            v-if="checkAddBtnVisible(i)"
            class="addButton"
            icon="el-icon-plus"
            @click="onAdd"
          />
        </div>
        <el-button class="deleteButton" icon="el-icon-minus" @click="onDelete(i)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextListInput',
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
  computed: {
    showFirstAddButton() {
      return Boolean(!Array.isArray(this.list) || !this.list.length);
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
    checkAddBtnVisible(index) {
      const showIndex = index + 1;
      return showIndex === this.list.length && showIndex < this.limit;
    },
  },
};
</script>

<style scoped lang="less">
.textListInput {
  width: 100%;
  overflow: hidden;
}

.inputRow {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;

  .index {
    width: 60px;
    text-align: center;
  }

  .rowContent {
    width: 100%;
    flex: 1;
    display: flex;
  }
}

.buttonGroup {
  width: 120px;
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
}

.addButton {
  color: #7ccb6f;
  font-weight: bolder;
}

.deleteButton {
  color: red;
  font-weight: bolder;
}
</style>
