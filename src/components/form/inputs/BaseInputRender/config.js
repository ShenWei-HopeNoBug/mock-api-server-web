// 获取默认绑定标签属性map表
const getDefaultAttrsMap = () => {
  const inputPlaceholder = '请输入';
  const selectPlaceholder = '请选择';

  return {
    // 普通输入框
    textInput: {
      placeholder: inputPlaceholder,
      clearable: true,
    },
    // 文本域输入框
    textAreaInput: {
      placeholder: inputPlaceholder,
      type: 'textarea',
      rows: 3,
    },
    // 日期选择框
    dateSelect: {
      placeholder: selectPlaceholder,
      type: 'date',
    },
    // 日期范围选择框
    dateRangeSelect: {
      'start-placeholder': '开始日期',
      'range-separator': '至',
      'end-placeholder': '结束日期',
      'type': 'daterange',
    },
    // 日期时间选择框
    dateTimeSelect: {
      placeholder: selectPlaceholder,
      type: 'datetime',
    },
    // 日期时间范围选择框
    dateTimeRangeSelect: {
      'start-placeholder': '开始时间',
      'range-separator': '至',
      'end-placeholder': '结束时间',
      'type': 'datetimerange',
    },
    // 普通选择框
    selectInput: {
      placeholder: selectPlaceholder,
      clearable: true,
      filterable: true,
    },
    // 数字输入框
    numberInput: {},
    // 时间选择框
    timeSelect: {
      placeholder: selectPlaceholder,
    },
    // 时间范围选择框
    timeRangeSelect: {
      'is-range': true,
      'start-placeholder': '开始时间',
      'range-separator': '至',
      'end-placeholder': '结束时间',
    }
  };
};


// 输入框默认初始化值map表
const inputDefaultValueMap = {
  sliderInput: 0,
  textInput: '',
  textAreaInput: '',
  checkboxInput: false,
};

// 日期类型输入框集合
const dateInputTypeSet = new Set([
  'dateSelect',
  'dateRangeSelect',
  'dateTimeSelect',
  'dateTimeRangeSelect',
]);

// 时间类型输入框集合
const timeInputTypeSet = new Set([
  'timeSelect',
  'timeRangeSelect',
]);

// 文本类型输入框集合
const textInputTypeSet = new Set([
  'textInput',
  'textAreaInput',
]);

export {
  getDefaultAttrsMap,
  inputDefaultValueMap,
  dateInputTypeSet,
  timeInputTypeSet,
  textInputTypeSet,
};
