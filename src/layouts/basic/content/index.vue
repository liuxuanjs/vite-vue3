<template>
  <a-layout-content class="basic-content">
    <div class="basic-content-main">
      <router-view />
    </div>
  </a-layout-content>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';

  export default defineComponent({
    name: 'BasicContent',
    components: {
      'a-layout-content': Layout.Content,
    },
  });
</script>

<style lang="less">
  .basic-content {
    margin: 24px 16px 0;
    overflow: initial;
  }

  .basic-content-main {
    // height: 100%;
    padding: 24px;
    background: #fff;
    text-align: center;
  }
</style>
