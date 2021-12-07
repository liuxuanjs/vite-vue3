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
  import { defineComponent, ref, onMounted } from 'vue';
  import AnalysisLine from './AnalysisLine.vue';
  import AnalysisTable from './AnalysisTable.vue';

  import { getNewCustomerCountApi } from '/@/api/customer';

  export default defineComponent({
    name: 'LineTableWrap',
    components: { AnalysisLine, AnalysisTable },
    setup() {
      const loading = ref<boolean>(false);
      const dataType = ref<string>('count');
      const type = ref<string>('date');
      const lineData = ref<any>({});
      const tableData = ref<any[]>([]);

      const createTopPercent = (data) => {
        return `${data.name}</br> ${data.marker} ${
          dataType.value === 'percentage' ? '用户增长率' : '用户新增'
        }: ${data.data}${dataType.value === 'percentage' ? `%` : ''}`;
      };

      const getData = () => {
        loading.value = true;
        getNewCustomerCountApi({ type: type.value })
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

            if (dataType.value === 'percentage') {
              result.yAxis.axisLabel = {
                show: true,
                interval: 'auto',
                formatter: '{value}%',
              };
            }
            (res || []).forEach((item): void => {
              result.xAxis.data.push(item.key);
              result.series[0].data.push(
                dataType.value === 'percentage'
                  ? item.newUserRate.split('%')[0]
                  : item.newUserCount,
              );
            });

            tableData.value = res || [];
            lineData.value = result;
          })
          .finally(() => {
            loading.value = false;
          });
      };

      const onChangeDataType = (e) => {
        dataType.value = e.target.value;
        getData();
      };

      const onChangeType = (e) => {
        type.value = e.target.value;
        getData();
      };

      onMounted(() => {
        getData();
      });

      return { loading, dataType, type, lineData, tableData, onChangeDataType, onChangeType };
    },
  });
</script>
