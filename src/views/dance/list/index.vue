<template>
  <div class="dance-list">
    <DanceListSidebar
      :menuList="typeList"
      :selectedMenuKey="formState.mock4"
      :onchange="onchange"
    />
    <div class="dance-list-main">
      <div class="dance-list-section">
        <Form ref="formRef" :model="formState" layout="inline">
          <FormItem :style="{ minWidth: '112px' }">
            <Select v-model:value="formState.mock1" placeholder="请选择舞曲难度">
              <SelectOption v-for="option in difficultyEnum" :key="option.key">
                {{ option.value }}
              </SelectOption>
            </Select>
          </FormItem>
          <FormItem :style="{ minWidth: '112px' }">
            <Select v-model:value="formState.mock2" placeholder="请选择舞曲风格">
              <SelectOption v-for="option in styleEnum" :key="option.key">
                {{ option.value }}
              </SelectOption>
            </Select>
          </FormItem>
          <div class="dance-list-form-item">
            <FormItem>
              <InputSearch
                v-model:value="formState.mock3"
                placeholder="请输入歌曲名或作者"
                @search="onSearch"
              >
                <template #enterButton>
                  <Button>搜索</Button>
                </template>
              </InputSearch>
            </FormItem>
          </div>
        </Form>
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
  import { defineComponent, reactive, ref, UnwrapRef, toRefs, createVNode } from 'vue';
  import { Form, Select, Input, Button, Table, Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

  import usePagination from '/@/hooks/usePagination';
  import { difficultyEnum } from '/@/enums/dance/difficulty';
  import { styleEnum } from '/@/enums/dance/style';
  import { typeList } from '/@/enums/dance/type';
  import { createDanceListColumns } from './data';
  import DanceListSidebar from './Sidebar.vue';

  interface FormState {
    mock1?: number;
    mock2?: number;
    mock3?: string;
    mock4: number;
  }

  interface TableStateItem {
    a?: string;
  }

  interface TableState {
    loading: boolean;
    dataSource: TableStateItem[];
  }

  export default defineComponent({
    name: 'UserList',
    components: {
      Table,
      Form,
      FormItem: Form.Item,
      Select,
      SelectOption: Select.Option,
      InputSearch: Input.Search,
      Button,
      DanceListSidebar,
    },
    setup() {
      const { pagination, onPageChange } = usePagination();
      const formRef = ref();
      const formState: UnwrapRef<FormState> = reactive({ mock4: 1 });
      const tableState = reactive<TableState>({ loading: false, dataSource: [{}] });

      const getList = () => {};

      const onchange = (v: number) => {
        formState.mock4 = v;
      };

      const onSearch = () => {
        console.log('formState===', formState);
      };

      /**
       * 下架操作
       */
      const handleDelisting = (record) => {
        console.log('record===', record);
      };

      /**
       * 编辑操作
       */
      const handleEdit = (record) => {
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

      const onTableChange = (pagination) => {
        onPageChange(pagination);
        getList();
      };

      const columns = createDanceListColumns({ handleDelisting, handleEdit, handleDelete });

      return {
        ...toRefs(tableState),
        onchange,
        formRef,
        formState,
        onSearch,
        columns,
        pagination,
        onTableChange,
        typeList,
        styleEnum,
        difficultyEnum,
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
