<template>
  <div class="dance-sidebar">
    <div class="sidebar-main">
      <div
        v-for="(menu, index) in menuList"
        :key="index"
        :class="['sidebar-item', selectedMenuKey === menu.key && 'sidebar-item--selected']"
        @click="onchange(menu.key)"
        >{{ menu.value }}</div
      >
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  interface MenuInfo {
    key: number;
    value: string;
  }

  export default defineComponent({
    name: 'DanceListSidebar',
    props: {
      menuList: {
        type: Array as PropType<MenuInfo[]>,
        default: () => [],
      },
      selectedMenuKey: {
        type: Number as PropType<number>,
        default: 0,
      },
      onchange: {
        type: Function as PropType<Fn>,
        default: () => ({}),
      },
    },
    // emits: ['change-menu'],
    // setup(_props, context) {
    //   const onchange = (value: number) => {
    //     context.emit('change-menu', value);
    //   };

    //   return { onchange };
    // },
  });
</script>

<style lang="less" scoped>
  .dance-sidebar {
    width: 150px;
    flex-shrink: 0;
    background: #fff;
    margin-top: 10px;

    .sidebar-main {
      padding: 10px 0;
      cursor: pointer;
    }

    .sidebar-item {
      padding-left: 24px;
      padding-right: 16px;
      font-size: 14px;
      line-height: 40px;
    }

    .sidebar-item--selected {
      background: #f0f2f5;
    }
  }
</style>
