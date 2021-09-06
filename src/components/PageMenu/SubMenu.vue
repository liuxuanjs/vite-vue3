<template>
  <MenuSubMenu>
    <template #title>
      <span>
        <SvgIcon v-if="menuInfo.icon" :name="menuInfo.icon" class="anticon" :size="17" />
        <span>{{ menuInfo.name }}</span>
      </span>
    </template>
    <template v-for="item in menuInfo.children">
      <PageSubMenu
        v-if="item.children && item.children.length"
        :key="item.path"
        :menu-info="item"
      />
      <MenuItem v-else :key="item.path" :title="item.name">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </MenuItem>
    </template>
  </MenuSubMenu>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Menu } from 'ant-design-vue';

  import SvgIcon from '/@/components/SvgIcon/index.vue';

  export default defineComponent({
    name: 'PageSubMenu',
    components: {
      MenuItem: Menu.Item,
      MenuSubMenu: Menu.SubMenu,
      SvgIcon,
    },
    props: {
      menuInfo: {
        type: Object,
        default: () => ({}),
      },
    },
  });
</script>

<style lang="less"></style>
