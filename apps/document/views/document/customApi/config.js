import caImage1 from 'apps/document/assets/image/customApi/ca-1.webp';
import caImage2 from 'apps/document/assets/image/customApi/ca-2.webp';
import caImage3 from 'apps/document/assets/image/customApi/ca-3.webp';
import caImage4 from 'apps/document/assets/image/customApi/ca-4.webp';
import caImage5 from 'apps/document/assets/image/customApi/ca-5.webp';
import caImage6 from 'apps/document/assets/image/customApi/ca-6.webp';
import caImage7 from 'apps/document/assets/image/customApi/ca-7.webp';
import caImage8 from 'apps/document/assets/image/customApi/ca-8.webp';
import caImage9 from 'apps/document/assets/image/customApi/ca-9.webp';
import caImage10 from 'apps/document/assets/image/customApi/ca-10.webp';


// 选择工作目录渲染配置
const renderList = [
  [
    {
      compName: 'Title',
      compData: {
        content: '手动Mock接口',
      },
    },
    {
      compName: 'RichText',
      compData: {
        content: '有这么一种情况，接口是新开发的，线上没这接口，这时只能手动Mock数据了。点击【文件】菜单的【查看抓包数据】，' +
          '进到抓包数据的 html 表格页，点击【用户接口编辑器】进入编辑界面，填好接口参数后在右侧点击【转换】，再点击【复制】，' +
          '再到应用主界面点击【文件】菜单【打开工作目录】，进到工作目录找到 /data/user_api.json 文件，打开这个文件把刚刚复制' +
          '的接口数据粘贴进去，最后重新启动服务，手动Mock的接口数据就生效了。',
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: caImage1,
        style: { width: '1000px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: caImage2,
        style: { width: '1000px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: caImage3,
        style: { width: '1000px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: caImage4,
        style: { width: '1000px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: caImage5,
        style: { width: '1000px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: caImage6,
        style: { width: '800px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: caImage7,
        style: { width: '800px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: caImage8,
        style: { width: '800px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: caImage9,
        style: { width: '800px' },
      },
    },
    {
      compName: 'InsertImage',
      compData: {
        src: caImage10,
        style: { width: '800px' },
      },
    },
  ],
];

export { renderList };
