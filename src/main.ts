import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/state';

import { NAVIGATE_TYPE_LIST } from '@/enums/routerEnum';
import addInterceptor from './utils/router/interceptor';

// 增加路由拦截
NAVIGATE_TYPE_LIST.forEach((name) => {
  addInterceptor(name);
});

export function createApp() {
  const app = createSSRApp(App);

  // Configure store
  setupStore(app);

  return {
    app,
  };
}
