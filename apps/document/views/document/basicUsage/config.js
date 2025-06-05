import workDirFileCheckImage from 'apps/document/assets/image/baseUsage/work-dir-file-check.png';
import selectWorkDirImage from 'apps/document/assets/image/baseUsage/select-work-dir.png';
import editMitmproxyMenuImage from 'apps/document/assets/image/baseUsage/edit-mitmproxy-menu.png';
import editMitmproxyDialogImage from 'apps/document/assets/image/baseUsage/edit-mitmproxy-dialog.png';

// 选择工作目录
const selectWorkDir = [
  {
    compName: 'Title',
    compData: {
      type: 'h3',
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
];
// 抓取数据
const requestCatch = [
  {
    compName: 'Title',
    compData: {
      type: 'h3',
      content: '抓取数据',
    },
  },
  {
    compName: 'RichText',
    compData: {
      content: '应用使用了 mitmproxy 第三方抓包库来抓取数据，抓包前必须先安装 mitmproxy-ca 证书。',
    },
  },
  {
    compName: 'RichText',
    compData: {
      content: '需要进行抓包操作时，建议打开带黑窗的.exe应用（应用根目录文件名中包含.win 的 .exe应用），便于查看抓包过程中的日志信息。' +
        '主界面的【抓包配置】可以设置抓包服务的端口号以及是否以追加模式抓取数据，不勾选【以追加模式抓取】选项时，' +
        '关闭抓包服务结束抓包后，历史的抓包数据会清空，被新的抓包数据完全替换。',
    },
  },
  {
    compName: 'RichText',
    compData: {
      content: '进行详细的抓包配置，可在菜单【编辑】下拉框点击【编辑抓包配置】进行配置。' +
        '在抓取常规 http 请求时（非文件请求且请求的 Content-Type 是 application/json），' +
        'http 请求链接文本包含了【常规http请求过滤条件】内配置的多个文本之一，该请求就会抓取并保存。' +
        '在抓取静态资源 http 请求时，请求链接文本包含了【静态资源请求过滤条件】内配置的多个文本之一，该请求就会抓取并保存。' +
        '在抓取过程中，会根据请求的链接文本、请求类型(GET 或 POST)和请求参数数据生成该请求的标识，相同标识的请求，' +
        '后抓取的数据会覆盖已抓取的数据。',
    },
  },
  {
    compName: 'InsertImage',
    compData: {
      src: editMitmproxyMenuImage,
      style: { width: '800px' },
    },
  },
  {
    compName: 'InsertImage',
    compData: {
      src: editMitmproxyDialogImage,
      style: { width: '800px' },
    },
  },
  {
    compName: 'RichText',
    compData: {
      content: '停止抓包服务后，会将抓取到的常规 http 请求数据保存到工作目录的 /data/output.json 文件中，' +
        '静态资源 http 请求数据保存到工作目录的 /data/static.json 文件中。注意抓包数据在抓取过程中不会保存到本地，' +
        '只有停止抓包服务后，才会进行保存。',
    },
  },
  {
    compName: 'RichText',
    compData: {
      content:
        '如果需要完全清空抓包数据，可以不勾选【以追加模式抓取】选项启动抓包服务，再马上关闭抓包服务来清空抓包数据，' +
        '或者直接删除工作目录里面的 /data/output.json 和 /data/static.json 数据文件也可以达到同样的目的。',
    },
  },
];

const renderList = [
  [
    {
      compName: 'Title',
      compData: {
        content: '基本使用',
      },
    },
  ],
  selectWorkDir,
  requestCatch,
];

export { renderList };
