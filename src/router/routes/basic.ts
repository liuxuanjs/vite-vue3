import type { AppRouteRecordRaw } from '../types';

import BasicLayout from '/@/layouts/basic/index.vue';

import { HomeRoute } from './modules/home';
import { ErrorRoute } from './modules/error';
import { UserRoute } from './modules/user';
import { DanceRoute } from './modules/dance';
import { MessageRoute } from './modules/message';
import { AdminRoute } from './modules/admin';

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  meta: { name: '登录', menu: false },
  component: () => import('/@/views/login/Login.vue'),
};

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  meta: { name: 'Root' },
  redirect: '/home',
  component: BasicLayout,
  children: [HomeRoute, ErrorRoute, UserRoute, DanceRoute, MessageRoute, AdminRoute],
};

export const basicRoutes: AppRouteRecordRaw[] = [LoginRoute, RootRoute];
