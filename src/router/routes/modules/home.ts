import type { AppRouteRecordRaw } from '../../types';

export const HomeRoute: AppRouteRecordRaw = {
  path: '/home',
  meta: { name: '首页', icon: 'home' },
  component: () => import('/@/views/home/Home.vue'),
};
