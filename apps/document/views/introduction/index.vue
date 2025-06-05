<template>
  <DocumentRender :renderList="renderList"></DocumentRender>
</template>

<script>
import DocumentRender from 'apps/document/components/DocumentRender/index.vue';
import { renderList } from './config';

export default {
  name: 'introduction',
  components: { DocumentRender },
  data() {
    return {
      renderList,
    };
  },
};
</script>

