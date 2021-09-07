<template>
  <div class="home-page">
    <div class="home-page-content">
      <Row :gutter="[80, 48]" wrap>
        <Col :xs="24" :sm="24" :md="12" :xl="8" v-for="(item, index) in homeData" :key="index">
          <div class="home-page-card" :style="{ background: item.bgc }" @click="onGoToDetail(item)">
            <div class="home-page-section-title">{{ item.name }}</div>
            <div class="home-page-section-count">{{ item.count }}</div>
            <div class="home-page-section-desc">详情</div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { Row, Col } from 'ant-design-vue';
  import { useRouter } from 'vue-router';

  import { UserStatisticsRoute, UserVitalityRoute } from '/@/router/routes/modules/user';

  export default defineComponent({
    name: 'Home',
    components: {
      Row,
      Col,
    },
    setup() {
      const state = reactive({
        homeData: [
          {
            name: '用户总量',
            count: 1234,
            bgc: 'rgb(13, 202, 175)',
            path: UserStatisticsRoute.path,
          },
          { name: '舞曲总量', count: 1234, bgc: 'rgb(24, 151, 232)', path: '' },
          { name: '用户跳舞总次数', count: 1234, bgc: 'rgb(162, 84, 255)', path: '' },
          { name: '日活', count: 1234, bgc: 'rgb(247, 121, 20)', path: UserVitalityRoute.path },
          { name: '周活', count: 1234, bgc: 'rgb(228, 34, 238)', path: UserVitalityRoute.path },
          { name: '月活', count: 1234, bgc: 'rgb(244, 62, 62)', path: UserVitalityRoute.path },
        ],
      });

      const router = useRouter();

      const onGoToDetail = ({ path }) => {
        router.push({ path });
      };

      return { ...toRefs(state), onGoToDetail };
    },
  });
</script>

<style lang="less">
  .home-page {
    margin: 20px;
    background: #fff;

    .home-page-content {
      padding: 50px 100px;
    }

    .home-page-card {
      height: 180px;
      position: relative;
      padding: 20px;
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
  }
</style>
