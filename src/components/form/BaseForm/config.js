
const defaultAttrsMap = {
  formContainer: {
    'label-width': '100px',
    'label-position': 'left',
  },
  formItem: {},
  labelTips: {
    tooltipBindAttrs: { effect: 'dark' },
  },
};

const defaultConfig = {
  // 表单过滤值集合
  filterSet: new Set(),
};

// 获取输入校验提示信息map表
const getInputRuleMessageMap = () => {
  const inputMsg = '请输入';
  const selectMsg = '请选择';

  return {
    textInput: inputMsg,
    textAreaInput: inputMsg,
    dateSelect: selectMsg,
    dateRangeSelect: selectMsg,
    dateTimeSelect: selectMsg,
    dateTimeRangeSelect: selectMsg,
    selectInput: selectMsg,
    checkboxInput: selectMsg,
    checkBoxGroupInput: selectMsg,
    numberInput: inputMsg,
    timeSelect: selectMsg,
    '#select#': selectMsg,
    '#input#': inputMsg,
  };
};

const inputRuleTriggerMap = {
  /**
   * 为了防止刚进页面时，多选框初始化空数组触发表单校验，这里设置成 blur 触发表单校验
   * */
  checkBoxGroupInput: 'blur',
};

export {
  defaultAttrsMap,
  defaultConfig,
  getInputRuleMessageMap,
  inputRuleTriggerMap,
};
