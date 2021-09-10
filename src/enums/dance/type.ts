export interface Type {
  value: number;
  label: string;
}

export const typeList: Type[] = [
  { value: 1, label: '全部' },
  { value: 2, label: '未审核' },
  { value: 3, label: '已下架' },
];
