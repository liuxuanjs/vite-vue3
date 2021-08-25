<template>
  <a-result status="404" title="404" sub-title="页面未找到">
    <template #extra>
      <router-link to="/home">
        <a-button type="primary">回首页</a-button>
      </router-link>
    </template>
  </a-result>
</template>

<script>
  import { Button, Result } from 'ant-design-vue';

  export default {
    components: {
      'a-button': Button,
      'a-result': Result,
    },
  };
</script>
