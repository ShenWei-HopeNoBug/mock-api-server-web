import { generateMenus, getDefaultActiveMenu } from './tools';

const menuList = generateMenus([
  {
    title: '简介',
    path: '/introduction'
  },
  {
    title: '文档',
    children: [
      {
        title: '基本使用',
        path: '/basic-usage'
      },
    ],
  },
]);

const defaultActiveMenuOption = getDefaultActiveMenu(menuList);

export { menuList, defaultActiveMenuOption };
