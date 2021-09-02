<template>
  <Layout class="basic-layout">
    <BasicSider />
    <Layout :style="{ marginLeft: '210px' }">
      <BasicHeader />
      <BasicContent />
      <BasicFooter />
    </Layout>
  </Layout>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';

  import BasicHeader from './header/index.vue';
  import BasicContent from './content/index.vue';
  import BasicFooter from './footer/index.vue';
  import BasicSider from './sider/index.vue';

  export default defineComponent({
    name: 'BasicLayout',
    components: {
      Layout,
      BasicHeader,
      BasicContent,
      BasicFooter,
      BasicSider,
    },
  });
</script>
<style lang="less">
  .basic-layout {
    display: flex;
    width: 100%;
    min-height: 100% !important;
    background-color: #f4f7f9;
    flex-direction: column;
  }
</style>
