import ActionGroup from '/@/components/ActionGroup/index.vue';

export function createDanceListColumns({
  handleDelisting,
  handleEdit,
  handleDelete,
}: {
  handleDelisting: Fn;
  handleEdit: Fn;
  handleDelete: Fn;
}) {
  return [
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
      customRender: ({ record }) => {
        const actions = [
          { title: '下架', onClick: () => handleDelisting(record) },
          { title: '编辑', onClick: () => handleEdit(record) },
          { title: '删除', onClick: () => handleDelete(record), danger: true },
        ];

        return <ActionGroup actions={actions} defaultAction />;
      },
    },
  ];
}
