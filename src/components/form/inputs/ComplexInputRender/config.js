// 注册FormInputCore组件支持的的输入框类型
const inputCoreTypeSet = new Set([
  'textInput',
  'textAreaInput',
  'dateSelect',
  'dateRangeSelect',
  'dateTimeSelect',
  'dateTimeRangeSelect',
  'selectInput',
  'checkboxInput',
  'numberInput',
  'timeSelect',
  'timeRangeSelect',
  'sliderInput',
  'radioGroupInput',
]);

const defaultAttrsMap = {};

export {
  inputCoreTypeSet,
  defaultAttrsMap,
};
