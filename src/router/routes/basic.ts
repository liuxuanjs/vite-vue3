import type { AppRouteRecordRaw } from '../types';

// import BlankLayout from '/@/layouts/blank/index.vue';
import BasicLayout from '/@/layouts/basic/index.vue';

import { HomeRoute } from './modules/home';
import { ErrorRoute } from './modules/error';

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  meta: {
    name: '登录',
    menu: false,
  },
  component: () => import('/@/views/login/Login.vue'),
};

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  meta: {
    name: 'Root',
  },
  redirect: '/home',
  component: BasicLayout,
  children: [HomeRoute, ErrorRoute],
};

export const basicRoutes = [LoginRoute, RootRoute];
