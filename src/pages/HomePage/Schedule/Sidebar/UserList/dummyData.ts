import { generateUUID } from '@base/utils/uuid';

interface User {
  id: string;
  name: string;
  workHour: number;
}

export const dummyData: User[] = [
  {
    id: generateUUID(),
    name: 'Hà Tuấn Lâm',
    workHour: 0,
  },
  {
    id: generateUUID(),
    name: 'Nguyễn Ngọc Quang',
    workHour: 40,
  },
  {
    id: generateUUID(),
    name: 'Lê Minh Nhật',
    workHour: 20,
  },
  {
    id: generateUUID(),
    name: 'Trương Gia Huy',
    workHour: 0,
  },
];
