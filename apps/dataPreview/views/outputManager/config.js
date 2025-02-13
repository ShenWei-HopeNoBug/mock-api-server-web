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
    label: '请求Url',
    key: 'Url',
  },
  {
    label: '请求类型',
    key: 'Method',
    props: {
      width: 100,
      filters: methodFilters,
      'filter-method': filterMethod,
    },
  },
  {
    label: '请求参数',
    key: 'Params',
  },
];

export { tableColumns, filterMethod };
