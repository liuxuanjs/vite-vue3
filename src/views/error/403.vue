<template>
  <a-result status="403" title="403" sub-title="您暂无访问此页面的权限">
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
