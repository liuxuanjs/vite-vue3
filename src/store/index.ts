import type { App } from 'vue';
import type { AppState } from '/#/store';

import { createStore } from 'vuex';
import { getUserInfoApi } from '/@/api/user';
import { router } from '/@/router';
import { PageEnum } from '/@/enums/pageEnum';

const store = createStore({
  state: (): AppState => ({
    userInfo: null,
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
    logout(context) {
      context.commit('setUserInfo', null);
      localStorage.removeItem('userInfo');
      router.push(PageEnum.BASE_LOGIN);
    },
  },
});

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
