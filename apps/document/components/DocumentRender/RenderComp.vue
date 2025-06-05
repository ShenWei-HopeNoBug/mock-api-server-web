<template>
  <div v-if="visible" class="render-comp">
    <component :is="compName" :compData="compData" />
  </div>
</template>

<script>
import registeredComps from './render/registeredComps';
import { isObject } from 'lodash';

export default {
  name: 'RenderComp',
  components: { ...registeredComps },
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    compName() {
      return this.options?.compName || '';
    },
    compData() {
      const compData = this.options?.compData;
      return isObject(compData) ? compData : {};
    },
    visible() {
      return Boolean(registeredComps[this.compName]);
    },
  },
};
</script>

<style scoped lang="less">
.render-comp {
  width: 100%;
}
</style>
