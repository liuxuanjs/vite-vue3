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
    <PageMenu :menus="menus" />
  </LayoutSider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';

  import { menus } from '/@/router/routes';

  // import type { AppRouteRecordRaw } from '/@/router/types';
  import PageMenu from '/@/components/PageMenu/index.vue';

  export default defineComponent({
    name: 'BasicSider',
    components: {
      LayoutSider: Layout.Sider,
      PageMenu,
    },
    setup() {
      // const handleMenu = (menus, authorities, data) => {
      //   menus.forEach((menu) => {
      //     const { authority, children } = menu;

      //     if (!authority || authorities.indexOf(authority) > -1) {
      //       data.push(menu);

      //       if (children.length) {
      //         const subMenus = [];

      //         handleMenu(children, authorities, subMenus);
      //         menu.children = subMenus;
      //       }
      //     }
      //   });
      // };

      // const filterMenus = computed(() => {
      //   // const { authorities } = store.state;
      //   // const data = [];

      //   // handleMenu(menus, authorities, data);

      //   // return data;
      // });

      return { menus };
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
