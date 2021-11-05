export interface Status {
  value: string;
  label: string;
}

export const statusList: Status[] = [
  { value: '', label: '全部' },
  { value: '0', label: '未审核' },
  { value: '3', label: '已下架' },
];
