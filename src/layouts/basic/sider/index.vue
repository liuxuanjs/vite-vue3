<template>
  <a-layout> 123 </a-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';

  export default defineComponent({
    name: 'BasicSider',
    components: {
      'a-layout': Layout,
    },
  });
</script>

<style lang="less"></style>
