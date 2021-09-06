<template>
  <Menu theme="dark" mode="inline" :selectedKeys="selectedKeys" @select="onSelect">
    <template v-for="menu in menus" :key="menu.path">
      <PageSubMenu
        v-if="menu.children && menu.children.length"
        :key="menu.path"
        :menu-info="menu"
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
  import { defineComponent, ref } from 'vue';
  import { Menu } from 'ant-design-vue';
  import { useRoute, useRouter } from 'vue-router';

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
        type: Array,
        default: () => [],
      },
    },
    setup() {
      const route = useRoute();
      const router = useRouter();

      const selectedKeys = ref<string[]>([route.path]);

      const onSelect = (e) => {
        const current: string[] = e.selectedKeys;
        selectedKeys.value = current;

        router.push({ path: current[0] });
      };

      return { selectedKeys, onSelect };
    },
  });
</script>

<style lang="less"></style>
