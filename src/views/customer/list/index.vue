<template>
  <div class="customer-list">
    <div class="customer-list-sidebar">
      <div class="customer-sidebar-main">
        <div
          v-for="menu in statusList"
          :key="menu.value"
          :class="['sidebar-item', status === menu.value && 'sidebar-item--selected']"
          @click="handleSelect(menu.value)"
        >
          {{ menu.label }}
        </div>
      </div>
    </div>
    <div class="customer-list-main">
      <div class="customer-list-section">
        <SearchFilter
          ref="formRef"
          :loading="loading"
          :configs="filterConfigs"
          @onSearch="onSearch"
        />
      </div>
      <div class="customer-list-section">
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
  import { defineComponent, ref, computed, createVNode, onMounted } from 'vue';
  import { Table, Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

  import usePagination from '/@/hooks/usePagination';
  import { statusList } from '/@/enums/user/status';
  import { genderEnums } from '/@/enums/user/gender';
  import { ageEnums } from '/@/enums/user/age';
  import { createUserListColumns } from './data';
  import { getParams } from './adaptor';
  import { getCustomerListApi, updateCustomerApi, deleteCustomerApi } from '/@/api/customer';

  import SearchFilter from '/@/components/SearchFilter/index.vue';

  export default defineComponent({
    name: 'UserList',
    components: { Table, SearchFilter },
    setup() {
      const status = ref<number>(0);
      const formRef = ref<any>({});
      const loading = ref<boolean>(false);
      const dataSource = ref<any[]>([]);

      const { pagination, onPageChange } = usePagination();

      const getList = () => {
        const params = getParams(pagination, { ...formRef.value.formData, status: status.value });

        loading.value = true;
        getCustomerListApi(params)
          .then((res) => {
            const { current, total, records } = res || {};
            pagination.current = current;
            pagination.total = total;
            dataSource.value = records || [];
          })
          .finally(() => {
            loading.value = false;
          });
      };

      const onSearch = () => {
        pagination.current = 1;
        getList();
      };

      // 侧边栏选择
      const handleSelect = (v: number) => {
        if (status.value === v) return;
        status.value = v;
        pagination.current = 1;
        getList();
      };

      // 翻页
      const onTableChange = (pagination) => {
        onPageChange(pagination);
        getList();
      };

      // 更新用户状态
      const handleEditUser = (record, disable) => {
        updateCustomerApi({ id: record.id, disable }).then(() => {
          getList();
        });
      };

      // 删除操作
      const handleDelete = (record) => {
        Modal.confirm({
          title: '删除确认?',
          icon: createVNode(ExclamationCircleOutlined),
          content: '删除后不能恢复，确定要删除吗',
          okType: 'danger',
          onOk() {
            deleteCustomerApi({ id: record.id }).then(() => {
              getList();
            });
          },
        });
      };

      onMounted(() => {
        getList();
      });

      const columns = computed(() => {
        return createUserListColumns(handleEditUser, handleDelete);
      });

      const filterConfigs = computed(() => {
        return [
          {
            name: 'sex',
            type: 'select',
            placeholder: '请选择性别',
            options: genderEnums,
            formItemProps: { style: { minWidth: '112px' } },
            props: { showSearch: true },
          },
          {
            name: 'age',
            type: 'select',
            placeholder: '请选择年龄',
            options: ageEnums,
            formItemProps: { style: { minWidth: '112px' } },
            props: { showSearch: true },
          },
          {
            name: 'userName',
            type: 'inputSearch',
            placeholder: '请输入用户名',
            formItemProps: { style: { flex: 1 } },
            props: { showSearch: true },
          },
        ];
      });

      return {
        loading,
        dataSource,
        status,
        statusList,
        formRef,
        filterConfigs,
        columns,
        pagination,
        handleSelect,
        onTableChange,
        onSearch,
      };
    },
  });
</script>

<style lang="less">
  .customer-list {
    display: flex;
    height: 100%;

    .customer-list-sidebar {
      width: 150px;
      flex-shrink: 0;
      background: #fff;
      margin-top: 10px;

      .customer-sidebar-main {
        padding: 10px 0;
        cursor: pointer;
      }

      .sidebar-item {
        padding-left: 24px;
        padding-right: 16px;
        font-size: 14px;
        line-height: 40px;
      }

      .sidebar-item--selected {
        background: #f0f2f5;
      }
    }

    .customer-list-main {
      flex: 1;
      margin: 20px 0 0 20px;
      background: #fff;
    }

    .customer-list-section {
      margin: 20px;
    }

    .customer-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
</style>
