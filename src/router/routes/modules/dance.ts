import type { AppRouteRecordRaw } from '../../types';

// import BlankLayout from '/@/layouts/blank/index.vue';

export const DanceListRoute: AppRouteRecordRaw = {
  path: '/dance/list',
  meta: { name: '舞曲管理', icon: 'dance' },
  component: () => import('/@/views/dance/List.vue'),
};

export const DanceStatisticsRoute: AppRouteRecordRaw = {
  path: '/dance/statistics',
  meta: { name: '舞曲详情', menu: false },
  component: () => import('/@/views/dance/statistics/index.vue'),
};

// export const DanceRoute: AppRouteRecordRaw = {
//   path: '/dance',
//   meta: { name: '舞曲管理', icon: 'dance' },
//   redirect: '/dance/list',
//   component: BlankLayout,
//   children: [DanceListRoute],
// };
