<template>
  <LayoutSider
    :style="{ overflowY: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    width="210"
  >
    <div class="basic-sider-top">
      <router-link class="basic-sider-top-text" to="/">
        <div>DanceUP</div>
        <div>后台管理</div>
      </router-link>
    </div>
    <PageMenu :menus="filterMenus" />
  </LayoutSider>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { Layout } from 'ant-design-vue';
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';

  import { menus } from '/@/router/routes';

  import PageMenu from '/@/components/PageMenu/index.vue';

  export default defineComponent({
    name: 'BasicSider',
    components: {
      LayoutSider: Layout.Sider,
      PageMenu,
    },
    setup() {
      const store = useStore();
      const route = useRoute();
      const router = useRouter();

      console.log('route===', router.currentRoute.value);

      const selectedKeys = ref<string[]>([route.path]);

      const handleMenu = (menus, authorities, data) => {
        menus.forEach((menu) => {
          const { authority, children } = menu;

          if (!authority || authorities.indexOf(authority) > -1) {
            data.push(menu);

            if (children.length) {
              const subMenus = [];

              handleMenu(children, authorities, subMenus);
              menu.children = subMenus;
            }
          }
        });
      };

      const onSelect = (e) => {
        const current: string[] = e.selectedKeys;
        selectedKeys.value = current;

        router.push({ path: current[0] });
      };

      // const getOpenKeys = computed(() => {
      //   const openKeys: string[] = [];
      //   console.log('route===', route);

      //   while (route) {
      //     const {
      //       path,
      //       meta: { parent },
      //     } = route;

      //     openKeys.push(path);
      //     route = parent;
      //   }
      //   console.log('openKeys==', openKeys);
      //   return openKeys;
      // });

      const filterMenus = computed(() => {
        const { authorities } = store.state;
        const data = [];

        handleMenu(menus, authorities, data);

        return data;
      });

      return { selectedKeys, filterMenus, onSelect };
    },
  });
</script>

<style lang="less">
  .basic-sider-top {
    margin: 16px;
    text-align: center;
    font-size: 14px;
  }

  .basic-sider-top-text {
    color: rgba(255, 255, 255, 0.65);
  }

  .basic-sider-top-text:hover {
    color: #fff;
  }
</style>
