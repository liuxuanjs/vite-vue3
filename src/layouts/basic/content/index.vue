<template>
  <div class="ant-layout page-default-layout-main">
    <div class="page-default-layout-content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'BasicContent',
  });
</script>

<style lang="less">
  .page-default-layout-main {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
  }

  .page-default-layout-content {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
  }
</style>
