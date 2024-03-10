import {
  addBusinessDay,
  addBusinessDayByUnit,
  diffBusinessDay,
} from '../../../../../../src/utilities/helper';
import {
  ITEM_DATE_FORMAT,
  MARGIN_BOTTOM,
  MARGIN_TOP,
  MAX_SPEED,
  SPEED_MODIFIER,
  STARTING_POINT,
  WORKLOAD_ROW_HEIGHT,
} from './constant';
import { store } from '../../../../../../src/configs/store';
import dayjs from 'dayjs';
import { RangeDate } from './type';
import _ from 'lodash';

export const mergeListsOrder = (list1: string[], list2: string[]) => {
  let k = 0;
  return list1.map((item) => (list2.includes(item) ? list2[k++] : item));
};

export const dayIndexToDay = (dayIndex: number, isHidden?: boolean) => {
  const isHiddenWeekend = isHidden ?? (store.getState().settings.isHiddenWeekend || false);
  if (isHiddenWeekend) {
    return addBusinessDay(STARTING_POINT, dayIndex);
  }
  return STARTING_POINT.clone().add(dayIndex, 'days');
};
export const weekIndexToDay = (weekIndex: number) => {
  const isHiddenWeekend = store.getState().settings.isHiddenWeekend || false;
  if (isHiddenWeekend) {
    return addBusinessDayByUnit(STARTING_POINT, weekIndex, 'week');
  }
  return STARTING_POINT.clone().add(weekIndex, 'week');
};

export const dayIndexToWeekIndex = (dayIndex: number) => {
  return STARTING_POINT.clone().add(dayIndex, 'days').startOf('week').diff(STARTING_POINT, 'week');
};

export const isDayOverlapped = (a: RangeDate, b: RangeDate) => {
  return a && b && !(a.to! < b.from! || b.to! < a.from!);
};

export const getIndexArray = (startIndex: number, endIndex: number) => {
  const result = [];
  for (let i: number = startIndex; i <= endIndex; i++) {
    result.push(i);
  }
  return result;
};

export const getWeekIndex = (targetDate: Date) => {
  return dayjs(targetDate).startOf('week').diff(STARTING_POINT, 'week');
};

export const getDayIndex = (targetDate: string | Date) => {
  const isHiddenWeekend = store.getState().settings.isHiddenWeekend;

  if (isHiddenWeekend) {
    return diffBusinessDay(STARTING_POINT, dayjs(targetDate));
  }
  return dayjs(targetDate).diff(STARTING_POINT, 'days');
};

const dimensionCache: Record<string, any> = {};
export const getHorizontalDimensions = (range?: any) => {
  const isHiddenWeekend = store.getState().settings.isHiddenWeekend;

  if (!range) return { x: 0, w: 0 };
  const { from, to } = range;
  const key = from + '_' + to + (isHiddenWeekend ? '_hidden' : '');
  if (dimensionCache[key]) {
    return dimensionCache[key];
  }
  if (!from || !to) return { x: 0, w: -1 };

  const start = isHiddenWeekend
    ? diffBusinessDay(STARTING_POINT, dayjs(from).format(ITEM_DATE_FORMAT)) - 1
    : dayjs(from).diff(STARTING_POINT, 'days');
  const end = isHiddenWeekend
    ? diffBusinessDay(STARTING_POINT, dayjs(to).format(ITEM_DATE_FORMAT)) - 1
    : dayjs(to).diff(STARTING_POINT, 'days');
  const w = isHiddenWeekend
    ? Math.abs(
        diffBusinessDay(dayjs(from).format(ITEM_DATE_FORMAT), dayjs(to).format(ITEM_DATE_FORMAT)),
      )
    : Math.abs(end - start) + 1;

  const dimension = {
    x: Math.min(start, end),
    w: w,
  };
  dimensionCache[key] = { ...dimension };
  return dimension;
};

export function getLeftSpeed(cornerWidth: number, clientX: number, enabled: boolean) {
  if (!enabled) return 0;
  const boundary = cornerWidth + 50;
  if (clientX >= boundary) return 0;
  return (clientX - boundary) / SPEED_MODIFIER;
}
export function getRightSpeed(cornerWidth: number, clientX: number, enabled: boolean) {
  if (!enabled) return 0;
  const boundary = window.innerWidth - 100;
  if (clientX < boundary) return 0;
  return (clientX - boundary) / SPEED_MODIFIER;
}
export function getTopSpeed(clientY: number, enabled: boolean) {
  if (!enabled) return 0;
  const boundary = 100;
  if (clientY >= boundary) return 0;
  return (clientY - boundary) / SPEED_MODIFIER;
}
export function getBottomSpeed(clientY: number, enabled: boolean) {
  if (!enabled) return 0;
  const boundary = window.innerHeight - 100;
  if (clientY < boundary) return 0;
  return (clientY - boundary) / SPEED_MODIFIER;
}
export function clampSpeed(speed: number) {
  return _.clamp(speed, -MAX_SPEED, MAX_SPEED);
}

//This get Cell height if working hour is smaller than cell height
export const getActualRowHeight = (
  rowHeight: number,
  heightPerHour: number,
  cellBaseHeight: number,
  isWorkloadMode: boolean,
) => {
  return Math.max(rowHeight * heightPerHour + MARGIN_BOTTOM + MARGIN_TOP, cellBaseHeight);
};

export const getRowY = (
  rows: any,
  rowId: number,
  _order: number[],
  heightPerHour: number,
  cellBaseHeight: number,
  isWorkloadMode: boolean,
  workloadRow: Record<number, { isNotCollapse: boolean }>,
) => {
  let y = 0;

  for (const rid of _order) {
    if (rid === rowId) break;
    const row = rows[rid];
    y +=
      isWorkloadMode && !workloadRow[rid]?.isNotCollapse
        ? WORKLOAD_ROW_HEIGHT
        : getActualRowHeight(row.height, heightPerHour, cellBaseHeight, isWorkloadMode);
  }
  return y;
};
