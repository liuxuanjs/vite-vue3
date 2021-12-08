import { Space, Button } from 'ant-design-vue';
import moment from 'moment';

import Avatar from '/@/components/Avatar/index.vue';

export function createUserListColumns(handleEditUser: Fn, handleDelete: Fn) {
  return [
    {
      title: '用户id',
      dataIndex: 'id',
    },
    {
      title: '头像',
      dataIndex: 'profilePhoto',
      customRender: ({ record }) => (
        <Avatar class="customer-avatar" src={record.profilePhoto} type="C2C" />
      ),
    },
    {
      title: '用户名',
      dataIndex: 'nickName',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      customRender: ({ record }) =>
        record.birthday ? moment(record.birthday).format('YYYY-MM-DD') : '',
    },
    {
      title: '跳舞次数',
      dataIndex: 'danceCount',
    },
    {
      title: '注册时间',
      dataIndex: 'insertTime',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      customRender: ({ record }) => {
        return (
          <Space>
            {record.disable ? (
              <Button type="primary" ghost onClick={() => handleEditUser(record, false)}>
                解禁
              </Button>
            ) : (
              <Button onClick={() => handleEditUser(record, true)}>禁用</Button>
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
