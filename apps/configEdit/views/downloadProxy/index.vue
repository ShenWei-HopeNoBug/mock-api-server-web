<template>
  <div>
    <BaseForm
      ref="baseForm"
      :columns="proxyFormColumns"
      :init-form-data="initFormData"
      @onSubmit="onSubmit"
    >
      <template #inputSlot="scope">
        <TextListInput
          v-if="scope.inputKey === 'proxy'"
          v-model="scope.form[scope.inputKey]"
        />
      </template>
    </BaseForm>
    <el-button @click="triggerSubmit">确定</el-button>
  </div>
</template>

<script>
import BaseForm from 'src/components/form/BaseForm/index.vue';
import TextListInput from 'src/components/form/inputs/TextListInput/index.vue';

const proxyFormColumns = [
  {
    slot: true,
    inputType: '#input#',
    label: 'proxy',
    key: 'proxy',
  },
];

export default {
  name: 'downloadProxy',
  components: {
    BaseForm,
    TextListInput,
  },
  data() {
    return {
      proxyFormColumns,
      initFormData: {
        // proxy: [],
      },
    };
  },
  methods: {
    triggerSubmit() {
      this.$refs.baseForm?.onSubmit?.();
    },
    onSubmit(form = {}) {
      console.log(form);
    },
  },
};
</script>

<style scoped lang="less"></style>
