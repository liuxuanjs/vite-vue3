import type { AppRouteRecordRaw } from '../../types';

export const MessageRoute: AppRouteRecordRaw = {
  path: '/message',
  meta: {
    name: '消息管理',
    icon: 'message',
  },
  component: () => import('/@/views/message/List.vue'),
};
