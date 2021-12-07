<template>
  <div class="dance-statistics">
    <div class="dance-statistics-head">
      <div class="dance-statistics-detail" v-for="(item, index) in userDetail" :key="index">
        <div>{{ item.title }}</div>
        <div class="dance-statistics-value-text" :style="{ color: item.color }">
          {{ item.value || 0 }}
        </div>
      </div>
    </div>
    <AnalysisPie />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import AnalysisPie from './AnalysisPie.vue';

  export default defineComponent({
    name: 'UserStatistics',
    components: { AnalysisPie },
    setup() {
      const userDetail = ref([
        { title: '舞曲总量', value: '325423', color: '#E422EE' },
        { title: '舞曲新增（月）', value: '2345', color: '#18CAE8' },
        { title: '用户跳舞次数统计', value: '123121', color: '#F43E3E' },
      ]);

      return { userDetail };
    },
  });
</script>

<style lang="less">
  .dance-statistics {
    margin: 20px;

    .dance-statistics-head {
      height: 140px;
      display: flex;
      margin-bottom: 20px;
      background: #fff;
    }

    .dance-statistics-detail {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #101010;
      line-height: 24px;
    }

    .dance-statistics-value-text {
      font-size: 36px;
      line-height: 54px;
      margin-top: 10px;
    }
  }
</style>
