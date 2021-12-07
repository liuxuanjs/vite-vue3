export interface Status {
  value: string;
  label: string;
}

export const statusList: Status[] = [
  { value: '', label: '全部' },
  { value: '1', label: '未审核' },
  { value: '0', label: '已下架' },
];

export const statusEnum: Status[] = [
  { value: '0', label: '已下架' },
  { value: '1', label: '未审核' },
  { value: '2', label: '审核不通过' },
  { value: '3', label: '审核通过' },
  { value: '4', label: '已上架' },
];
