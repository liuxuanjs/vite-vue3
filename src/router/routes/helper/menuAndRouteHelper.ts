import type { AppRouteRecordRaw, Menu, RouteMap } from '../../types';

const routeMap: RouteMap = new Map();

function menuAndRouteHelper(
  routes?: AppRouteRecordRaw[],
  parentNode?: AppRouteRecordRaw,
): [Menu[], AppRouteRecordRaw[], RouteMap?] {
  const currentMenus: Menu[] = [];
  const currentRoutes: AppRouteRecordRaw[] = [];

  if (!routes || !routes.length) {
    return [currentMenus, currentRoutes];
  }

  routes.forEach((route: AppRouteRecordRaw) => {
    const { path, meta = {}, children = [], ...restProps } = route;
    const { name, menu, authority, icon } = meta;
    const currentRoute: AppRouteRecordRaw = { path, meta, children, ...restProps };
    const currentMenu: Menu = { path, name, authority, icon };

    if (menu !== false && !routeMap.get(path)) {
      routeMap.set(path, true);
    }

    const [currentSubMenus, currentSubRoutes] = menuAndRouteHelper(children, currentRoute);

    meta.parent = parentNode;
    currentRoute.children = currentSubRoutes;
    currentRoutes.push(currentRoute);

    if (menu !== false) {
      if (path === '/') {
        currentMenus.push(...currentSubMenus);
      } else {
        currentMenu.children = currentSubMenus;
        currentMenus.push(currentMenu);
      }
    }
  });

  return [currentMenus, currentRoutes, routeMap];
}

export { menuAndRouteHelper };
