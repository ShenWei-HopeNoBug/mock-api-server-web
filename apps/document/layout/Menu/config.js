import { generateMenus, getDefaultActiveMenu } from './tools';

const menuList = generateMenus([
  {
    key: '/introduction',
    title: '简介',
    path: '/introduction',
  },
  {
    title: '文档',
    children: [
      {
        key: '/basic-usage',
        title: '基本使用',
        path: '/basic-usage',
      },
    ],
  },
]);

const defaultActiveMenuOption = getDefaultActiveMenu(menuList);

export { menuList, defaultActiveMenuOption };
