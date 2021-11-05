export interface Status {
  value: number;
  label: string;
}

export const statusList: Status[] = [
  { value: 0, label: '全部' },
  { value: 1, label: '已禁用' },
];
