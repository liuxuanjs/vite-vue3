<template>
  <Spin :spinning="loading" wrapperClassName="vitality-data">
    <div class="vitality-data-item" v-for="(item, index) in userDetail" :key="index">
      <div>{{ item.title }}</div>
      <div class="vitality-data-item-text" :style="{ color: item.color }">
        {{ item.value || 0 }}
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Spin } from 'ant-design-vue';

  import { getCustomerAnalyseApi } from '/@/api/customer';

  interface UserDetailItem {
    key: string;
    title: string;
    value: string | number;
    color: string;
  }

  export default defineComponent({
    name: 'VitalityData',
    components: { Spin },
    setup() {
      const userDetail = ref<UserDetailItem[]>([
        { key: 'userCount', title: '日活', value: 0, color: '#E422EE' },
        { key: 'monthCount', title: '周活', value: 0, color: '#18CAE8' },
        { key: 'percentage', title: '月活', value: 0, color: '#F43E3E' },
      ]);
      const loading = ref<boolean>(false);

      const getUserVitality = () => {
        loading.value = true;
        getCustomerAnalyseApi()
          .then((res) => {
            const { userCount, monthCount } = res || {};
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
          })
          .finally(() => {
            loading.value = false;
          });
      };

      onMounted(() => {
        getUserVitality();
      });

      return { userDetail, loading };
    },
  });
</script>

<style lang="less">
  .vitality-data {
    height: 140px;
    margin-bottom: 20px;
    background: #fff;

    .ant-spin-container {
      display: flex;
      height: 100%;
    }

    .vitality-data-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #101010;
      line-height: 24px;
    }

    .vitality-data-item-text {
      font-size: 36px;
      line-height: 54px;
      margin-top: 10px;
    }
  }
</style>
