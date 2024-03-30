import dayjs from 'dayjs';

export function isWeekend(date: dayjs.Dayjs) {
  const day = date.day();
  return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
}
