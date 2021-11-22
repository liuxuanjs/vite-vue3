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
    <AnalysisPie />
    <AnalysisLine />
    <AnalysisTable />
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';

  import AnalysisPie from './AnalysisPie.vue';
  import AnalysisLine from './AnalysisLine.vue';
  import AnalysisTable from './AnalysisTable.vue';

  export default defineComponent({
    name: 'UserStatistics',
    components: { AnalysisPie, AnalysisLine, AnalysisTable },
    setup() {
      const state = reactive({
        userDetail: [
          { title: '用户总量', value: '325423', color: '#E422E4' },
          { title: '用户新增（月）', value: '2345', color: '#18CAE8' },
          { title: '用户增长率（月）', value: '12%', color: '#F43E3E' },
        ],
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
