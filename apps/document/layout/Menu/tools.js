import { cloneDeep } from 'lodash';
import { generateUUID, isArrayValid } from 'src/assets/js/utils';

// 生成菜单配置
export const generateMenus = (menus = []) =>
  menus.map(item => {
    if (isArrayValid(item.children)) {
      return {
        key: generateUUID(),
        ...item,
        children: generateMenus(item.children),
      };
    } else {
      return {
        key: generateUUID(),
        ...item,
      };
    }
  });

// 获取默认激活的菜单
export const getDefaultActiveMenu = (menus = []) => {
  const first = menus[0];
  if (!first) {
    return null;
  }

  if (isArrayValid(first.children)) {
    return getDefaultActiveMenu(first.children);
  }

  return first;
};

// 查找菜单配置(没找到返回 null)
export const searchMenuOptions = (key = '', menus = []) => {
  if (!key || !isArrayValid(menus)) {
    return null;
  }

  let target = null;
  for (let i = 0; i < menus.length; i++) {
    const option = menus[i];
    if (isArrayValid(option.children)) {
      target = searchMenuOptions(key, option.children);
    } else if (option.key === key) {
      target = cloneDeep(option);
    } else {
      // 不处理
    }

    if (target) {
      break;
    }
  }

  return target;
};
