import { createAsyncThunk } from '@reduxjs/toolkit';
import { cloneDeep, uniq } from 'lodash';
import { RootState } from '../../configs/store';
import {
  GAP_BETWEEN_ITEM,
  ITEM_MIN_HEIGHT,
  STARTING_POINT,
} from '../../pages/HomePage/Schedule/Board/common/constant';
import {
  getHorizontalDimensions,
  isDayOverlapped,
} from '../../pages/HomePage/Schedule/Board/common/helper';
import { Item } from '../../types/primitive/item.interface';
import { standardizeHour } from '../../utilities/helper';
import moment from 'moment';

export const buildAllRows = createAsyncThunk(
  'schedule/buildAllRows',
  (_: any, { getState, dispatch }) => {
    const state: RootState = getState() as RootState;
    const rowMap = state.general.rowMap;
    const allRowIds = Object.keys(rowMap);
    dispatch(buildRows(allRowIds));
  },
);

export const buildRows = createAsyncThunk(
  'schedule/buildRow',
  (rowIds: string[], { getState, dispatch }) => {
    const state: RootState = getState() as RootState;

    const { itemsById, rowMap, usersById } = state.general;
    const displayingWeeks = state.schedule.displayingWeeks;
    const isHiddenWeekend = state.settings.isHiddenWeekend;
    const defaultMinute = state.settings.defaultMinute;
    const defaultHour = defaultMinute / 60;
    const timeRange = state.scheduleMeasurement.timeRange;
    const uniqueListId = rowIds
      .map((id) => {
        return id;
      })
      .flat();
    const uniqueId: string[] = uniq(uniqueListId);
    const plannedItems = Object.keys(itemsById);
    const workHourFormat = state.settings.workHourFormat;
    const isDividedByDays = workHourFormat == 1 ? true : false; // Total Hours will be divided by days within timeline
    const isDividedByPeople = state.settings.isDividedByPeople;
    const isOffWeekend = state.settings.isOffWeekend;
    const lowerBound = STARTING_POINT.clone().add(displayingWeeks[0], 'weeks');
    const upperBound = STARTING_POINT.clone()
      .add(displayingWeeks.at(-1) as number, 'weeks')
      .endOf('week');

    const rowOverall = uniqueId.map((id: string) => {
      const row = cloneDeep(rowMap[id]);
      row.height = 0;
      row.itemPosition = {};

      row.items = plannedItems.filter((itemId: string) => {
        // check if exactly this task avalable for this user id
        const userIds = itemsById[itemId].userIds;
        return userIds.includes(id);
      });

      row.items.sort((id1: string, id2: string) => {
        const itemA = itemsById[id1];
        const itemB = itemsById[id2];

        const { x: xA, w: wA } = getHorizontalDimensions({
          from: itemA.startDate,
          to: itemA.endDate,
        });
        const { x: xB, w: wB } = getHorizontalDimensions({
          from: itemB.startDate,
          to: itemB.endDate,
        });

        if (wA > wB) return -1;
        if (wA < wB) return 1;

        if (xA < xB) return -1;
        if (xA > xB) return 1;

        // if (itemA.created_at > itemB.created_at) return -1;
        // if (itemA.created_at < itemB.created_at) return 1;

        return 0;
      });
      row.dayCell = {};

      const cellHeight: Record<string, number> = {};
      const dayCell: Record<
        number,
        {
          dayCapacity: number;
          firstOTItem: Item;
          isStable: boolean;
          overTimeDisplay: number;
        }
      > = {};
      const itemPosition: Record<string, number> = {};

      row.items.forEach((tid: number, idx: number, items: any) => {
        const item = itemsById[tid];
        const { x, w } = getHorizontalDimensions({ from: item.startDate, to: item.endDate });
        console.log(x, w);
        /* ---------------------------- Calculate height ---------------------------- */
        for (let i = x; i < x + w; i++) {
          const hour = standardizeHour(item, item.hour ?? defaultHour, 1);
          dayCell[i] ??= { dayCapacity: 0, firstOTItem: item, isStable: false, overTimeDisplay: 0 };
          dayCell[i].dayCapacity += item.hour / 1 || defaultHour;
          if (dayCell[i].dayCapacity > defaultHour && !dayCell[i].isStable) {
            dayCell[i].firstOTItem = item;
            dayCell[i].isStable = true;
            dayCell[i].overTimeDisplay = Math.max(
              defaultHour - dayCell[i].dayCapacity,
              ITEM_MIN_HEIGHT,
            );
          }

          cellHeight[i] ??= 0;

          cellHeight[i] += hour;
          row.height = Math.max(cellHeight[i], row.height);
        }

        row.dayCell = dayCell;

        /* ------------------------------- Calculate y ------------------------------ */
        itemPosition[tid] ??= 0;
        const itemHour = Math.max(defaultHour, item.hour / 1 ?? defaultHour);

        for (let i = 0; i < idx; i++) {
          const otherItem = itemsById[items[i]];

          const otherItemHours = standardizeHour(otherItem, defaultHour, 1);
          const otherItemTimeline = otherItem.startDate && otherItem.endDate;
          if (!otherItemTimeline) continue;

          if (
            isDayOverlapped(
              {
                from: moment(item.startDate, 'YYYY-MM-DD').toDate(),
                to: moment(item.endDate, 'YYYY-MM-DD').toDate(),
              },
              {
                from: moment(otherItem.startDate, 'YYYY-MM-DD').toDate(),
                to: moment(otherItem.endDate, 'YYYY-MM-DD').toDate(),
              },
            )
          ) {
            itemPosition[tid] = Math.max(
              itemPosition[tid],
              itemPosition[otherItem.id] + otherItemHours + GAP_BETWEEN_ITEM,
            );
          }
          row.height = Math.max(
            itemPosition[tid] + Math.max(itemHour, ITEM_MIN_HEIGHT),
            row.height,
          );
          row.height = Math.max(row.height, itemPosition[otherItem.id] + otherItemHours);
        }
      });
      row.itemPosition = itemPosition;

      return row;
    });
    return rowOverall;
  },
);

