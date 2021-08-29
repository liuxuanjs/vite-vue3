<template>
  <div class="home-page">
    <div class="home-page-content">
      <div
        class="home-page-section"
        v-for="(item, index) in homeData"
        :key="index"
        :style="{ background: item.bgc }"
        @click="onGoToDetail(item.path)"
      >
        <div class="home-page-section-title">{{ item.name }}</div>
        <div class="home-page-section-count">{{ item.count }}</div>
        <div class="home-page-section-desc">详情</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';

  export default defineComponent({
    name: 'Home',
    setup() {
      const state = reactive({
        homeData: [
          { name: '用户总量', count: 1234, bgc: 'rgb(13, 202, 175)', path: '' },
          { name: '舞曲总量', count: 1234, bgc: 'rgb(24, 151, 232)', path: '' },
          { name: '用户跳舞总次数', count: 1234, bgc: 'rgb(162, 84, 255)', path: '' },
          { name: '日活', count: 1234, bgc: 'rgb(247, 121, 20)', path: '' },
          { name: '周活', count: 1234, bgc: 'rgb(228, 34, 238)', path: '' },
          { name: '月活', count: 1234, bgc: 'rgb(244, 62, 62)', path: '' },
        ],
      });

      const onGoToDetail = (path) => {
        console.log(path);
      };

      return {
        ...toRefs(state),
        onGoToDetail,
      };
    },
  });
</script>

<style lang="less">
  .home-page {
    margin: 20px;
    background: #fff;
  }

  .home-page-content {
    margin: 0 100px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-bottom: 50px;
  }

  .home-page-section {
    width: 320px;
    height: 180px;
    margin-top: 50px;
    color: #fff;
    padding: 20px;
    position: relative;
    cursor: pointer;
  }

  .home-page-section-title {
    font-size: 24px;
  }

  .home-page-section-count {
    font-weight: 400;
    font-size: 50px;
  }

  .home-page-section-desc {
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 20px;
  }
</style>
