import type { AppRouteRecordRaw } from '../../types';

// import HOME from '/@/assets/svg/home-icon.svg';

export const HomeRoute: AppRouteRecordRaw = {
  path: '/home',
  meta: {
    name: '首页',
    icon: 'home',
  },
  component: () => import('/@/views/home/Home.vue'),
};
