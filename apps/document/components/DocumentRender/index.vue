<template>
  <div class="document-render">
    <div
      v-if="checkArrayValid(renderList)"
      v-for="(item, i) in renderList"
      :key="`area_${i}`"
      class="render-area"
    >
      <div v-if="checkArrayValid(item)" v-for="(conf, j) in item" :key="`comp_${j}`">
        <slot v-if="conf?.slot && conf?.slotName" :name="conf?.slotName" :options="conf"></slot>
        <RenderComp v-else :options="conf" />
      </div>
    </div>
  </div>
</template>

<script>
import RenderComp from './RenderComp.vue';

export default {
  name: 'DocumentRender',
  components: { RenderComp },
  props: {
    renderList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    checkArrayValid(arr) {
      return Array.isArray(arr) && arr.length > 0;
    },
  },
};
</script>

<style scoped lang="less">
.document-render {
  width: 100%;

  .render-area {
    margin-bottom: 24px;
  }
}
</style>
