import type { Ref } from 'vue';

import { Button } from 'ant-design-vue';

import ActionGroup from '/@/components/ActionGroup/index.vue';

export function createDanceListColumns({
  selectedMenuKey,
  handleDelisting,
  handleEdit,
  handleDelete,
  handleAudit,
}: {
  selectedMenuKey: Ref<number>;
  handleDelisting: Fn;
  handleEdit: Fn;
  handleDelete: Fn;
  handleAudit: Fn;
}) {
  return [
    {
      title: '舞曲ID',
      dataIndex: 'mock1',
    },
    {
      title: '舞曲封面',
      dataIndex: 'mock2',
    },
    {
      title: '歌曲名',
      dataIndex: 'mock3',
    },
    {
      title: '歌曲作者',
      dataIndex: 'mock4',
    },
    {
      title: '舞蹈作者',
      dataIndex: 'mock5',
    },
    {
      title: '时长',
      dataIndex: 'mock6',
    },
    selectedMenuKey.value !== 3 && {
      title: '难度',
      dataIndex: 'mock7',
    },
    selectedMenuKey.value !== 3 && {
      title: '风格',
      dataIndex: 'mock8',
    },
    selectedMenuKey.value !== 3 && {
      title: '消耗卡路里',
      dataIndex: 'mock9',
    },
    {
      title: '上传用户',
      dataIndex: 'mock10',
    },
    selectedMenuKey.value === 3 && {
      title: '上传时间',
      dataIndex: 'mock11',
    },
    {
      title: '上架时间',
      dataIndex: 'mock12',
    },
    {
      title: '被跳次数',
      dataIndex: 'mock13',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      customRender: ({ record }) => {
        if (selectedMenuKey.value === 3) {
          return <Button onClick={() => handleAudit(record)}>审核</Button>;
        }

        const actions = [
          { title: '下架', onClick: () => handleDelisting(record) },
          { title: '编辑', onClick: () => handleEdit(record) },
          { title: '删除', onClick: () => handleDelete(record), danger: true },
        ].filter(Boolean);

        return <ActionGroup actions={actions} defaultAction />;
      },
    },
  ].filter(Boolean);
}
