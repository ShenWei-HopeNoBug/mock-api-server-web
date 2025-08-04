<template>
  <div class="multiple-edit-module">
    <el-button v-if="showFirstAddButton" class="add-btn" icon="el-icon-plus" @click="onAdd" />
    <div
      :class="{ 'input-row': true, 'row-border': rowBorder }"
      v-for="(item, i) in columns"
      :key="`inputRow_${i}`"
      :style="item?.rowStyle"
    >
      <div class="index">{{ indexFormat(i) }}</div>
      <div class="row-content">
        <slot name="row" :index="i" :options="item"></slot>
      </div>
      <div class="button-group">
        <div>
          <el-button
            v-if="checkAddBtnVisible(i)"
            class="add-btn"
            icon="el-icon-plus"
            @click="onAdd"
          />
        </div>
        <el-button class="delete-btn" icon="el-icon-minus" @click="onDelete(i)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultipleEditModule',
  props: {
    limit: {
      type: Number,
      default: 9999,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    rowBorder: {
      type: Boolean,
      default: false,
    },
    indexFormat: {
      type: Function,
      default: i => i + 1,
    },
  },
  computed: {
    showFirstAddButton() {
      return Boolean(!Array.isArray(this.columns) || !this.columns.length);
    },
  },
  methods: {
    onAdd() {
      this.$emit('add');
    },
    onDelete(index) {
      this.$emit('delete', index);
    },
    checkAddBtnVisible(index) {
      const showIndex = index + 1;
      return showIndex === this.columns.length && showIndex < this.limit;
    },
  },
};
</script>

<style scoped lang="less">
.multiple-edit-module {
  width: 100%;
}

.input-row {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 4px;

  .index {
    width: 60px;
    min-width: 40px;
    height: 100%;
    line-height: 40px;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-shrink: 0;
    font-weight: bold;
  }

  .row-content {
    width: 100%;
    flex: 1;
    display: flex;
  }
}

.row-border {
  border: 1px #ccc solid;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 12px 12px 12px 4px;
}

.button-group {
  width: 120px;
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
}

.add-btn {
  color: #7ccb6f;
  font-weight: bolder;
}

.delete-btn {
  color: red;
  font-weight: bolder;
  height: 40px;
}
</style>
