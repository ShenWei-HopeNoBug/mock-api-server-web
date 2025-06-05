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
        key: '/basic-usage',
        title: '基本使用',
        path: '/basic-usage',
      },
    ],
  },
]);

const defaultActiveMenuOption = getDefaultActiveMenu(menuList);

export { menuList, defaultActiveMenuOption };
