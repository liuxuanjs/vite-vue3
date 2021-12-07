<template>
  <div class="dance-sidebar">
    <div class="sidebar-main">
      <div
        v-for="menu in menuList"
        :key="menu.value"
        :class="['sidebar-item', selectedKey === menu.value && 'sidebar-item--selected']"
        @click="onchange(menu.value)"
        >{{ menu.label }}</div
      >
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  interface MenuInfo {
    value: string;
    label: string;
  }

  export default defineComponent({
    name: 'DanceListSidebar',
    props: {
      menuList: {
        type: Array as PropType<MenuInfo[]>,
        default: () => [],
      },
      selectedKey: {
        type: String as PropType<string>,
        default: '',
      },
    },
    emits: ['change'],
    setup(_props, { emit }) {
      const onchange = (value: string) => {
        emit('change', value);
      };

      return { onchange };
    },
  });
</script>

<style lang="less">
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
