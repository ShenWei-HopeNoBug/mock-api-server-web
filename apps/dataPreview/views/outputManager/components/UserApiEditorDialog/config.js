import { cloneDeep } from 'lodash';
import { isJsonString } from 'src/assets/js/utils';

const userApiEditFormColumns = [
  {
    required: true,
    label: 'Url',
    key: 'url',
    inputType: 'textAreaInput',
  },
  {
    required: true,
    label: 'Method',
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
    slot: true,
    required: true,
    label: 'Params',
    key: 'params',
    inputType: '#input#',
    codeEditorProps: { height: '300px', readonly: true },
  },
  {
    slot: true,
    required: true,
    label: 'Response',
    key: 'response',
    inputType: '#input#',
    codeEditorProps: { height: '600px', readonly: true },
  },
];

const formConfig = {
  reprocessFormData: (formData = {}) => {
    const formCp = cloneDeep(formData);
    const submitForm = { type: 'USER' };
    const keyList = userApiEditFormColumns.map(item => item.key);
    keyList.forEach(key => {
      const value = formCp[key];
      if (key === 'params' || key === 'response') {
        submitForm[key] = isJsonString(value) ? JSON.stringify(JSON.parse(value)) : '{}';
        return;
      }

      submitForm[key] = value;
    });

    // get 请求把参数展开到链接上
    if (submitForm['method'] === 'GET') {
      const url = submitForm['url'];
      const pureUrl = url.split('?')[0];
      const params = JSON.parse(submitForm['params']);
      let query = '';
      Object.keys(params).forEach((key, i) => {
        const value = String(params[key]);
        if (i === 0) {
          query += `?${key}=${value}`;
          return;
        }

        query += `&${key}=${value}`;
      });

      submitForm['url'] = pureUrl + query;
    }

    return submitForm;
  },
};

export { userApiEditFormColumns, formConfig };
