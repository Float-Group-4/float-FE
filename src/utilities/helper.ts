import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
// @ts-ignore
import DurationParser, { DurationValidator } from 'js-duration-parser';
import { store } from '../configs/store';
import {
  ITEM_DATE_FORMAT,
  ITEM_MIN_HEIGHT,
} from '../pages/HomePage/Schedule/Board/common/constant';
import { dayIndexToDay, dayIndexToWeekIndex } from '../pages/HomePage/Schedule/Board/common/helper';
import { Item } from 'src/types/primitive/item.interface';

const durationParser = new DurationParser();
const durationValidator = new DurationValidator();
export const durationUtils: {
  compose: (second: number, ...args: any) => string;
  parse: (string: string, ...args: any) => number;
  validate: (string: string) => boolean;
} = {
  compose: (...args) => durationParser.compose(...args),
  parse: (...args) => durationParser.parse(...args) || 0,
  validate: (...args) => durationValidator.validate(...args),
};

export const isInDisplayRange = (
  timeRange: { to: string; from: string } | null | undefined,
  lowerBound: Dayjs,
  upperBound: Dayjs,
) => {
  if (!timeRange) return;
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isBetween);
  const start = dayjs(timeRange.from);
  const end = dayjs(timeRange.to);
  if (end.isBefore(lowerBound) || start.isAfter(upperBound)) return false;
  return (
    start.isBetween(lowerBound, upperBound) ||
    end.isBetween(lowerBound, upperBound) ||
    (start.isSameOrBefore(lowerBound) && end.isSameOrAfter(upperBound))
  );
};
export const numberOfNonWorkingDay = (timeRange: { from: number; to: number }) => {
  const startW = dayIndexToWeekIndex(timeRange.from);
  const endW = dayIndexToWeekIndex(timeRange.to);
  let nonWork = 0;
  const startD = dayIndexToDay(timeRange.from).format('ddd');
  const endD = dayIndexToDay(timeRange.to).format('ddd');
  if (endW - startW > 0) {
    nonWork += 2 * (endW - startW);
  }

  if (startD === 'Sun') nonWork++;
  if (endD === 'Sat') nonWork++;

  return nonWork;
};

export const isNonWorkingDay = (dayIndex: number) => {
  const _day = dayIndexToDay(dayIndex).format('ddd');
  const nonWorkingDay: string[] = ['Sat', 'Sun'];
  if (store.getState().settings.isOffWeekend) return nonWorkingDay.includes(_day);
  else return false;
};

