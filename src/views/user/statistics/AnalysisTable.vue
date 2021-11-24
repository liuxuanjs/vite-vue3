<template>
  <Table
    :loading="loading"
    :dataSource="tableData"
    :columns="columns"
    :pagination="false"
    row-key="id"
    :style="{ marginBottom: '20px' }"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Table } from 'ant-design-vue';

  export default defineComponent({
    name: 'AnalysisTable',
    components: { Table },
    props: {
      loading: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      tableData: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
    },
    setup() {
      return {
        columns: [
          {
            title: '日期',
            dataIndex: 'key',
          },
          {
            title: '用户新增',
            dataIndex: 'newUserCount',
          },
          {
            title: '用户增长率',
            dataIndex: 'newUserRate',
          },
          {
            title: '用户总量',
            dataIndex: 'totalUser',
          },
        ],
      };
    },
  });
</script>

<style lang="less"></style>
