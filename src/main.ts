import '/@/assets/style/index.less';

// Register icon sprite
import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import App from './App.vue';

import { setupStore } from '/@/store';
import { useUserStore } from '/@/store/modules/user';
import { registerGlobComp } from '/@/components/registerGlobComp';
import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { isDevMode } from './utils/env';

if (isDevMode()) {
  import('ant-design-vue/dist/antd.less');
}

async function bootstrap() {
  const app = createApp(App);

  // store
  setupStore(app);

  // 注册全局组件
  registerGlobComp(app);

  // 路由
  setupRouter(app);

  // 路由守卫
  setupRouterGuard(router);

  // await router.isReady();

  app.mount('#app');
}

bootstrap();

// 加载用户信息
if (location.pathname !== '/login') {
  const userStore = useUserStore();
  userStore.getUserInfoAction();
}
