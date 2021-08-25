import type { App } from 'vue';

import { createStore } from 'vuex';
import request from '/@/utils/request';

const cache = {};

const store = createStore({
  state: {
    authorities: null,
    userInfo: {},
    allStores: null,
  },
  mutations: {
    setAuthorities(state, authorities) {
      state.authorities = authorities;
    },

    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },

    setAllStores(state, allStores) {
      state.allStores = allStores;
    },
  },
  actions: {
    getAuthorities(context) {
      let requesting = cache['getAuthorities'];

      if (requesting) {
        return requesting;
      }

      requesting = cache['getAuthorities'] = request({
        handleError: true,
        url: '/userRole/selectUserRoleAuthority',
        data: {},
      }).then((data = {}) => {
        const authorities = (data.userRoleAuthorityList || []).map((item) => item.code);

        context.commit('setAuthorities', authorities);
      });

      return requesting;
    },

    getUserInfo(context) {
      let requesting = cache['getUserInfo'];

      if (requesting) {
        return requesting;
      }

      requesting = cache['getUserInfo'] = request({
        handleError: true,
        url: 'admin/emp/getInfo',
      }).then((data = {}) => {
        context.commit('setUserInfo', data);
      });

      return requesting;
    },

    getAllStores(context) {
      let requesting = cache['getAllStores'];

      if (requesting) {
        return requesting;
      }

      requesting = cache['getAllStores'] = request({
        handleError: true,
        url: '/system/clubRelation/select',
        data: {
          pageSize: 1000,
          pageNum: 1,
          isStore: 1,
        },
      }).then((data = {}) => {
        context.commit('setAllStores', data.dataList || []);
      });

      return requesting;
    },
  },
});

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
