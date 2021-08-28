import type { AppRouteRecordRaw } from '../../types';

// import MESSAGE from '/@/assets/svg/message-icon.svg';

export const MessageRoute: AppRouteRecordRaw = {
  path: '/message',
  meta: {
    name: '消息管理',
    icon: 'message',
  },
  component: () => import('/@/views/message/List.vue'),
};
