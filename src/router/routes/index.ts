import { basicRoutes } from './basic';
import { menuAndRouteHelper } from './helper/menuAndRouteHelper';

const [menus, routes, routeMap] = menuAndRouteHelper(basicRoutes);

export { menus, routes, routeMap };
