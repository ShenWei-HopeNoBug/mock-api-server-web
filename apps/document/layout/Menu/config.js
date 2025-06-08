import { generateMenus, getDefaultActiveMenu } from './tools';

const menuList = generateMenus([
  {
    key: '/',
    title: '简介',
    path: '/',
  },
  {
    title: '文档',
    children: [
      {
        key: '/select-work-dir',
        title: '选择工作目录',
        path: '/select-work-dir',
      },
      {
        key: '/request-catch',
        title: '抓取数据',
        path: '/request-catch',
      },
      {
        key: '/download',
        title: '静态资源',
        path: '/download',
      },
      {
        key: '/server',
        title: 'Mock服务',
        path: '/server',
      },
      {
        key: '/customApi',
        title: '手动Mock接口',
        path: '/customApi',
      },
    ],
  },
]);

const defaultActiveMenuOption = getDefaultActiveMenu(menuList);

export { menuList, defaultActiveMenuOption };
