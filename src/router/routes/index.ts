import { basicRoutes } from './basic';
import { menuAndRouteHelper } from './helper/menuAndRouteHelper';

const [menus, routes, routeMap] = menuAndRouteHelper(basicRoutes, null);
console.log(menus, routes, routeMap);

export { menus, routes, routeMap };
