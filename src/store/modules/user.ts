import { defineStore } from 'pinia';

import type { AppState, UserInfo } from '/#/store';

import { getUserInfoApi } from '/@/api/user';
import { PageEnum } from '/@/enums/pageEnum';

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): AppState => ({
    userInfo: null,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || {};
    },
  },
  actions: {
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
    },

    async getUserInfoAction() {
      try {
        const res = await getUserInfoApi();
        this.setUserInfo(res);
      } catch (error) {
        this.setUserInfo({});
      }
    },
    logout(needBackUrl = false) {
      this.setUserInfo(null);
      localStorage.removeItem('userInfo');
      if (location.pathname !== PageEnum.BASE_LOGIN && needBackUrl) {
        window.location.replace(
          `${PageEnum.BASE_LOGIN}?backUrl=${encodeURIComponent(location.href)}`,
        );
      } else {
        window.location.replace(PageEnum.BASE_LOGIN);
      }
    },
  },
});
