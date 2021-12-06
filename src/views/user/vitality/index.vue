<template>
  <div class="user-vitality">
    <div class="user-vitality-head">
      <div class="user-vitality-detail" v-for="(item, index) in userDetail" :key="index">
        <div>{{ item.title }}</div>
        <div class="user-vitality-value-text" :style="{ color: item.color }">
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
          { title: '日活', value: '325423', color: '#E422EE' },
          { title: '周活', value: '2345', color: '#18CAE8' },
          { title: '月活', value: '12%', color: '#F43E3E' },
        ],
      });

      return { ...toRefs(state) };
    },
  });
</script>

<style lang="less">
  .user-vitality {
    margin: 20px;

    .user-vitality-head {
      height: 140px;
      display: flex;
      margin-bottom: 20px;
      background: #fff;
    }

    .user-vitality-detail {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #101010;
      line-height: 24px;
    }

    .user-vitality-value-text {
      font-size: 36px;
      line-height: 54px;
      margin-top: 10px;
    }
  }
</style>
