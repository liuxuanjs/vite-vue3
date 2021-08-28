<template>
  <a-layout-header :style="{ background: '#fff', padding: 0 }" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';

  export default defineComponent({
    name: 'BasicHeader',
    components: {
      'a-layout-header': Layout.Header,
    },
  });
</script>
