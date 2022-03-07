<template>
  <LayoutHeader class="basic-header" :style="{ background: '#fff' }">
    <div>
      <div class="basic-header-section cursor" v-if="isGoBack" @click="onGoBack">
        <ArrowLeftOutlined />
        <div class="basic-header-text">返回</div>
      </div>
    </div>
    <div class="basic-header-section basic-header-section-user" v-if="userInfo">
      <div>欢迎你，{{ userInfo.username }}</div>
      <div class="basic-header-log-out" @click="onLogOut">退出</div>
    </div>
  </LayoutHeader>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { Layout } from 'ant-design-vue';
  import { ArrowLeftOutlined } from '@ant-design/icons-vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '/@/store/modules/user';

  import { routeMap } from '/@/router/routes';
  import { LoginRoute } from '/@/router/routes/basic';
  import { logoutApi } from '/@/api/user';

  export default defineComponent({
    name: 'BasicHeader',
    components: {
      LayoutHeader: Layout.Header,
      ArrowLeftOutlined,
    },

    setup() {
      const route = useRoute();
      const router = useRouter();
      const userStore = useUserStore();

      const userInfo = computed(() => userStore.getUserInfo);

      /**
       * 不在导航栏菜单范围内的，都可以有返回键
       */
      const isGoBack = computed((): Boolean => {
        if (!routeMap) return false;
        return !routeMap.get(route.path);
      });

      /**
       * 返回
       */
      const onGoBack = () => {
        router.back();
      };

      /**
       * 退出登陆
       */
      const onLogOut = () => {
        logoutApi().then(() => {
          localStorage.removeItem('userInfo');
          location.href = LoginRoute.path;
        });
      };

      return { isGoBack, onGoBack, onLogOut, userInfo };
    },
  });
</script>

<style lang="less">
  .basic-header {
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .basic-header-section {
      font-size: 16px;
      line-height: 1;
      padding: 12px;
      display: flex;
      align-items: center;
    }

    .cursor {
      cursor: pointer;
    }

    .basic-header-section-user {
      font-size: 14px;
      justify-content: flex-end;
    }

    .basic-header-text {
      font-size: 14px;
      margin-left: 4px;
    }

    .basic-header-log-out {
      margin-left: 30px;
      padding: 10px;
      cursor: pointer;
    }
  }
</style>
