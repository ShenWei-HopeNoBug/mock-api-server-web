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
      filters: typeFilters,
      'filter-method': filterMethod,
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
      filters: methodFilters,
      'filter-method': filterMethod,
    },
  },
  {
    label: '请求参数',
    key: 'params',
  },
];

export { tableColumns, filterMethod };
