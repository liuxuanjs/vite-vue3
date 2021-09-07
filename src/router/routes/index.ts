import { basicRoutes } from './basic';
import { menuAndRouteHelper } from './helper/menuAndRouteHelper';

const [menus, routes, routeMap] = menuAndRouteHelper(basicRoutes, null);

export { menus, routes, routeMap };
