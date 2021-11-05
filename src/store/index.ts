import type { App } from 'vue';
import type { AppState } from '/#/store';

import { createStore } from 'vuex';
import { getUserInfoApi } from '/@/api/user';

const store = createStore({
  state: (): AppState => ({
    userInfo: null,
    authorities: null,
  }),
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    async getUserInfo(context) {
      try {
        const res = await getUserInfoApi();
        context.commit('setUserInfo', res || {});
      } catch (error) {
        context.commit('setUserInfo', {});
      }
    },
  },
});

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
