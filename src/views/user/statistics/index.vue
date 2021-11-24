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
  import { defineComponent, reactive, toRefs, onMounted } from 'vue';

  import AnalysisPie from './AnalysisPie.vue';
  import LineTableWrap from './LineTableWrap.vue';
  import { getUserAnalyseApi } from '/@/api/user';

  export default defineComponent({
    name: 'UserStatistics',
    components: { AnalysisPie, LineTableWrap },
    setup() {
      const state = reactive<any>({
        userDetail: [
          { key: 'userCount', title: '用户总量', value: 0, color: '#E422E4' },
          { key: 'monthCount', title: '用户新增（月）', value: 0, color: '#18CAE8' },
          { key: 'percentage', title: '用户增长率（月）', value: '0%', color: '#F43E3E' },
        ],
        pieData: [],
        loading: false,
      });

      const getUserAnalyse = () => {
        const mockData = [
          {
            key: 'gender',
            title: '性别比例',
            data: [
              { value: 1048, name: '小哥哥' },
              { value: 1048, name: '小姐姐' },
              { value: 1048, name: '其他' },
            ],
          },
          {
            key: 'age',
            title: '年龄比例',
            data: [
              { value: 1048, name: '10-19' },
              { value: 1048, name: '18-25' },
              { value: 1048, name: '25-32' },
              { value: 1048, name: '32-40' },
              { value: 1048, name: '40-50' },
              { value: 1048, name: '>=50' },
            ],
          },
          {
            key: 'timeRange',
            title: '时间段',
            data: [
              { value: 1048, name: '02-08' },
              { value: 1048, name: '08-14' },
              { value: 1048, name: '14-20' },
              { value: 1048, name: '20-02' },
            ],
          },
        ];
        state.loading = true;
        getUserAnalyseApi()
          .then((res) => {
            // eslint-disable-next-line
            const { userCount, monthCount, pie } = res || {};
            state.userDetail = state.userDetail.map((item) => {
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

            state.pieData = mockData.map(({ key, title, data }) => {
              const obj: any = { key };
              obj.title = { text: title, left: 'center' };
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
            state.loading = false;
          });
      };

      onMounted(() => {
        getUserAnalyse();
      });

      return { ...toRefs(state) };
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
