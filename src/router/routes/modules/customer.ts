import type { AppRouteRecordRaw } from '../../types';

// import BlankLayout from '/@/layouts/blank/index.vue';

export const CustomerListRoute: AppRouteRecordRaw = {
  path: '/customer/list',
  // meta: { name: '用户列表' },
  meta: { name: '用户管理', icon: 'customer' },
  component: () => import('/@/views/customer/list/index.vue'),
};

export const CustomerStatisticsRoute: AppRouteRecordRaw = {
  path: '/customer/statistics',
  meta: { name: '用户详情', menu: false },
  component: () => import('/@/views/customer/statistics/index.vue'),
};

export const CustomerVitalityRoute: AppRouteRecordRaw = {
  path: '/customer/vitality',
  meta: { name: '用户活跃度', menu: false },
  component: () => import('/@/views/customer/vitality/index.vue'),
};

// export const CustomerRoute: AppRouteRecordRaw = {
//   path: '/customer',
//   meta: { name: '用户管理', icon: 'customer' },
//   redirect: '/customer/list',
//   component: BlankLayout,
//   children: [UserListRoute, UserStatisticsRoute, UserVitalityRoute],
// };
