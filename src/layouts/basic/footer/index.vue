<template>
  <LayoutFooter :style="{ textAlign: 'center' }">
    Ant Design ©2018 Created by Ant UED
  </LayoutFooter>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';

  export default defineComponent({
    name: 'BasicFooter',
    components: {
      LayoutFooter: Layout.Footer,
    },
  });
</script>
