function convert(routes, parentNode = null) {
  const currentMenus = [];
  const currentRoutes = [];

  if (!routes || !routes.length) {
    return [currentMenus, currentRoutes];
  }

  routes.forEach((route) => {
    const { path, meta = {}, children, ...restProps } = route;
    const { name, menu, authority } = meta;
    const currentRoute = { path, meta, children: [], ...restProps };
    const currentMenu = { name, path, authority };
    const [currentSubMenus, currentSubRoutes] = convert(children, currentRoute);

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

  return [currentMenus, currentRoutes];
}

export default convert;
