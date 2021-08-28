import { basicRoutes } from './basic';
import { menuAndRouteHelper } from './helper/menuAndRouteHelper';

const [menus, routes] = menuAndRouteHelper(basicRoutes, null);
console.log(menus, routes);

export { menus, routes };
