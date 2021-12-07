import type { Ref } from 'vue';
import type { ActionItem } from '/@/components/ActionGroup/props';

import { Button } from 'ant-design-vue';

import { statusEnum } from '/@/enums/dance/status';
import { difficultyEnum } from '/@/enums/dance/difficulty';
import { setArrToObj } from '/@/utils';

import ActionGroup from '/@/components/ActionGroup/index.vue';
import Avatar from '/@/components/Avatar/index.vue';

const difficultyMap = setArrToObj(difficultyEnum, 'value');
const statusMap = setArrToObj(statusEnum, 'value');

export function createDanceListColumns({
  status,
  onAudit,
  handleEdit,
  handleDelete,
  handleEditDance,
}: {
  status: Ref<string>;
  onAudit: Fn;
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
      // customRender: ({ record }) => record.time ? moment.utc(record.time).format('HH:mm') : '',
    },
    status.value !== '3' && {
      title: '难度',
      dataIndex: 'difficulty',
      customRender: ({ record }) => difficultyMap[record.difficulty]?.label,
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
      dataIndex: 'createTIm',
    },
    {
      title: '被跳次数',
      dataIndex: 'danceTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      customRender: ({ record }) => statusMap[record.status]?.label,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      customRender: ({ record }) => {
        // status 0已下架 1未审核 2审核不通过 3审核通过 4已上架
        const { status: currentStatus } = record;

        // 未审核 和 审核不通过 的只有审核操作
        if (currentStatus === 1 || currentStatus === 2) {
          return <Button onClick={() => onAudit(record)}>审核</Button>;
        }

        const actions = [
          // 已下架 和 审核通过 的可以上架
          (currentStatus === 0 || currentStatus === 3) && {
            title: '上架',
            onClick: () => handleEditDance(record, { status: '4' }),
          },
          // 已上架的 可以下架
          currentStatus === 4 && {
            title: '下架',
            onClick: () => handleEditDance(record, { status: '0' }),
          },
          { title: '编辑', onClick: () => handleEdit(record) },
          { title: '删除', onClick: () => handleDelete(record), danger: true },
        ].filter(Boolean) as ActionItem[];

        return <ActionGroup actions={actions} defaultAction />;
      },
    },
  ].filter(Boolean);
}
