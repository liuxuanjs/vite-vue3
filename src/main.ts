import '/@/design/index.less';

import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import App from './App.vue';

import { setupStore, store } from '/@/store';
import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { isDevMode, isProdMode } from './utils/env';

if (isDevMode()) {
  import('ant-design-vue/dist/antd.less');
}

// 生产环境自动跳转HTTPS访问
if (isProdMode() && location.protocol === 'http:') {
  location.protocol = 'https:';
  throw Error('');
}

async function bootstrap() {
  const app = createApp(App);

  // store
  setupStore(app);

  // 路由
  setupRouter(app);

  // 路由守卫
  setupRouterGuard(router);

  await router.isReady();

  app.mount('#app', true);
}

void bootstrap();

// 加载用户信息数据和权限信息数据
if (location.pathname !== '/login') {
  store.dispatch('getAuthorities');
  store.dispatch('getUserInfo');
}
