import type { AppRouteRecordRaw } from '../../types';

// import ADMIN from '/@/assets/svg/admin-icon.svg';

export const AdminRoute: AppRouteRecordRaw = {
  path: '/admin',
  meta: {
    name: '管理员',
    icon: 'admin',
  },
  component: () => import('/@/views/admin/List.vue'),
};
