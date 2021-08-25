import 'virtual:svg-icons-register';

import { createApp } from 'vue';
import App from './App.vue';

import { setupStore } from '/@/store';
import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less');
}

async function bootstrap() {
  const app = createApp(App);

  setupStore(app);

  setupRouter(app);

  setupRouterGuard(router);

  await router.isReady();

  app.mount('#app', true);
}

void bootstrap();
