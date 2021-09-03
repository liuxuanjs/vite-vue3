<template>
  <Result status="404" title="404" sub-title="页面未找到">
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
    name: 'Error404',
    components: { Button, Result },
  };
</script>
