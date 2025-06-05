import workDirFileCheckImage from 'apps/document/assets/image/baseUsage/work-dir-file-check.png';
import selectWorkDirImage from 'apps/document/assets/image/baseUsage/select-work-dir.png';

// 选择工作目录渲染配置
const renderList = [
  [
    {
      compName: 'Title',
      compData: {
        content: '选择工作目录',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '应用第一次打开时，会创建应用必要的目录文件，并且每次打开后，' +
          '都会进行应用当前的工作目录文件完整性检查，如果检查未通过会弹出提示弹窗，点击确定后会自动创建缺失的目录文件。' +
          '应用默认的工作目录为应用根目录的 /server 文件夹，第一次打开应用时会提示创建，点确定即可。',
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: workDirFileCheckImage,
        style: { width: '800px' },
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '如果要切换工作目录，可在菜单的【文件】下拉框点击【切换工作目录】进行切换，切换时会校验待切换目录内的文件完整性，' +
          '出现文件完整性提示一般点确定即可。要创建新的工作目录，可随便建一个文件夹，点击【切换工作目录】切换到该文件夹进行创建。',
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: selectWorkDirImage,
        style: { width: '800px' },
      },
    },
  ],
];

export { renderList };
