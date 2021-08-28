<template>
  <div class="home-page">
    <img class="home-page__logo" src="/@/assets/images/logo.png" />
    <div class="home-page__welcome">欢迎使用一兆韦德业务管理系统</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Home',
  });
</script>

<style lang="less">
  .home-page {
    padding: 100px 0 300px;
    margin: 20px;
    text-align: center;
    background: #fff;
  }

  .home-page__logo {
    width: 264px;
  }

  .home-page__welcome {
    margin-top: 80px;
    font-size: 30px;
    font-weight: 600;
  }
</style>
