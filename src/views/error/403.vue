<template>
  <Result status="403" title="403" sub-title="您暂无访问此页面的权限">
    <template #extra>
      <router-link to="/home">
        <Button type="primary">回首页</Button>
      </router-link>
    </template>
  </Result>
</template>

<script>
  import { Button, Result } from 'ant-design-vue';

  export default {
    name: 'Error403',
    components: { Button, Result },
  };
</script>
