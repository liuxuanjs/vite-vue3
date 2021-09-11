import type { Ref } from 'vue';

import { Space, Button } from 'ant-design-vue';

export function createUserListColumns({
  selectedMenuKey,
  handleDisable,
  handleRelieve,
  handleDelete,
}: {
  selectedMenuKey: Ref<number>;
  handleDisable: Fn;
  handleRelieve: Fn;
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
      title: '舞者等级',
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
        return (
          <Space>
            {selectedMenuKey.value === 1 && (
              <Button onClick={() => handleDisable(record)}>禁用</Button>
            )}
            {selectedMenuKey.value === 2 && (
              <Button type="primary" ghost onClick={() => handleRelieve(record)}>
                解禁
              </Button>
            )}
            <Button class="ml10" danger onClick={() => handleDelete(record)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
}
