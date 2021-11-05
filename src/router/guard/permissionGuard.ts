import type { Router } from 'vue-router';

import { store } from '/@/store';
import { routes } from '../routes';

// 判断路由是否存在
function checkExist(url, children) {
  if (children && children.length) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      if (child.path === url) {
        return true;
      }

      if (child.children && children.length) {
        if (checkExist(url, child.children)) {
          return true;
        }
      }
    }
  }

  return false;
}

// 判断是否有访问权限
function checkAuthority(authority) {
  if (!authority) {
    return true;
  }

  // @ts-ignore
  const { authorities } = store.state;

  if (!authorities) {
    return true;
  }

  return authorities.indexOf(authority) > -1;
}

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    const {
      path,
      meta: { authority },
    } = to;
    if (path === '/error/404' || path === '/error/403' || path === '/login') {
      next();
    } else {
      const isExist = checkExist(path, routes);
      const hasAuthority = checkAuthority(authority);

      if (!isExist) {
        next('/error/404');
      } else if (!hasAuthority) {
        next('/error/403');
      } else {
        next();
      }
    }
  });
}
