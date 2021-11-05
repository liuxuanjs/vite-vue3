import type { Router, RouteLocationNormalized } from 'vue-router';

import { Modal, notification } from 'ant-design-vue';
import nProgress from 'nprogress';

import { warn } from '/@/utils/log';
// import { createPermissionGuard } from './permissionGuard';

// 不要更换顺序
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createScrollGuard(router);
  createMessageGuard(router);
  createProgressGuard(router);
  // createPermissionGuard(router);
}

/**
 * 标记已经切换的路由
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>();

  router.beforeEach(async (to) => {
    to.meta.loaded = !!loadedPageMap.get(to.path);

    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}

/**
 * 切换路由时，回到顶部
 * @param router
 */
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href);
  };

  const body = document.body;

  router.afterEach(async (to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0);
    return true;
  });
}

/**
 * 切换路由时，关闭 Modal 和 notification 实例
 * @param router
 */
export function createMessageGuard(router: Router) {
  router.beforeEach(async () => {
    try {
      Modal.destroyAll();
      notification.destroy();
    } catch (error) {
      warn('message guard error:' + error);
    }
    return true;
  });
}

/**
 * 切换路由时，进度条
 * @param router
 */
export function createProgressGuard(router: Router) {
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true;
    }
    nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    nProgress.done();
    return true;
  });
}
