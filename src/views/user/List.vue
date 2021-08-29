<template>
  <!-- <div class="user-list"> UserList </div> -->
  <FlexWrapper
    class="user-list"
    :menuList="menuList"
    :selectedMenuKey="selectedMenuKey"
    :onchange="onchange"
  >
    <template #left>
      <div> 12312 </div>
    </template>
    <template #rigth>
      <div class="user-list-table">
        <a-table :dataSource="dataSource" :columns="columns" />
      </div>
    </template>
  </FlexWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { Table } from 'ant-design-vue';

  import FlexWrapper from '/@/components/FlexWrapper/index.vue';

  export default defineComponent({
    name: 'UserList',
    components: {
      FlexWrapper,
      'a-table': Table,
    },
    setup() {
      const state = reactive({
        menuList: [
          { key: 1, value: '全部' },
          { key: 2, value: '禁用' },
        ],
        selectedMenuKey: 1,
      });

      const onchange = (v) => {
        state.selectedMenuKey = v;
      };

      return {
        ...toRefs(state),
        onchange,
        dataSource: [
          {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
          },
          {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
        ],

        columns: [
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
          },
        ],
      };
    },
  });
</script>

<style lang="less">
  .user-list-table {
    padding: 20px;
  }
</style>
