<template>
  <DocumentRender :renderList="renderList"></DocumentRender>
</template>

<script>
import DocumentRender from 'apps/document/components/DocumentRender/index.vue';
import { renderList } from './config';

export default {
  name: 'download',
  components: { DocumentRender },
  data() {
    return {
      renderList,
    };
  },
};
</script>

