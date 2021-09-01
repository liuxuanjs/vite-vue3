<template>
  <FlexWrapper
    class="user-list"
    :menuList="menuList"
    :selectedMenuKey="formState.mock4"
    :onchange="onchange"
  >
    <template #left>
      <div> 12312 </div>
    </template>
    <template #rigth>
      <div class="user-list-section">
        <a-form ref="formRef" :model="formState" layout="inline">
          <a-form-item>
            <a-select v-model:value="formState.mock1" placeholder="请选择性别">
              <a-select-option v-for="option in []" :key="option.key">
                {{ option.value }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-select v-model:value="formState.mock2" placeholder="请选择年龄">
              <a-select-option v-for="option in []" :key="option.key">
                {{ option.value }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <div class="user-list-form-item">
            <a-form-item>
              <a-input-search
                v-model:value="formState.mock3"
                placeholder="请输入用户名"
                @search="onSearch"
              >
                <template #enterButton>
                  <a-button>搜索</a-button>
                </template>
              </a-input-search>
            </a-form-item>
          </div>
        </a-form>
      </div>
      <div class="user-list-section">
        <a-table :dataSource="dataSource" :columns="columns">
          <template #operation>
            <a-button v-if="formState.mock4 === 1">禁用</a-button>
            <a-button v-if="formState.mock4 === 2" type="primary" ghost>解禁</a-button>
            <a-button class="ml10" danger @click="onDelete">删除</a-button>
          </template>
        </a-table>
      </div>
    </template>
  </FlexWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, UnwrapRef, toRefs, createVNode } from 'vue';
  import { Form, Select, Input, Button, Table, Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

  import FlexWrapper from '/@/components/FlexWrapper/index.vue';

  interface FormState {
    mock1?: number;
    mock2?: number;
    mock3?: string;
    mock4: number;
  }

  export default defineComponent({
    name: 'UserList',
    components: {
      FlexWrapper,
      'a-table': Table,
      'a-form': Form,
      'a-form-item': Form.Item,
      'a-select': Select,
      'a-select-option': Select.Option,
      'a-input-search': Input.Search,
      'a-button': Button,
    },
    setup() {
      const state = reactive({
        menuList: [
          { key: 1, value: '全部' },
          { key: 2, value: '禁用' },
        ],
      });

      const formRef = ref();
      const formState: UnwrapRef<FormState> = reactive({ mock4: 1 });

      const onchange = (v: number) => {
        formState.mock4 = v;
      };

      const onSearch = () => {};

      /**
       * 删除操作
       */
      const onDelete = () => {
        Modal.confirm({
          title: '删除确认?',
          icon: createVNode(ExclamationCircleOutlined),
          content: '删除后不能恢复，确定要删除吗',
          cancelText: '取消',
          okText: '确认',
          okType: 'danger',
          onOk() {
            console.log('OK');
          },
        });
      };

      return {
        ...toRefs(state),
        onchange,
        formRef,
        formState,
        onSearch,
        onDelete,
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
            title: '用户id',
            dataIndex: 'mock10',
          },
          {
            title: '头像',
            dataIndex: 'mock11',
          },
          {
            title: '用户名',
            dataIndex: 'mock12',
          },
          {
            title: '舞者登记',
            dataIndex: 'mock13',
          },
          {
            title: '性别',
            dataIndex: 'mock14',
          },
          {
            title: '生日',
            dataIndex: 'mock15',
          },
          {
            title: '跳舞次数',
            dataIndex: 'mock16',
          },
          {
            title: '注册时间',
            dataIndex: 'mock17',
          },
          {
            title: '操作',
            dataIndex: 'operation',
            slots: { customRender: 'operation' },
          },
        ],
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
