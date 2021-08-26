<template>
  <a-config-provider>
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ConfigProvider } from 'ant-design-vue';
  // import zhCN from 'ant-design-vue/es/locale/zh_CN';

  export default defineComponent({
    name: 'App',
    components: {
      'a-config-provider': ConfigProvider,
    },
  });
</script>
