<template>
  <div class="home-page">
    <div class="home-page-content">
      <Row :gutter="[80, 48]" wrap>
        <Col :xs="24" :sm="24" :md="12" :xl="8" v-for="(item, index) in homeData" :key="index">
          <router-link class="home-page-card" :style="{ background: item.bgc }" :to="item.path">
            <div class="home-page-section-title">{{ item.name }}</div>
            <div class="home-page-section-count">{{ item.count }}</div>
            <div class="home-page-section-desc">详情</div>
          </router-link>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Row, Col } from 'ant-design-vue';

  import { homeApi } from '/@/api/home';
  import { UserStatisticsRoute, UserVitalityRoute } from '/@/router/routes/modules/user';
  import { DanceStatisticsRoute } from '/@/router/routes/modules/dance';

  interface HomeDataItem {
    name: string;
    key: string;
    bgc: string;
    path: string;
    count?: number;
  }

  export default defineComponent({
    name: 'Home',
    components: { Row, Col },
    setup() {
      const homeData = ref<HomeDataItem[]>([
        { name: '用户总量', key: 'userCount', bgc: '#0DCA4B', path: UserStatisticsRoute.path },
        { name: '舞曲总量', key: 'danceCount', bgc: '#1897E8', path: DanceStatisticsRoute.path },
        {
          name: '用户跳舞总次数',
          key: 'recordCount',
          bgc: '#A254FF',
          path: DanceStatisticsRoute.path,
        },
        { name: '日活', key: 'dayCount', bgc: '#F77914', path: UserVitalityRoute.path },
        { name: '周活', key: 'weekCount', bgc: '#E422EE', path: UserVitalityRoute.path },
        { name: '月活', key: 'monthCount', bgc: '#F43E3E', path: UserVitalityRoute.path },
      ]);

      const getData = async () => {
        const data = await homeApi();
        homeData.value = homeData.value.map((item) => ({
          ...item,
          count: (data && data[item.key]) || 0,
        }));
      };

      onMounted(() => {
        getData();
      });

      return { homeData };
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
      display: block;
      height: 180px;
      position: relative;
      padding: 20px;
      cursor: pointer;
      color: #fff;
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
