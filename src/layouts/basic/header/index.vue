<template>
  <LayoutHeader :style="{ background: '#fff', padding: 0 }" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';

  export default defineComponent({
    name: 'BasicHeader',
    components: {
      LayoutHeader: Layout.Header,
    },
  });
</script>
