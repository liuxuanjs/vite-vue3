export interface Difficulty {
  value: number;
  label: string;
}

export const difficultyEnum: Difficulty[] = [
  { value: 0, label: '全部' },
  { value: 1, label: '1星' },
  { value: 2, label: '2星' },
  { value: 3, label: '3星' },
  { value: 4, label: '4星' },
  { value: 5, label: '5星' },
];
