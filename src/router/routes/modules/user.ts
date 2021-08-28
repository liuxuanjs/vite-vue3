import type { AppRouteRecordRaw } from '../../types';

// import USER from '/@/assets/svg/user-icon.svg';

export const UserRoute: AppRouteRecordRaw = {
  path: '/user',
  meta: {
    name: '用户管理',
    icon: 'user',
  },
  component: () => import('/@/views/user/List.vue'),
};
