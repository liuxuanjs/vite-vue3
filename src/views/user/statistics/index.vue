<template>
  <div class="user-statistics">
    <div class="user-statistics-head">
      <div class="user-statistics-detail" v-for="(item, index) in userDetail" :key="index">
        <div>{{ item.title }}</div>
        <div class="user-statistics-value-text" :style="{ color: item.color }">
          {{ item.value || 0 }}
        </div>
      </div>
    </div>
    <AnalysisPie :loading="loading" :pieData="pieData" />
    <LineTableWrap />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';

  import AnalysisPie from './AnalysisPie.vue';
  import LineTableWrap from './LineTableWrap.vue';
  import { getUserAnalyseApi } from '/@/api/user';

  interface UserDetailItem {
    key: string;
    title: string;
    value: string | number;
    color: string;
  }

  export default defineComponent({
    name: 'UserStatistics',
    components: { AnalysisPie, LineTableWrap },
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
        getUserAnalyseApi()
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
  .user-statistics {
    margin: 20px;

    .user-statistics-head {
      height: 140px;
      display: flex;
      margin-bottom: 20px;
      background: #fff;
    }

    .user-statistics-detail {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #101010;
      line-height: 24px;
    }

    .user-statistics-value-text {
      font-size: 36px;
      line-height: 54px;
      margin-top: 10px;
    }
  }
</style>
