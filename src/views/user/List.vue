<template>
  <FlexWrapper
    class="user-list"
    :menuList="typeList"
    :selectedMenuKey="formState.mock4"
    @change-menu="onchange"
  >
    <template #rigth>
      <div class="user-list-section">
        <Form ref="formRef" :model="formState" layout="inline">
          <FormItem :style="{ minWidth: '112px' }">
            <Select v-model:value="formState.mock1" placeholder="请选择性别">
              <SelectOption v-for="option in genderEnums" :key="option.key">
                {{ option.value }}
              </SelectOption>
            </Select>
          </FormItem>
          <FormItem :style="{ minWidth: '112px' }">
            <Select v-model:value="formState.mock2" placeholder="请选择年龄">
              <SelectOption v-for="option in ageEnums" :key="option.key">
                {{ option.value }}
              </SelectOption>
            </Select>
          </FormItem>
          <div class="user-list-form-item">
            <FormItem>
              <InputSearch
                v-model:value="formState.mock3"
                placeholder="请输入用户名"
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
      <div class="user-list-section">
        <Table
          :loading="loading"
          :dataSource="dataSource"
          :columns="columns"
          :pagination="pagination"
          row-key="id"
          @change="onTableChange"
        >
          <template #operation>
            <Button v-if="formState.mock4 === 1">禁用</Button>
            <Button v-if="formState.mock4 === 2" type="primary" ghost>解禁</Button>
            <Button class="ml10" danger @click="onDelete">删除</Button>
          </template>
        </Table>
      </div>
    </template>
  </FlexWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, UnwrapRef, toRefs, createVNode } from 'vue';
  import { Form, Select, Input, Button, Table, Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

  import usePagination from '../../hooks/usePagination';
  import { genderEnums } from '/@/enums/user/gender';
  import { ageEnums } from '/@/enums/user/age';
  import { typeList } from '/@/enums/user/type';
  import { userListTableColumns } from './data';
  import FlexWrapper from '/@/components/FlexWrapper/index.vue';

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
      FlexWrapper,
      Table,
      Form,
      FormItem: Form.Item,
      Select,
      SelectOption: Select.Option,
      InputSearch: Input.Search,
      Button,
    },
    setup() {
      const { pagination, onPageChange } = usePagination();
      const formRef = ref();
      const formState: UnwrapRef<FormState> = reactive({ mock4: 1 });
      const tableState = reactive<TableState>({ loading: false, dataSource: [] });

      const getList = () => {};

      const onchange = (v: number) => {
        formState.mock4 = v;
      };

      const onSearch = () => {
        console.log('formState===', formState);
      };

      /**
       * 删除操作
       */
      const onDelete = () => {
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

      return {
        ...toRefs(tableState),
        onchange,
        formRef,
        formState,
        onSearch,
        onDelete,
        columns: userListTableColumns,
        pagination,
        onTableChange,
        typeList,
        genderEnums,
        ageEnums,
      };
    },
  });
</script>

<style lang="less">
  .user-list-section {
    margin: 20px;
  }

  .user-list-search {
    display: flex;
    justify-content: space-between;
  }

  .user-list-form-item {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    .ant-form-item {
      margin: 0;
    }
  }

  .ml10 {
    margin-left: 10px;
  }
</style>
