<template>
  <LayoutSider
    :style="{ overflowY: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    width="210"
  >
    <div class="basic-sider-logo"></div>
    <Menu theme="dark" mode="inline" :selectedKeys="selectedKeys" @select="onSelect">
      <MenuItem v-for="menu in filterMenus" :key="menu.path">
        <SvgIcon v-if="menu.icon" :name="menu.icon" class="anticon" :size="17" />
        <span class="menu-text">{{ menu.name }}</span>
      </MenuItem>
      <MenuSubMenu key="3">
        <template #title>
          <span>
            <UploadOutlined />
            <span>nav 3</span>
          </span>
        </template>
        <MenuItem key="3-1">Tom</MenuItem>
        <MenuItem key="3-2">Bill</MenuItem>
        <MenuItem key="3-3">Alex</MenuItem>
      </MenuSubMenu>
    </Menu>
  </LayoutSider>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { Layout, Menu } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';

  import { menus } from '/@/router/routes';

  import SvgIcon from '/@/components/SvgIcon/index.vue';

  export default defineComponent({
    name: 'BasicSider',
    components: {
      LayoutSider: Layout.Sider,
      Menu,
      MenuItem: Menu.Item,
      MenuSubMenu: Menu.SubMenu,
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
  .basic-sider-logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
</style>
