import BlankLayout from '/@/layouts/blank/index.vue';
// import BasicLayout from '../layouts/basic/index.vue';

export default [
  {
    path: '/login',
    meta: { menu: false },
    component: BlankLayout,
    children: [
      {
        path: '/login',
        meta: { name: '登录' },
        component: () => import('/@/views/login/Login.vue'),
      },
    ],
  },
  {
    path: '/',
    meta: { name: '首页' },
    redirect: '/home',
    component: BlankLayout,
    children: [
      {
        path: '/home',
        meta: { name: '首页' },
        component: () => import('/@/views/home/Home.vue'),
      },

      /* 错误页面 */
      {
        path: '/error',
        redirect: '/error/404',
        meta: { name: '页面错误', menu: false },
        component: BlankLayout,
        children: [
          {
            path: '/error/404',
            meta: { name: '页面未找到' },
            component: () => import('/@/views/error/404.vue'),
          },
          {
            path: '/error/403',
            meta: { name: '无访问权限' },
            component: () => import('/@/views/error/403.vue'),
          },
        ],
      },
    ],
  },
];
