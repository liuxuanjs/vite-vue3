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
