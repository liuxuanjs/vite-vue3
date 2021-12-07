import type { AppRouteRecordRaw } from '../types';

import BasicLayout from '/@/layouts/basic/index.vue';

import { HomeRoute } from './modules/home';
import { ErrorRoute } from './modules/error';
// import { CustomerRoute } from './modules/customer';
import {
  CustomerListRoute,
  CustomerStatisticsRoute,
  CustomerVitalityRoute,
} from './modules/customer';
// import { DanceRoute } from './modules/dance';
import { DanceListRoute, DanceStatisticsRoute } from './modules/dance';
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
  children: [
    HomeRoute,
    ErrorRoute,
    CustomerListRoute,
    CustomerStatisticsRoute,
    CustomerVitalityRoute,
    DanceListRoute,
    DanceStatisticsRoute,
    MessageRoute,
    AdminRoute,
  ],
};

export const basicRoutes: AppRouteRecordRaw[] = [LoginRoute, RootRoute];
