<template>
  <Table
    :loading="loading"
    :dataSource="dataSource"
    :columns="columns"
    :pagination="pagination"
    row-key="id"
    @change="onTableChange"
    :style="{ marginBottom: '20px' }"
  />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Table } from 'ant-design-vue';

  import usePagination from '/@/hooks/usePagination';

  export default defineComponent({
    name: 'AnalysisTable',
    components: { Table },
    setup() {
      const loading = ref<boolean>(false);
      const dataSource = ref<any[]>([]);

      const { pagination, onPageChange } = usePagination();

      const getList = () => {};

      const onTableChange = (newPagination) => {
        onPageChange(newPagination);
        getList();
      };

      return {
        loading,
        dataSource,
        pagination,
        onTableChange,
        columns: [
          {
            title: '日期',
            dataIndex: 'mock1',
          },
          {
            title: '用户新增',
            dataIndex: 'mock2',
          },
          {
            title: '用户增长率',
            dataIndex: 'mock3',
          },
          {
            title: '用户总量',
            dataIndex: 'mock4',
          },
        ],
      };
    },
  });
</script>

<style lang="less"></style>
