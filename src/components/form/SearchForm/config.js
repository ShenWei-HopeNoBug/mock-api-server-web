const defaultAttrsMap = {
  submitButton: {
    type: 'primary',
  },
  // 更多按钮
  moreButton: {
    type: 'info',
  },
  // 重置按钮
  resetButton: {},
  // 查询按钮
  searchButton: {
    type: 'primary',
  },
  // 更多弹出框
  morePopover: {
    placement: 'bottom',
    trigger: 'click',
    width: 500,
  },
};

const defaultConfig = {
  showResetButton: true,
  showSearchButton: true,
  // 表单结果过滤值集合
  filterSet: new Set([null, undefined, '']),
};

export {
  defaultAttrsMap,
  defaultConfig,
};
