<template>
  <Spin :spinning="loading">
    <div class="customer-statistics-data">
      <div class="statistics-detail" v-for="(item, index) in userDetail" :key="index">
        <div>{{ item.title }}</div>
        <div class="statistics-value-text" :style="{ color: item.color }">
          {{ item.value || 0 }}
        </div>
      </div>
    </div>
    <div class="customer-statistics-pie">
      <MyChart
        class="chart"
        v-for="item in pieData"
        :key="item.key"
        :options="item"
        height="380px"
      />
    </div>
  </Spin>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Spin } from 'ant-design-vue';

  // import AnalysisPie from './AnalysisPie.vue';
  import { getCustomerAnalyseApi } from '/@/api/customer';

  import MyChart from '/@/components/Chart/index.vue';

  interface UserDetailItem {
    key: string;
    title: string;
    value: string | number;
    color: string;
  }

  export default defineComponent({
    name: 'CustomerStatisticsDataPie',
    components: { Spin, MyChart },
    setup() {
      const userDetail = ref<UserDetailItem[]>([
        { key: 'userCount', title: '用户总量', value: 0, color: '#E422E4' },
        { key: 'monthCount', title: '用户新增（月）', value: 0, color: '#18CAE8' },
        { key: 'percentage', title: '用户增长率（月）', value: '0%', color: '#F43E3E' },
      ]);
      const loading = ref<boolean>(false);
      const pieData = ref<any[]>([]);

      const getUserAnalyse = () => {
        loading.value = true;
        getCustomerAnalyseApi()
          .then((res) => {
            const { userCount, monthCount, pie } = res || {};
            userDetail.value = userDetail.value.map((item) => {
              switch (item.key) {
                case 'userCount':
                  item.value = userCount;
                  break;
                case 'monthCount':
                  item.value = monthCount;
                  break;

                default:
                  item.value = `${((monthCount / userCount) * 100).toFixed(2)}%`;
                  break;
              }
              return item;
            });

            pieData.value = (pie || []).map(({ name, data }) => {
              const obj: any = {};
              obj.title = { text: name, left: 'center' };
              obj.tooltip = { trigger: 'item' };
              obj.series = [
                {
                  type: 'pie',
                  radius: '50%',
                  data,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                  },
                },
              ];
              return obj;
            });
          })
          .finally(() => {
            loading.value = false;
          });
      };

      onMounted(() => {
        getUserAnalyse();
      });

      return { userDetail, loading, pieData };
    },
  });
</script>

<style lang="less">
  .customer-statistics-data {
    height: 140px;
    display: flex;
    margin-bottom: 20px;
    background: #fff;

    .statistics-detail {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #101010;
      line-height: 24px;
    }

    .statistics-value-text {
      font-size: 36px;
      line-height: 54px;
      margin-top: 10px;
    }
  }

  .customer-statistics-pie {
    margin-bottom: 20px;
    background: #fff;
    display: flex;

    .chart {
      padding: 20px;
    }
  }
</style>
