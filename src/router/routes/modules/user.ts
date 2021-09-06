import type { AppRouteRecordRaw } from '../../types';

import BlankLayout from '/@/layouts/blank/index.vue';

export const UserListRoute: AppRouteRecordRaw = {
  path: '/user/list',
  meta: { name: '用户列表' },
  component: () => import('/@/views/user/List.vue'),
};

export const UserStatisticsRoute: AppRouteRecordRaw = {
  path: '/user/statistics',
  meta: { name: '用户统计', menu: false },
  component: () => import('/@/views/user/Statistics.vue'),
};

export const UserVitalityRoute: AppRouteRecordRaw = {
  path: '/user/vitality',
  meta: { name: '用户活跃度', menu: false },
  component: () => import('/@/views/user/Vitality.vue'),
};

export const UserRoute: AppRouteRecordRaw = {
  path: '/user',
  meta: { name: '用户管理', icon: 'user' },
  redirect: '/user/list',
  component: BlankLayout,
  children: [UserListRoute, UserStatisticsRoute, UserVitalityRoute],
};
