export interface Age {
  value: number;
  label: string;
}

export const ageEnums: Age[] = [
  { value: 1, label: '全部' },
  { value: 2, label: '<18' },
  { value: 3, label: '18-25' },
  { value: 4, label: '25-32' },
  { value: 5, label: '32-40' },
  { value: 6, label: '40-50' },
  { value: 7, label: '>50' },
];

export const ageMap = {
  1: { min: 0, max: 100 },
  2: { min: 0, max: 18 },
  3: { min: 18, max: 25 },
  4: { min: 25, max: 32 },
  5: { min: 32, max: 40 },
  6: { min: 40, max: 50 },
  7: { min: 50, max: 100 },
};
