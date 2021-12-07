<template>
  <Menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys" :openKeys="openKeys">
    <template v-for="menu in menus" :key="menu.path">
      <PageSubMenu
        v-if="menu.children && menu.children.length"
        :currentPath="menu.path"
        :menuInfo="menu"
      />
      <MenuItem v-else :key="menu.path">
        <router-link :to="menu.path">
          <SvgIcon v-if="menu.icon" :name="menu.icon" class="anticon" :size="17" />
          <span>{{ menu.name }}</span>
        </router-link>
      </MenuItem>
    </template>
  </Menu>
</template>

<script lang="ts">
  import { defineComponent, watchEffect, ref } from 'vue';
  import { Menu } from 'ant-design-vue';
  import { useRouter } from 'vue-router';

  import type { Menu as MenuType } from '/@/router/types';

  import SvgIcon from '/@/components/SvgIcon/index.vue';
  import PageSubMenu from './SubMenu.vue';

  export default defineComponent({
    name: 'PageMenu',
    components: {
      Menu,
      MenuItem: Menu.Item,
      SvgIcon,
      PageSubMenu,
    },
    props: {
      menus: {
        type: Array as PropType<MenuType[]>,
        default: () => [],
      },
    },
    setup() {
      const router = useRouter();
      const { currentRoute } = router;

      const openKeys = ref<string[]>([]);
      const selectedKeys = ref<string[]>([]);

      watchEffect(async () => {
        const { matched: routeMatched, path, meta } = currentRoute.value;

        if (!routeMatched || routeMatched.length === 0) return;

        selectedKeys.value = [path];
        if (meta.menu !== false) {
          openKeys.value = routeMatched.map(({ path }) => path).reverse();
        }
      });

      return { openKeys, selectedKeys };
    },
  });
</script>

<style lang="less"></style>
