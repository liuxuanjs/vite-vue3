export interface Gender {
  value: number;
  label: string;
}

export const genderEnums: Gender[] = [
  { value: 1, label: '全部' },
  { value: 2, label: '小哥哥' },
  { value: 3, label: '小姐姐' },
  { value: 4, label: '其他' },
];
