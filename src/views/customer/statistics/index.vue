<template>
  <div class="customer-statistics">
    <CustomerStatisticsDataPie />
    <CustomerStatisticsLineTable />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import CustomerStatisticsLineTable from './LineTable.vue';
  import CustomerStatisticsDataPie from './DataPie.vue';

  export default defineComponent({
    name: 'CustomerStatistics',
    components: { CustomerStatisticsDataPie, CustomerStatisticsLineTable },
  });
</script>

<style lang="less">
  .customer-statistics {
    margin: 20px;
  }
</style>
