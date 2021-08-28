import type { AppRouteRecordRaw } from '../../types';

// import DANCE from '/@/assets/svg/dance-icon.svg';

export const DanceRoute: AppRouteRecordRaw = {
  path: '/dance',
  meta: {
    name: '舞曲管理',
    icon: 'dance',
  },
  component: () => import('/@/views/dance/List.vue'),
};
