import type { AppRouteRecordRaw } from '../../types';

// import BlankLayout from '/@/layouts/blank/index.vue';

export const UserListRoute: AppRouteRecordRaw = {
  path: '/user/list',
  // meta: { name: '用户列表' },
  meta: { name: '用户管理', icon: 'user' },
  component: () => import('/@/views/user/List.vue'),
};

export const UserStatisticsRoute: AppRouteRecordRaw = {
  path: '/user/statistics',
  meta: { name: '用户详情', menu: false },
  component: () => import('/@/views/user/statistics/index.vue'),
};

export const UserVitalityRoute: AppRouteRecordRaw = {
  path: '/user/vitality',
  meta: { name: '用户活跃度', menu: false },
  component: () => import('/@/views/user/vitality/index.vue'),
};

// export const UserRoute: AppRouteRecordRaw = {
//   path: '/user',
//   meta: { name: '用户管理', icon: 'user' },
//   redirect: '/user/list',
//   component: BlankLayout,
//   children: [UserListRoute, UserStatisticsRoute, UserVitalityRoute],
// };
