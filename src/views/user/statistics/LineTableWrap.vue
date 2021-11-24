<template>
  <AnalysisLine
    :loading="loading"
    :dataType="dataType"
    :type="type"
    :lineData="lineData"
    :onChangeDataType="onChangeDataType"
    :onChangeType="onChangeType"
  />
  <AnalysisTable :loading="loading" :tableData="tableData" />
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, onMounted } from 'vue';
  import AnalysisLine from './AnalysisLine.vue';
  import AnalysisTable from './AnalysisTable.vue';

  import { getNewUserCountApi } from '/@/api/user';

  export default defineComponent({
    name: 'LineTableWrap',
    components: { AnalysisLine, AnalysisTable },
    setup() {
      const state = reactive<any>({
        loading: false,
        dataType: 'count',
        type: 'date',
        lineData: {},
        tableData: [],
      });

      const createTopPercent = (data) => {
        return `${data.name}</br> ${data.marker} ${
          state.dataType === 'percentage' ? '用户增长率' : '用户新增'
        }: ${data.data}${state.dataType === 'percentage' ? `%` : ''}`;
      };

      const getData = () => {
        state.loading = true;
        getNewUserCountApi({ type: state.type })
          .then((res) => {
            const result = {
              xAxis: { type: 'category', data: [] as string[] },
              yAxis: { type: 'value' } as any,
              tooltip: {
                trigger: 'axis',
                formatter(data) {
                  return data.map((item) => createTopPercent(item))[0];
                },
              },
              series: [{ data: [] as number[], type: 'line' }],
            };

            if (state.dataType === 'percentage') {
              result.yAxis.axisLabel = {
                show: true,
                interval: 'auto',
                formatter: '{value}%',
              };
            }
            (res || []).forEach((item): void => {
              result.xAxis.data.push(item.key);
              result.series[0].data.push(
                state.dataType === 'percentage'
                  ? item.newUserRate.split('%')[0]
                  : item.newUserCount,
              );
            });

            state.tableData = res || [];
            state.lineData = result;
          })
          .finally(() => {
            state.loading = false;
          });
      };

      const onChangeDataType = (e) => {
        state.dataType = e.target.value;
        getData();
      };

      const onChangeType = (e) => {
        state.type = e.target.value;
        getData();
      };

      onMounted(() => {
        getData();
      });

      return { ...toRefs(state), onChangeDataType, onChangeType };
    },
  });
</script>
