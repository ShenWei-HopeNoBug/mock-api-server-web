<template>
  <div class="proxy-list-input">
    <MultipleEditModule
      :columns="columns"
      :row-border="true"
      :index-format="indexFormat"
      @add="onAdd"
      @delete="onDelete"
    >
      <template #row="scope">
        <ProxyConfigInput v-model="list[scope.index]" @change="onChange" />
      </template>
    </MultipleEditModule>
  </div>
</template>

<script>
import MultipleEditModule from 'src/components/MultipleEditModule/index.vue';
import ProxyConfigInput from 'apps/configEdit/views/downloadProxy/components/ProxyConfigInput/index.vue';
import { defaultDownloadProxy } from 'apps/configEdit/views/downloadProxy/config';
import { isDownloadProxyValid } from 'apps/configEdit/views/downloadProxy/tools';
import { cloneDeep } from 'lodash';

export default {
  name: 'ProxyListInput',
  components: {
    MultipleEditModule,
    ProxyConfigInput,
  },
  model: {
    prop: 'proxy',
    event: 'change',
  },
  props: {
    proxy: {
      type: Array,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  computed: {
    columns() {
      return this.list.map(item => {
        const rowStyle = isDownloadProxyValid(item) ? {} : { borderColor: 'rgb(254, 108, 111)' };
        return { rowStyle };
      });
    },
  },
  watch: {
    proxy: {
      handler(list) {
        if (Array.isArray(list)) {
          this.list = list;
        } else {
          this.onChange();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    indexFormat(index) {
      return `#${index}`;
    },
    onChange() {
      this.$emit('change', this.list);
    },
    onAdd() {
      this.list?.push?.(cloneDeep(defaultDownloadProxy));
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
.proxy-list-input {
  width: 100%;
}
</style>
