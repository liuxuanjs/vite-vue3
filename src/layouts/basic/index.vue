<template>
  <a-layout class="basic-layout">
    <a-layout-sider
      :style="{ overflowY: 'auto', height: '100vh', position: 'fixed', left: 0 }"
      width="210"
    >
      <div class="logo"></div>
      <a-menu theme="dark" mode="inline" :selectedKeys="selectedKeys" @select="onSelect">
        <a-menu-item v-for="menu in filterMenus" :key="menu.path">
          <SvgIcon v-if="menu.icon" :name="menu.icon" class="anticon" :size="17" />
          <span class="menu-text">{{ menu.name }}</span>
        </a-menu-item>
        <a-sub-menu key="3">
          <template #title>
            <span>
              <UploadOutlined />
              <span>nav 3</span>
            </span>
          </template>
          <a-menu-item key="3-1">Tom</a-menu-item>
          <a-menu-item key="3-2">Bill</a-menu-item>
          <a-menu-item key="3-3">Alex</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '210px' }">
      <BasicHeader />
      <BasicContent />
      <BasicFooter />
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { Layout, Menu } from 'ant-design-vue';
  import { defineComponent, ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';

  import BasicHeader from './header/index.vue';
  import BasicContent from './content/index.vue';
  import BasicFooter from './footer/index.vue';
  import SvgIcon from '/@/components/SvgIcon/index.vue';

  import { menus } from '/@/router/routes';

  export default defineComponent({
    components: {
      'a-layout': Layout,
      'a-layout-sider': Layout.Sider,
      'a-menu': Menu,
      'a-menu-item': Menu.Item,
      'a-sub-menu': Menu.SubMenu,
      BasicHeader,
      BasicContent,
      BasicFooter,
      SvgIcon,
      UploadOutlined,
    },
    setup() {
      const store = useStore();
      const route = useRoute();
      const router = useRouter();

      const selectedKeys = ref<string[]>([route.path]);

      console.log(route.path);

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

      const onSelect = (e): void => {
        const current: string[] = e.selectedKeys;
        selectedKeys.value = current;

        router.push({ path: current[0] });
      };

      const filterMenus = computed(() => {
        const { authorities } = store.state;
        const data = [];

        handleMenu(menus, authorities, data);

        return data;
      });

      return {
        selectedKeys,
        filterMenus,
        onSelect,
      };
    },
  });
</script>
<style lang="less">
  .basic-layout {
    display: flex;
    width: 100%;
    min-height: 100% !important;
    background-color: #f4f7f9;
    flex-direction: column;
  }

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }

  [data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
  }

  .basic-slider-icon {
    width: 17px;
    height: 17px;
  }

  basic-slider-icon:hover {
    color: #fff;
    background-color: transparent;
  }

  // .ant-layout-sider {
  //   background: rgba(40, 40, 40);
  // }
</style>
