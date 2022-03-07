import type { App } from 'vue';
import { Input, Layout } from 'ant-design-vue';

export function registerGlobComp(app: App) {
  app.use(Input).use(Layout);
}
