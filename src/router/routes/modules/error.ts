import type { AppRouteRecordRaw } from '../../types';

import BlankLayout from '/@/layouts/blank/index.vue';

export const ErrorRoute: AppRouteRecordRaw = {
  path: '/error',
  redirect: '/error/404',
  meta: {
    name: '页面错误',
    menu: false,
  },
  component: BlankLayout,
  children: [
    {
      path: '/error/404',
      meta: {
        name: '页面未找到',
      },
      component: () => import('/@/views/error/404.vue'),
    },
    {
      path: '/error/403',
      meta: {
        name: '无访问权限',
      },
      component: () => import('/@/views/error/403.vue'),
    },
  ],
};
