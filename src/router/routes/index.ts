import { basicRoutes } from './basic';
import { convert } from '/@/utils/convert';

const [menus, routes] = convert(basicRoutes, null);

export { menus, routes };
