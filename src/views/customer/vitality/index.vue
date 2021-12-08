<template>
  <div class="customer-vitality">
    <VitalityData />
    <CustomerVitalityLineTable />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import VitalityData from './VitalityData.vue';
  import CustomerVitalityLineTable from './LineTable.vue';

  export default defineComponent({
    name: 'UserStatistics',
    components: { VitalityData, CustomerVitalityLineTable },
  });
</script>

<style lang="less">
  .customer-vitality {
    margin: 20px;
  }
</style>
