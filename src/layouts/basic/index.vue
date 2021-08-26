<template>
  <a-layout>
    123
    <router-view />
  </a-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';

  export default defineComponent({
    name: 'Basic',
    components: {
      'a-layout': Layout,
    },
  });
</script>

<style></style>
