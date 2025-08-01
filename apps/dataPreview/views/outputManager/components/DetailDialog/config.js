const columns = [
  {
    label: 'ID',
    key: 'id',
    type: 'text',
  },
  {
    label: 'Url',
    key: 'url',
    type: 'text',
  },
  {
    label: 'Method',
    key: 'method',
    type: 'text',
  },
  {
    label: 'Params',
    key: 'params',
    type: 'jsonString',
    codeEditorProps: { height: '300px', readonly: true },
  },
  {
    label: 'Response',
    key: 'response',
    type: 'jsonString',
    codeEditorProps: { height: '550px', readonly: true },
  },
];

export { columns };
