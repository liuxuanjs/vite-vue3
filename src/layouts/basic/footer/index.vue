<template>
  <a-layout-footer :style="{ textAlign: 'center' }">
    Ant Design ©2018 Created by Ant UED
  </a-layout-footer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';

  export default defineComponent({
    name: 'BasicFooter',
    components: {
      'a-layout-footer': Layout.Footer,
    },
  });
</script>
