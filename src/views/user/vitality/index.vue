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
    <AnalysisLine />
    <AnalysisTable />
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';

  import AnalysisLine from './AnalysisLine.vue';
  import AnalysisTable from './AnalysisTable.vue';

  export default defineComponent({
    name: 'UserStatistics',
    components: { AnalysisLine, AnalysisTable },
    setup() {
      const state = reactive({
        userDetail: [
          { title: '日活', value: '325423', color: 'rgb(228, 34, 238)' },
          { title: '周活', value: '2345', color: 'rgba(24, 202, 232, 1)' },
          { title: '月活', value: '12%', color: 'rgba(244, 62, 62, 1)' },
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
      color: rgb(16 16 16);
      line-height: 24px;
    }

    .user-statistics-value-text {
      font-size: 36px;
      line-height: 54px;
      margin-top: 10px;
    }
  }
</style>
