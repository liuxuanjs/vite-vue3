import type { Router } from 'vue-router';
// import { useAppStoreWithOut } from '/@/store/modules/app';
// import { useUserStoreWithOut } from '/@/store/modules/user';
// import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
// import { AxiosCanceler } from '/@/utils/http/axios/axiosCancel';
import { Modal, notification } from 'ant-design-vue';
import { warn } from '/@/utils/log';
// import { unref } from 'vue';
// import { setRouteChange } from '/@/logics/mitt/routeChange';
import { createPermissionGuard } from './permissionGuard';
// import { createStateGuard } from './stateGuard';
import nProgress from 'nprogress';
// import projectSetting from '/@/settings/projectSetting';
// import { createParamMenuGuard } from './paramMenuGuard';

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  // createPageLoadingGuard(router);
  // createHttpGuard(router);
  // createScrollGuard(router);
  createMessageGuard(router);
  createProgressGuard(router);
  createPermissionGuard(router);
  // createParamMenuGuard(router); // must after createPermissionGuard (menu has been built.)
  // createStateGuard(router);
}

/**
 * Hooks for handling page state
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

// Used to handle page loading status
// function createPageLoadingGuard(router: Router) {
//   const userStore = useUserStoreWithOut();
//   const appStore = useAppStoreWithOut();
//   const { getOpenPageLoading } = useTransitionSetting();
//   router.beforeEach(async (to) => {
//     if (!userStore.getToken) {
//       return true;
//     }
//     if (to.meta.loaded) {
//       return true;
//     }

//     if (unref(getOpenPageLoading)) {
//       appStore.setPageLoadingAction(true);
//       return true;
//     }

//     return true;
//   });
//   router.afterEach(async () => {
//     if (unref(getOpenPageLoading)) {
//       // TODO Looking for a better way
//       // The timer simulates the loading time to prevent flashing too fast,
//       setTimeout(() => {
//         appStore.setPageLoading(false);
//       }, 220);
//     }
//     return true;
//   });
// }

/**
 * The interface used to close the current page to complete the request when the route is switched
 * @param router
 */
// function createHttpGuard(router: Router) {
//   const { removeAllHttpPending } = projectSetting;
//   let axiosCanceler: Nullable<AxiosCanceler>;
//   if (removeAllHttpPending) {
//     axiosCanceler = new AxiosCanceler();
//   }
//   router.beforeEach(async () => {
//     // Switching the route will delete the previous request
//     axiosCanceler?.removeAllPending();
//     return true;
//   });
// }

// Routing switch back to the top
// function createScrollGuard(router: Router) {
//   const isHash = (href: string) => {
//     return /^#/.test(href);
//   };

//   const body = document.body;

//   router.afterEach(async (to) => {
//     // scroll top
//     isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0);
//     return true;
//   });
// }

/**
 * 切换路由时，关闭消息实例
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
    // const { path, fullPath } = to;
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
