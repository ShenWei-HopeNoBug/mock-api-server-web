import dImage1 from 'apps/document/assets/image/download/d-1.webp';
import dImage2 from 'apps/document/assets/image/download/d-2.webp';
import dImage3 from 'apps/document/assets/image/download/d-3.webp';
import dImage4 from 'apps/document/assets/image/download/d-4.webp';
import dImage5 from 'apps/document/assets/image/download/d-5.webp';
import dImage6 from 'apps/document/assets/image/download/d-6.webp';
import dImage7 from 'apps/document/assets/image/download/d-7.webp';
import dImage8 from 'apps/document/assets/image/download/d-8.webp';
import dImage9 from 'apps/document/assets/image/download/d-9.webp';

// 选择工作目录渲染配置
const renderList = [
  [
    {
      compName: 'Title',
      compData: {
        content: '静态资源',
      },
    },
  ],
  [
    {
      compName: 'Title',
      compData: {
        type: 'h3',
        content: '下载静态资源',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '抓包得到的接口数据中，可能存在静态资源链接，在 mock 接口时可能需要下载到本地。点击菜单【编辑】下拉框的【编辑下载配置】，' +
          '可配置解析的静态资源链接文件类型。配置完成后，点击主界面的下载静态资源，就会下载到工作目录的 /static 文件夹内，启动服务时会将' +
          '/static 文件夹作为服务的静态资源目录使用。',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '下载界面有个【下载静态资源自动压缩图片】的选项，勾选后下载 .jpg 和 .png 的图片会自动进行图片压缩，以减小静态资源文件的大小。' +
          '如果刚需原图的，那就别勾选这个，注意下载过的同名图片是不会重新下载的，如果一开始下的压缩图片后面又想要原图了，进到工作目录的 /static 文件夹' +
          '把对应图片删掉重新下载即可。',
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: dImage1,
        style: { width: '600px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: dImage2,
        style: { width: '1000px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: dImage3,
        style: { width: '1000px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: dImage4,
        style: { width: '1000px' },
      },
    },
  ],
  [
    {
      compName: 'Title',
      compData: {
        type: 'h3',
        content: '导出静态资源',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '每次点击主界面【下载静态资源】按钮，如果有静态资源下载过，都会在工作目录的 /download 目录下创建下载日志文件，用于标记' +
          '每次下载的静态资源信息。点击【文件】菜单下拉框【导出静态资源】选项，进到导出界面点击【添加】按钮可选择下载日志，再点击' +
          '【导出】按钮就可以把选中下载日志文件中下过的图片都导出到一个文件夹里面。由于抓包数据可能是分多次抓取的，前后时间间隔较长，' +
          '每次都全量下载后拷贝整个工作目录文件到别处体积会比较大，使用静态资源导出就可以较精确地拿到每次抓包的静态资源，静态资源只需' +
          '将本次导出的文件拷贝到目标工作目录的 /static 文件夹即可。',
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: dImage5,
        style: { width: '600px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: dImage6,
        style: { width: '800px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: dImage7,
        style: { width: '800px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: dImage8,
        style: { width: '800px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: dImage9,
        style: { width: '800px' },
      },
    },
  ],
];

export { renderList };
