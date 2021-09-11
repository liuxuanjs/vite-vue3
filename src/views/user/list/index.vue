<template>
  <div class="dance-list">
    <DanceListSidebar :menuList="typeList" :selectedKey="selectedMenuKey" @change="handleSelect" />
    <div class="dance-list-main">
      <div class="dance-list-section">
        <SearchFilter
          ref="formRef"
          :loading="loading"
          :configs="filterConfigs"
          @on-search="handleSearch"
          @set-default-value="setDefaultValue"
        />
      </div>
      <div class="dance-list-section">
        <Table
          :loading="loading"
          :dataSource="dataSource"
          :columns="columns"
          :pagination="pagination"
          row-key="id"
          @change="onTableChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, computed, toRefs, createVNode } from 'vue';
  import { Table, Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

  import usePagination from '/@/hooks/usePagination';
  import { typeList } from '/@/enums/user/type';
  import { genderEnums } from '/@/enums/user/gender';
  import { ageEnums } from '/@/enums/user/age';
  import { createUserListColumns } from './data';

  import DanceListSidebar from './Sidebar.vue';
  import SearchFilter from '/@/components/SearchFilter/index.vue';

  export default defineComponent({
    name: 'DanceList',
    components: { Table, DanceListSidebar, SearchFilter },
    setup() {
      const loading = ref<boolean>(false);
      const selectedMenuKey = ref<number>(1);
      const formRef = ref();
      const tableState = reactive({ loading: false, dataSource: [] });

      const { pagination, onPageChange } = usePagination();

      const getList = () => {};

      /**
       * 侧边栏选择
       */
      const handleSelect = (v: number) => {
        selectedMenuKey.value = v;
      };

      /**
       * 搜索
       */
      const handleSearch = (params) => {
        console.log('searchParams', params);
      };

      /**
       * 翻页
       */
      const onTableChange = (pagination) => {
        onPageChange(pagination);
        getList();
      };

      const setDefaultValue = (params) => {
        console.log('setParams', params);
      };

      /**
       * 禁用操作
       */
      const handleDisable = (record) => {
        console.log('record===', record);
      };

      /**
       * 解禁操作
       */
      const handleRelieve = (record) => {
        console.log('record===', record);
      };

      /**
       * 删除操作
       */
      const handleDelete = (record) => {
        console.log('record===', record);

        Modal.confirm({
          title: '删除确认?',
          icon: createVNode(ExclamationCircleOutlined),
          content: '删除后不能恢复，确定要删除吗',
          okType: 'danger',
          onOk() {
            console.log('OK');
          },
        });
      };

      const columns = computed(() => {
        return createUserListColumns({
          selectedMenuKey,
          handleDisable,
          handleRelieve,
          handleDelete,
        });
      });

      const filterConfigs = computed(() => {
        return [
          {
            name: 'mock1',
            type: 'select',
            placeholder: '请选择性别',
            options: genderEnums,
            formItemProps: { style: { minWidth: '112px' } },
            props: { showSearch: true },
          },
          {
            name: 'mock2',
            type: 'select',
            placeholder: '请选择年龄',
            options: ageEnums,
            formItemProps: { style: { minWidth: '112px' } },
            props: { showSearch: true },
          },
          {
            name: 'mock3',
            type: 'inputSearch',
            placeholder: '请输入用户名',
            formItemProps: { style: { flex: 1 } },
            props: {
              showSearch: true,
            },
          },
        ];
      });

      return {
        ...toRefs(tableState),
        loading,
        selectedMenuKey,
        typeList,
        formRef,
        filterConfigs,
        columns,
        pagination,
        handleSelect,
        handleSearch,
        setDefaultValue,
        onTableChange,
      };
    },
  });
</script>

<style lang="less">
  .dance-list {
    display: flex;
    height: 100%;

    .dance-list-main {
      flex: 1;
      margin: 20px 0 0 20px;
      background: #fff;
    }

    .dance-list-section {
      margin: 20px;
    }

    .dance-list-form-item {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      .ant-form-item {
        margin: 0;
      }
    }
  }
</style>