// export const calculateScheduledTime = createAsyncThunk(
//   'schedule/calculateSchedule',
//   (rowIds: string[], { getState }) => {
//     const state: RootState = getState() as RootState;
//     // const defaultMinute = state.settings.defaultMinute;
//     const mappedFieldBoards = { ...mainBoardMappingFields, ...subBoardMappingFields };
//     const timeRange = state.scheduleMeasurement.timeRange;
//     // const defaultHour = defaultMinute / 60;
//     const isOffWeekend = state.settings.isOffWeekend;
//     const isHiddenWeekend = state.settings.isHiddenWeekend;

//     const itemsById = state.general.itemsById;
//     if (!timeRange) return;
//     const uniqueIdList = uniq(rowIds);
//     const calculateRange = {
//       from: dayIndexToDay(timeRange.from.dayIndex).format(TIMERANGE_CALCULATE_FORMAT),
//       to: dayIndexToDay(timeRange.to.dayIndex).format(TIMERANGE_CALCULATE_FORMAT),
//     };
//     const deltaDay = diffBusinessDayOffset(timeRange.from.dayIndex, timeRange.to.dayIndex);
//     const calculateWidth: number =
//       (isHiddenWeekend ? deltaDay : timeRange.to.dayIndex - timeRange.from.dayIndex) + 1;
//     const calculatedTime = {};
//     const groupItemsByStatus: Record<
//       string,
//       Record<string, { color: string; countItem: number }>
//     > = {};
//     uniqueIdList.forEach((uid: string) => {
//       let total = 0;
//       groupItemsByStatus[uid] ??= {};

//       const inRangeItems = Object.keys(itemsById).filter((key: string) => {
//         const itemId: number = parseInt(key);
//         const item = itemsById[itemId];

//         const mappedField = mappedFieldBoards[item.board.id];
//         if (!mappedField || !mappedField?.assignees || !mappedField?.timeline || !mappedField?.hour)
//           return false;
//         if (!itemsById[itemId].columnsById[mappedField.hour!].value) return false;

