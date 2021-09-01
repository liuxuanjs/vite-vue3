<template>
  <div class="flex-wrapper">
    <div class="flex-wrapper-left">
      <!-- <slot name="left"></slot> -->
      <div class="flex-wrapper-menu">
        <!-- <div class="flex-wrapper-menu-item flex-wrapper-menu-item--selected">全部</div> -->
        <div
          v-for="(menu, index) in menuList"
          :key="index"
          :class="[
            'flex-wrapper-menu-item',
            selectedMenuKey === menu.key && 'flex-wrapper-menu-item--selected',
          ]"
          @click="onchange(menu.key)"
          >{{ menu.value }}</div
        >
      </div>
    </div>
    <div class="flex-wrapper-right">
      <slot name="rigth"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    name: 'FlexWrapper',
    components: {},
    props: {
      menuList: {
        type: Array,
        default: () => [],
      },
      selectedMenuKey: {
        type: Number as PropType<number>,
        default: 0,
      },
      onchange: {
        type: Function as PropType<(v: number) => void>,
        default: null,
      },
    },
    // setup(props) {
    //   const { menuList } = props;
    //   const

    //   const onchange = () => {

    //   }
    // },
  });
</script>

<style lang="less">
  .flex-wrapper {
    display: flex;
    height: 100%;
  }

  .flex-wrapper-left {
    width: 150px;
    flex-shrink: 0;
    background: #fff;
    margin-top: 10px;
  }

  .flex-wrapper-menu {
    padding: 10px 0;
    cursor: pointer;
  }

  .flex-wrapper-menu-item--selected {
    background: #f0f2f5;
  }

  .flex-wrapper-menu-item {
    padding-left: 24px;
    padding-right: 16px;
    font-size: 14px;
    line-height: 40px;
  }

  .flex-wrapper-right {
    flex: 1;
    margin: 20px 0 0 20px;
    background: #fff;
  }
</style>
