export interface Gender {
  value: string;
  label: string;
}

export const genderEnums: Gender[] = [
  { value: '', label: '全部' },
  { value: '小哥哥', label: '小哥哥' },
  { value: '小姐姐', label: '小姐姐' },
  { value: '其他', label: '其他' },
];
