<template>
  <LayoutSider
    :style="{ overflowY: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    width="210"
  >
    <div class="basic-sider-top">
      <div>DanceUP</div>
      <div>后台管理</div>
    </div>
    <Menu theme="dark" mode="inline" :selectedKeys="selectedKeys" @select="onSelect">
      <MenuItem v-for="menu in filterMenus" :key="menu.path">
        <SvgIcon v-if="menu.icon" :name="menu.icon" class="anticon" :size="17" />
        <span class="menu-text">{{ menu.name }}</span>
      </MenuItem>
      <!-- <MenuSubMenu key="3">
        <template #title>
          <span>
            <UploadOutlined />
            <span>nav 3</span>
          </span>
        </template>
        <MenuItem key="3-1">Tom</MenuItem>
        <MenuItem key="3-2">Bill</MenuItem>
        <MenuItem key="3-3">Alex</MenuItem>
      </MenuSubMenu> -->
    </Menu>
  </LayoutSider>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { Layout, Menu } from 'ant-design-vue';
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
      SvgIcon,
    },
    setup() {
      const store = useStore();
      const route = useRoute();
      const router = useRouter();

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
    color: #fff;
    font-size: 14px;
  }
</style>
