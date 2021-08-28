import type { App } from 'vue';
import type { AppState } from '/#/store';

import { createStore } from 'vuex';
import { getAuthoritiesApi, getUserInfoApi } from '/@/api/user';

const store = createStore({
  state: (): AppState => ({
    authorities: [],
    userInfo: null,
  }),
  mutations: {
    setAuthorities(state, authorities) {
      state.authorities = authorities;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    async getAuthorities(context) {
      try {
        const res = await getAuthoritiesApi({
          data: {},
          handleError: true,
        });
        const authorities = ((res && res.userRoleAuthorityList) || []).map((item) => item.code);
        context.commit('setAuthorities', authorities || []);
      } catch (error) {
        context.commit('setAuthorities', []);
      }
    },
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
