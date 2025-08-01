const initSearchForm = {
  type: 'USER',
};

const searchFormColumns = [
  {
    label: '数据来源',
    key: 'type',
    inputType: 'selectInput',
    valueEnum: [
      {
        text: 'MITMPROXY',
        value: 'MITMPROXY',
      },
      {
        text: 'USER',
        value: 'USER',
      },
    ],
  },
  {
    label: '请求Url',
    key: 'url',
    inputType: 'textInput',
  },
  {
    label: '请求类型',
    key: 'method',
    inputType: 'selectInput',
    valueEnum: [
      {
        label: 'GET',
        value: 'GET',
      },
      {
        label: 'POST',
        value: 'POST',
      },
    ],
  },
  {
    label: '请求参数',
    key: 'params',
    inputType: 'textInput',
  },
  {
    label: '响应数据',
    key: 'response',
    inputType: 'textInput',
  },
];

const typeFilters = [
  {
    text: 'MITMPROXY',
    value: 'MITMPROXY',
  },
  {
    text: 'USER',
    value: 'USER',
  },
];

const methodFilters = [
  {
    text: 'GET',
    value: 'GET',
  },
  {
    text: 'POST',
    value: 'POST',
  },
];

const filterMethod = (value, row, column) => {
  const property = column['property'];
  if (typeof row[property] !== 'string') {
    return false;
  }

  const regex = new RegExp(`${value}`, 'i');
  return regex.test(row[property]);
};

const tableColumns = [
  {
    label: '数据来源',
    key: 'type',
    props: {
      width: 120,
    },
  },
  {
    label: '请求Url',
    key: 'url',
  },
  {
    label: '请求类型',
    key: 'method',
    props: {
      width: 100,
    },
  },
  {
    label: '请求参数',
    key: 'params',
  },
];

export { initSearchForm, searchFormColumns, tableColumns, filterMethod };
