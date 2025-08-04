<template>
  <div class="proxy-config-input">
    <div class="inline">
      <div class="form-item">
        <div class="label">Protocol</div>
        <el-select class="input" v-model="formData.protocol" clearable @change="onChange">
          <el-option
            v-for="(o,j) in protocolValueEnum"
            :key="`option_${j}`"
            :label="o.label"
            :value="o.value"
          />
        </el-select>
      </div>
      <div class="form-item">
        <div class="label">Proxy</div>
        <el-input class="input" v-model="formData.proxy" clearable @change="onChange" />
      </div>
    </div>
    <div class="form-item">
      <div class="label">Includes</div>
      <TextListInput class="input" v-model="formData.includes" @change="onChange" />
    </div>
  </div>
</template>

<script>
import TextListInput from 'src/components/form/inputs/TextListInput/index.vue';
import { protocolValueEnum, defaultDownloadProxy } from 'apps/configEdit/views/downloadProxy/config';
import { cloneDeep, isObject } from 'lodash';


export default {
  name: 'ProxyConfigInput',
  components: {
    TextListInput,
  },
  model: {
    prop: 'form',
    event: 'change',
  },
  props: {
    form: {
      type: Object,
    },
  },
  data() {
    return {
      protocolValueEnum,
      formData: cloneDeep(defaultDownloadProxy),
    };
  },
  watch: {
    form: {
      handler(obj) {
        if (isObject(obj)) {
          this.formData = obj;
        } else {
          this.onChange();
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    onChange() {
      this.$emit('change', this.formData);
    },
  },
};
</script>

<style scoped lang="less">
.proxy-config-input {
  width: 100%;

  .inline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    margin-bottom: 14px;

    .inline-item {
      width: 50%;
    }
  }

  .form-item {
    width: 100%;
    display: flex;

    .label {
      width: 80px;
      display: flex;
      align-items: center;

      &:after {
        content: ':';
        padding: 0 4px 0 2px;
      }
    }

    .input {
      width: 100%;
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
