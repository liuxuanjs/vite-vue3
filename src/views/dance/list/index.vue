<template>
  <div class="dance-list">
    <DanceListSidebar :menuList="statusList" :selectedKey="status" @change="handleSelect" />
    <div class="dance-list-main">
      <div class="dance-list-section">
        <SearchFilter
          ref="formRef"
          :loading="loading"
          :configs="filterConfigs"
          @onSearch="getList"
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

      <Modal
        v-model:visible="visible"
        title="编辑"
        :width="600"
        @cancel="handleCancel"
        @ok="handleOk"
      >
        <videoPlay v-if="modalInfo" width="auto" height="310.5px" :src="modalInfo.danceUrl" />
        <Form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" :style="{ marginTop: '24px' }">
          <FormItem name="mock1" label="难度">
            <Rate />
          </FormItem>
          <FormItem name="mock1" label="风格">
            <RadioGroup>
              <RadioButton value="a">日</RadioButton>
              <RadioButton value="b">周</RadioButton>
              <RadioButton value="c">月</RadioButton>
            </RadioGroup>
          </FormItem>
          <!-- <FormItem name="mock2">
            <Input v-model:value="formState.mock2" placeholder="密码" size="large" allowClear />
          </FormItem> -->
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, computed, toRefs, createVNode, onMounted } from 'vue';
  import { Table, Modal, Form, Rate, Radio } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

  import 'vue3-video-play/dist/style.css';
  import { videoPlay } from 'vue3-video-play';

  import { deleteDanceApi, getDanceListApi, updateDanceApi } from '/@/api/dance';
  import usePagination from '/@/hooks/usePagination';
  import { difficultyEnum } from '/@/enums/dance/difficulty';
  import { styleEnum } from '/@/enums/dance/style';
  import { statusList } from '/@/enums/dance/status';
  import { createDanceListColumns } from './data';
  import { getParams } from './adaptor';

  import DanceListSidebar from './Sidebar.vue';
  import SearchFilter from '/@/components/SearchFilter/index.vue';

  interface DanceData {
    records?: any[];
    current: number;
    total: number;
  }

  export default defineComponent({
    name: 'DanceList',
    components: {
      Table,
      DanceListSidebar,
      SearchFilter,
      Modal,
      videoPlay,
      Form,
      FormItem: Form.Item,
      Rate,
      RadioGroup: Radio.Group,
      RadioButton: Radio.Button,
    },
    setup() {
      const status = ref<string>('');
      const formRef = ref<any>({});
      const tableState = reactive({ loading: false as Boolean, dataSource: [] as any[] });
      const visible = ref<boolean>(false);
      const modalInfo = ref();

      const { pagination, onPageChange } = usePagination();

      const getList = () => {
        const params = getParams(pagination, formRef.value.formData, status.value);

        tableState.loading = true;

        getDanceListApi(params)
          .then((res: DanceData) => {
            const { current, total, records } = res || {};
            pagination.current = current;
            pagination.total = total;
            tableState.dataSource = records || [];
          })
          .finally(() => {
            tableState.loading = false;
          });
      };

      // 侧边栏选择
      const handleSelect = (v: string) => {
        status.value = v;
        pagination.current = 1;
        getList();
      };

      // 翻页
      const onTableChange = (pagination) => {
        onPageChange(pagination);
        getList();
        console.log(updateDanceApi);
      };

      // 更新舞曲状态
      // const handleEditDance = (record, status) => {
      //   updateDanceApi({ id: record.id, status }).then(() => {
      //     getList();
      //   });
      // };

      // 下架操作
      const handleDelisting = (record) => {
        console.log('record===', record);
      };

      // 编辑操作
      const handleEdit = (record) => {
        console.log('record===', record);
        visible.value = true;
        modalInfo.value = record;
      };

      // 删除操作
      const handleDelete = (record) => {
        Modal.confirm({
          title: '删除确认?',
          icon: createVNode(ExclamationCircleOutlined),
          content: '删除后不能恢复，确定要删除吗',
          okType: 'danger',
          onOk() {
            deleteDanceApi({ id: record.id }).then(() => {
              getList();
            });
          },
        });
      };

      /**
       * 审核操作
       */
      const handleAudit = (record) => {
        console.log('record===', record);
      };

      const handleOk = () => {};
      const handleCancel = () => {
        visible.value = false;
        modalInfo.value = null;
      };

      onMounted(() => {
        getList();
      });

      const columns = computed(() => {
        return createDanceListColumns({
          status,
          handleDelisting,
          handleEdit,
          handleDelete,
          handleAudit,
        });
      });

      const filterConfigs = computed(() => {
        return [
          {
            name: 'difficulty',
            type: 'select',
            placeholder: '请选择舞曲难度',
            options: difficultyEnum,
            formItemProps: { style: { minWidth: '140px' } },
            props: { showSearch: true },
          },
          {
            name: 'style',
            type: 'select',
            placeholder: '请选择舞曲风格',
            options: styleEnum,
            formItemProps: { style: { minWidth: '140px' } },
            props: { showSearch: true },
          },
          {
            name: 'name',
            type: 'inputSearch',
            placeholder: '请输入歌曲名或作者',
            formItemProps: { style: { flex: 1 } },
            props: {
              showSearch: true,
            },
          },
        ];
      });

      return {
        ...toRefs(tableState),
        status,
        statusList,
        formRef,
        filterConfigs,
        columns,
        pagination,
        visible,
        modalInfo,
        handleSelect,
        onTableChange,
        handleOk,
        handleCancel,
        getList,
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

    .music-image {
      width: 50px;
      height: 50px;
      flex-shrink: 0;
    }
  }
</style>