export const convertMinuteToHHmm = (min: number) => {
  const hour = Math.floor(min / 60);
  const minute = min % 60;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

export const convertHHmmToMinute = (HHmm: string) => {
  const [hour, minute] = HHmm.split(':');
  return Number(hour) * 60 + Number(minute);
};

export const convertMinuteToHumanRead = (min: number) => {
  const hour = Math.floor(min / 60);
  const minute = Math.round(Math.abs(min % 60));
  return `${hour.toString()}h ${minute ? minute.toString() + 'm' : ''}`;
};

export const hasMapping = (mappingFieldObject: any) => {
  let result = false;
  for (const b in mappingFieldObject) {
    if (
      mappingFieldObject[b]?.assignees &&
      mappingFieldObject[b]?.timeline &&
      mappingFieldObject[b]?.hour
    ) {
      result = true;
      break;
    }
  }
  return result;
};

// ===== Begin hide weekend function ====

export const diffBusinessDay: (
  leftDate: string | Dayjs,
  rightDate: string | Dayjs,
  compare?: '[]' | '()' | '(]' | '[)',
  mode?: 'day' | 'week',
) => number = (leftDate, rightDate, compare = '()', mode = 'day') => {
  if (!leftDate || !rightDate) return 0;
  const left = dayjs(leftDate, ITEM_DATE_FORMAT);
  const right = dayjs(rightDate, ITEM_DATE_FORMAT);
  if (!left.isValid() || !right.isValid()) return 0;
  const leftPadding = compare[0] === '(' ? 1 : 0;
  const rightPadding = compare[1] === ')' ? 1 : 0;

  left.add(leftPadding, 'day');
  right.subtract(rightPadding, 'day');

  const first = left.clone().endOf('week'); // end of first week
  const last = right.clone().startOf('week'); // start of last week
  const days = (last.diff(first, 'days') * 5) / 7; // this will always multiply of 7
  let wfirst = first.day() - left.day(); // check first week
  if (left.day() == 0) --wfirst; // -1 if start with sunday
  let wlast = right.day() - last.day(); // check last week
  if (right.day() == 6) --wlast; // -1 if end with saturday

  let count = wfirst + Math.floor(days) + wlast;
  count = mode == 'day' ? count : Math.floor(count / 5);
  return right.isBefore(left) ? -count : count;
};

export const addBusinessDay: (startDate: string | Dayjs, days: number) => Dayjs = (
  startDate,
  days,
) => {
  const date: Dayjs = dayjs(startDate, ITEM_DATE_FORMAT);

  const dow = date.day();
  if (days >= 0) {
    //add days
    let daysToAdd = Math.abs(days);
    if (dow == 0) {
      daysToAdd++;
    }
    if (dow + daysToAdd >= 6) {
      const remainWorkDay = daysToAdd - (5 - dow);
      daysToAdd += 2;
      if (remainWorkDay > 5) {
        daysToAdd += 2 * Math.floor(remainWorkDay / 5);
        if (remainWorkDay % 5 == 0) {
          daysToAdd -= 2;
        }
      }
    }

    return date.add(daysToAdd, 'day');
  } else {
    // minus days
    let daysToSubtract = Math.abs(days);
    if (dow == 6) {
      daysToSubtract++;
    }
    if (dow - daysToSubtract <= 0) {
      const remainWorkDay = daysToSubtract - dow;
      daysToSubtract += 2;
      if (remainWorkDay > 5) {
        daysToSubtract += 2 * Math.floor(remainWorkDay / 5);
        if (remainWorkDay % 5 == 0) {
          daysToSubtract -= 2;
        }
      }
    }

    return date.subtract(daysToSubtract, 'day');
  }
};
export const addBusinessDayByUnit: (
  startDate: string | Dayjs,
  days: number,
  unit: 'day' | 'week',
) => Dayjs = (startDate, days, unit) => {
  switch (unit) {
    case 'day':
      return addBusinessDay(startDate, days);
    case 'week':
      return addBusinessDay(startDate, days * 5);

    default:
      return addBusinessDay(startDate, days);
  }
};

export const diffBusinessDayOffset: (
  leftIndex: number,
  rightIndex: number,
  compare?: '[]' | '()' | '(]' | '[)',
) => number = (leftIndex, rightIndex, compare = '()') => {
  const leftDate = dayIndexToDay(leftIndex);
  const rightDate = dayIndexToDay(rightIndex);
  return diffBusinessDay(leftDate, rightDate, compare) - 1;
};

export const getNumberOfBusinessDaysInMonth: (year: number, month: number) => number = (
  year,
  month,
) => {
  const lastDayOfMonth = dayjs().year(year).month(month).endOf('month');
  // const rootDate = dayjs(root, DEFAULT_DATE_FORMAT);
  // const firstDayOfMonth =
  //   rootDate.year() == year && rootDate.month() == month ? rootDate : dayjs().year(year).month(month).startOf("month");
  const firstDayOfMonth = dayjs().year(year).month(month).startOf('month');
  if (firstDayOfMonth.day() == 0) firstDayOfMonth.add(1, 'day');
  if (firstDayOfMonth.day() == 6) firstDayOfMonth.add(2, 'day');
  if (lastDayOfMonth.day() == 0) lastDayOfMonth.subtract(2, 'day');
  if (lastDayOfMonth.day() == 6) lastDayOfMonth.subtract(1, 'day');
  return diffBusinessDay(firstDayOfMonth, lastDayOfMonth, '[]');
};

export const isIncludedWeekend: (startDate: string, endDate: string) => boolean = (
  startDate,
  endDate,
) => {
  if (!startDate || !endDate) return true;
  const start = dayjs(startDate, ITEM_DATE_FORMAT);
  const end = dayjs(endDate, ITEM_DATE_FORMAT);
  if (!start.isValid() || !end.isValid()) return true;
  const diff = end.diff(start, 'day');
  if (start.isSame(end, 'day') && (start.day() == 0 || start.day() == 6)) {
    return true;
  }

  if (diff < 0) return true;
  if (diff == 0) {
    if (start.day() == 0 || start.day() == 6) return true;
  }
  if (diff == 1) {
    if (start.day() == 6 && end.day() == 0) return true;
  }
  return false;
};

export const getFirstBusinessDayInMonth: (day: string, isHidden: boolean) => Dayjs = (
  day,
  isHidden,
) => {
  const date = dayjs(day, ITEM_DATE_FORMAT);
  let firstDayOfMonth = date.startOf('month');
  if (!isHidden) return firstDayOfMonth;
  if (firstDayOfMonth.day() == 0) firstDayOfMonth = firstDayOfMonth.add(1, 'day');
  if (firstDayOfMonth.day() == 6) firstDayOfMonth = firstDayOfMonth.add(2, 'day');
  return firstDayOfMonth;
};
export const getLastBusinessDayInMonth: (day: string, isHidden: boolean) => Dayjs = (
  day,
  isHidden,
) => {
  const date = dayjs(day, ITEM_DATE_FORMAT);
  let lastDayOfMonth = date.endOf('month');
  if (!isHidden) return lastDayOfMonth;
  if (lastDayOfMonth.day() == 0) lastDayOfMonth = lastDayOfMonth.subtract(2, 'day');
  if (lastDayOfMonth.day() == 6) lastDayOfMonth = lastDayOfMonth.subtract(1, 'day');
  return lastDayOfMonth;
};

export const getFirstBusinessDayInWeek: (day: string, isHidden: boolean) => Dayjs = (
  day,
  isHidden,
) => {
  const date = dayjs(day, ITEM_DATE_FORMAT);
  let firstDayOfWeek = date.startOf('week');
  if (!isHidden) return firstDayOfWeek;
  if (firstDayOfWeek.day() == 0) firstDayOfWeek = firstDayOfWeek.add(1, 'day');
  if (firstDayOfWeek.day() == 6) firstDayOfWeek = firstDayOfWeek.add(2, 'day');
  return firstDayOfWeek;
};
export const getLastBusinessDayInWeek: (day: string, isHidden: boolean) => Dayjs = (
  day,
  isHidden,
) => {
  const date = dayjs(day, ITEM_DATE_FORMAT);
  let lastDayOfWeek = date.endOf('week');
  if (!isHidden) return lastDayOfWeek;
  if (lastDayOfWeek.day() == 0) lastDayOfWeek = lastDayOfWeek.subtract(2, 'day');
  if (lastDayOfWeek.day() == 6) lastDayOfWeek = lastDayOfWeek.subtract(1, 'day');
  return lastDayOfWeek;
};

export const standardizeHour = (item: Item, defaultHour: number, divisor: number) => {
  return item.hour
    ? Math.max(item.hour / divisor ?? 0, ITEM_MIN_HEIGHT)
    : Math.max(defaultHour, ITEM_MIN_HEIGHT);
};

export const getDivisor = () => {
  let divisor = 1;
  return divisor;
};

export const getContrastColor = (hexcolor: string) => {
  hexcolor = hexcolor.replace('#', '');
  const r = parseInt(hexcolor.slice(0, 2), 16);
  const g = parseInt(hexcolor.slice(2, 4), 16);
  const b = parseInt(hexcolor.slice(4), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#000000' : '#ffffff';
};