//         const { userIds = [] } = itemsById[itemId].columnsById[mappedField.assignees!].value || {};
//         const users = userIds;
//         // check if this user assigned to this item
//         if (!users.includes(uid)) return false;

//         // check if exist time line and whether timeline overlapped with some items
//         return (
//           item &&
//           item.columnsById[mappedField.timeline!].value &&
//           //@ts-ignore
//           isDayOverlapped(item.columnsById[mappedField.timeline!].value, calculateRange)
//         );
//       });

//       let userTotalTime: number = 0;
//       for (let i = timeRange.from.dayIndex; i < timeRange.from.dayIndex + calculateWidth; i++) {
//         const day = dayIndexToDay(i);
//         userTotalTime += 8;
//         //   (userWorkCapacity[day.day()] / 60)
//       }
//       // const totalTime = (calculateWidth - offDays) * defaultHour;
//       const overtimeRecord: Record<number, { isNonWorking: boolean; value: number }> = {};
//       const statusItems: Record<string, { color: string; countItem: number }> = {};

//       inRangeItems.forEach((key: string) => {
//         const itemId: number = parseInt(key);
//         const item = itemsById[itemId];

//         const mappedField = mappedFieldBoards[item.board.id];
//         const { from, to } = item.columnsById[mappedField.timeline!].value;

//         let width = calculateWidth;
//         let start = timeRange.from.dayIndex;

//         if (isHiddenWeekend) {
//           const _end = to > calculateRange.to! ? calculateRange.to! : to;
//           const _start = from > calculateRange.from! ? from : calculateRange.from!;
//           width = diffBusinessDay(_start, _end);
//           start = getDayIndex(_start) - 1;
//         } else {
//           if (to < calculateRange.to!) {
//             width -= dayjs(calculateRange.to).diff(dayjs(to), 'day');
//           }

//           if (from > calculateRange.from!) {
//             width -= dayjs(from).diff(dayjs(calculateRange.from), 'day');
//             start = getDayIndex(from);
//           }
//         }

//         // let nonWorkingDay = 0;
//         for (let i = start; i < start + width; i++) {
//           const day = dayIndexToDay(i);

//           overtimeRecord[i] ??= { isNonWorking: false, value: 0 };
//           overtimeRecord[i].isNonWorking = false;

//           const hour = isOffWeekend
//             ? 0
//             : mappedField.hour && item.columnsById[mappedField.hour]
//               ? item.columnsById[mappedField.hour].value / 1 //same as divisor, diff name for clarity
//               : 8; // get default value of the day in user scheme

//           overtimeRecord[i].value += hour;
//           //overtime calculation formula
//           total += hour;
//         }
//         if (mappedField.status && item.columnsById[mappedField.status!]) {
//           const { label, label_style } = item.columnsById[mappedField.status!] || {
//             label_style: { color: '#c4c4c4' },
//           };

//           const color = label_style?.color || '#c4c4c4';
//           const key = label || BLANK_STATUS_LABEL;
//           statusItems[key] ??= { color: color, countItem: 0 };
//           statusItems[key].countItem += 1;
//         }
//       });
//       const overtimeRecordKeys = Object.keys(overtimeRecord);
//       const overTime = Object.values(overtimeRecord).reduce(
//         (acc, { isNonWorking, value }, index) => {
//           const _idx = Number(overtimeRecordKeys[index]);
//           const day = dayIndexToDay(_idx);
//           const userDayWorkingHour = 8;
//           // (userWorkCapacity[day.day()] / 60)
//           return (
//             acc +
//             (isOffWeekend && isNonWorking
//               ? 0
//               : value > userDayWorkingHour
//                 ? value - userDayWorkingHour
//                 : 0)
//           );
//         },
//         0,
//       );
//       Object.assign(calculatedTime, {
//         [uid]: {
//           scheduledTime: Number(total.toFixed(2)),
//           totalTime: Number(userTotalTime.toFixed(2)),
//           overtime: Number(overTime.toFixed(2)),
//         },
//       });

//       Object.assign(groupItemsByStatus, { [uid]: statusItems });
//     });
//   },
// );
