import type { Ref } from 'vue';

import { Button } from 'ant-design-vue';

import { difficultyEnum } from '/@/enums/dance/difficulty';
import { setArrToObj } from '/@/utils';

import ActionGroup from '/@/components/ActionGroup/index.vue';
import Avatar from '/@/components/Avatar/index.vue';

const difficultyMap = setArrToObj(difficultyEnum, 'value');

export function createDanceListColumns({
  status,
  handleEdit,
  handleDelete,
  handleEditDance,
}: {
  status: Ref<string>;
  handleEdit: Fn;
  handleDelete: Fn;
  handleEditDance: Fn;
}) {
  return [
    {
      title: '舞曲ID',
      dataIndex: 'id',
    },
    {
      title: '舞曲封面',
      dataIndex: 'coverUrl',
      customRender: ({ record }) => {
        return <Avatar class="music-image" src={record.coverUrl} shape="" />;
      },
    },
    {
      title: '歌曲名',
      dataIndex: 'musicName',
    },
    {
      title: '歌曲作者',
      dataIndex: 'musicAuthor',
    },
    {
      title: '舞蹈作者',
      dataIndex: 'danceAuthor',
    },
    {
      title: '时长',
      dataIndex: 'time',
    },
    status.value !== '3' && {
      title: '难度',
      dataIndex: 'difficulty',
      customRender: ({ record }) =>
        difficultyMap[record.difficulty] && difficultyMap[record.difficulty].label,
    },
    status.value !== '3' && {
      title: '风格',
      dataIndex: 'style',
    },
    status.value !== '3' && {
      title: '消耗卡路里',
      dataIndex: 'calories',
    },
    {
      title: '上传用户',
      dataIndex: 'uploadUserName',
    },
    status.value === '3' && {
      title: '上传时间',
      dataIndex: 'uploadTime',
    },
    {
      title: '上架时间',
      dataIndex: 'mock12',
    },
    {
      title: '被跳次数',
      dataIndex: 'danceTime',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      customRender: ({ record }) => {
        // status 0未审核 1已审核 2已上架 3已下架
        const { status: currentStatus } = record;

        if (currentStatus === 0) {
          return <Button onClick={() => handleEditDance(record, { status: '2' })}>审核</Button>;
        }

        const actions = [
          currentStatus === 3 && {
            title: '上架',
            onClick: () => handleEditDance(record, { status: '2' }),
          },
          currentStatus === 2 && {
            title: '下架',
            onClick: () => handleEditDance(record, { status: '3' }),
          },
          { title: '编辑', onClick: () => handleEdit(record) },
          { title: '删除', onClick: () => handleDelete(record), danger: true },
        ].filter(Boolean);

        return <ActionGroup actions={actions} defaultAction />;
      },
    },
  ].filter(Boolean);
}
