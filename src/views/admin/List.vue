<template>
  <div class="admin-list">
    <Table
      :loading="loading"
      :dataSource="dataSource"
      :columns="columns"
      :pagination="pagination"
      row-key="id"
      @change="onTableChange"
    >
      <template #title>
        <Button type="primary" @click="onAdd"> 新增 </Button>
      </template>
      <template #operation="{ record }">
        <Space>
          <Button type="primary" ghost @click="onEdit(record)"> 编辑 </Button>
          <Button danger :disabled="record.isManager" @click="onDelete(record)"> 删除 </Button>
        </Space>
      </template>
    </Table>

    <Modal
      v-model:visible="visible"
      :title="modalTitle"
      centered
      :confirmLoading="modalLoading"
      @cancel="handleCancel"
      @ok="handleOk"
    >
      <Form
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
        :style="{ marginTop: '24px' }"
        ref="modalFormRef"
        :model="modalInfo"
        :rules="rules"
      >
        <FormItem name="userName" label="账号">
          <Input
            v-model:value="modalInfo.userName"
            :disabled="modalTitle === '编辑'"
            allowClear
            placeholder="请输入账号"
          />
        </FormItem>
        <FormItem name="userPassword" label="密码">
          <Input v-model:value="modalInfo.userPassword" allowClear placeholder="请输入密码" />
        </FormItem>
        <FormItem name="isManager" label="是否是管理员">
          <Switch v-model:checked="modalInfo.isManager" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Table, Space, Button, Modal, Form, Input, Switch } from 'ant-design-vue';

  import usePagination from '/@/hooks/usePagination';
  import { useMessage } from '/@/hooks/useMessage';
  import { getAdminListApi, editAdminUsertApi, delAdminUsertApi } from '/@/api/admin';

  const rules = {
    userName: [{ required: true, message: '请输入账号' }],
    userPassword: [{ required: true, message: '请输入密码' }],
  };

  export default defineComponent({
    name: 'AdminList',
    components: { Table, Space, Button, Modal, Form, FormItem: Form.Item, Input, Switch },
    setup() {
      const loading = ref<boolean>(false);
      const dataSource = ref<any[]>([]);
      const visible = ref<boolean>(false);
      const modalTitle = ref<string>('');
      const modalFormRef = ref<any>({});
      const modalInfo = ref<any>({});
      const modalLoading = ref<boolean>(false);

      const { pagination, onPageChange } = usePagination();
      const { createConfirm } = useMessage();

      const getList = () => {
        const { pageSize, current } = pagination;

        loading.value = true;
        getAdminListApi({ pageNum: current, pageSize })
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

      // 翻页
      const onTableChange = (pagination) => {
        onPageChange(pagination);
        getList();
      };

      const onAdd = () => {
        modalTitle.value = '新增';
        visible.value = true;
      };

      const onDelete = (record) => {
        createConfirm({
          iconType: 'warning',
          title: '删除确认?',
          content: '删除后不能恢复，确定要删除吗',
          onOk: async () => {
            delAdminUsertApi({ id: record.id }).then(() => {
              getList();
            });
          },
        });
      };

      // 编辑
      const onEdit = (record) => {
        modalTitle.value = '编辑';
        modalInfo.value = { ...record };
        visible.value = true;
      };

      const handleCancel = () => {
        modalTitle.value = '';
        modalInfo.value = {};
        visible.value = false;
      };

      const handleOk = () => {
        modalFormRef.value.validate().then(() => {
          const { id, userName, userPassword, isManager } = modalInfo.value;
          let params = {
            userName: userName.trim(),
            userPassword: userPassword.trim(),
            isManager: !!isManager,
          } as any;
          id && (params.id = id);

          editAdminUsertApi(params).then(() => {
            handleCancel();
            getList();
          });
        });
      };

      onMounted(() => {
        getList();
      });

      return {
        loading,
        dataSource,
        pagination,
        onTableChange,
        columns: [
          {
            title: '管理员id',
            dataIndex: 'id',
          },
          {
            title: '账号',
            dataIndex: 'userName',
          },
          {
            title: '密码',
            dataIndex: 'userPassword',
          },
          {
            title: '操作',
            dataIndex: 'operation',
            slots: { customRender: 'operation' },
          },
        ],
        onAdd,
        onEdit,
        visible,
        modalTitle,
        modalFormRef,
        modalInfo,
        modalLoading,
        rules,
        handleOk,
        handleCancel,
        onDelete,
      };
    },
  });
</script>

<style lang="less">
  .admin-list {
    margin: 20px;
    padding: 30px;
    background: #fff;
  }
</style>
