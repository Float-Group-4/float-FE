import { useAppDispatch, useAppSelector, useWindowDimensions } from '@hooks/reduxHooks';
import React, { useEffect, useMemo } from 'react';
import { setDisplayingWeeks } from '../../../../../../src/redux/schedule/scheduleSlice';
import { buildRows } from '../../../../../../src/redux/schedule/thunk';
import { useScheduleContext } from '../../ScheduleContext';
import {
  CALENDAR_BAR_HEIGHT,
  DEFAULT_MIN_HOURS,
  MARGIN_BOTTOM,
  MARGIN_TOP,
} from '../common/constant';
import { DragInfo } from '../common/type';
import CornerCell from './Cells/CornerCell';
import DateCell from './Cells/DateCell';
import { DraggableWrapper } from './DraggableWrapper';
import Row from './Row';

export const BoardContainer = () => {
  const dispatch = useAppDispatch();
  const windowDimensions = useWindowDimensions();
  const { boardRef, dragInfo, dragItem, timeScoreRef, trackMouse } = useScheduleContext();
  const usersById = {};
  const {
    mainCellWidth,
    boardWidth,
    cellWidth,
    cornerCellWidth,
    heightPerHour,
    cellBaseHeight,
    viewType,
    timeRange,
    amountDayInWeek,
  } = useAppSelector((state) => state.scheduleMeasurement);
  const scheduledTime = useAppSelector((state) => state.scheduleMeasurement.scheduledTime) as any;
  const { rowDisplayType, displayItems, currentWeekIndex, order } = useAppSelector(
    (state) => state.schedule,
  );
  const rowMap = useAppSelector((state) => state.general.rowMap);
  const isOffWeekend = false;

  const data: number[] = useMemo(() => {
    const orderIndex: Record<string, number> = order[rowDisplayType]?.reduce(
      (p: any, c: any, i: any) => {
        return { ...p, [c]: i };
      },
      {},
    );

    return Object.keys(usersById)
      .sort((a, b) => {
        return (orderIndex[a] ?? 999999) - (orderIndex[b] ?? 999999);
      })
      .map((id) => parseInt(id));
  }, [order, rowDisplayType]);

  const rowIds: string[] = useMemo(() => {
    return ['userId1', 'userId2', 'userId3'];
  }, [data]);

  const viewRow = rowIds.map((id: string) => rowMap[id]);

  const boardHeight = Object.values(viewRow).reduce((a, c) => {
    const rowHeight = c.height * heightPerHour + MARGIN_BOTTOM + MARGIN_TOP;
    return c.height < DEFAULT_MIN_HOURS ? a + cellBaseHeight : a + rowHeight;
  }, 0);

  const onContextMenuHandler = (event: React.MouseEvent) => {
    if (dragInfo.current) {
      if (
        (dragInfo.current as DragInfo).item ||
        (dragInfo.current as DragInfo).isCreating ||
        dragItem
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  const calculateDisplayWeekIndex = async () => {
    //Calculate displaying weeks
    const startIndex = currentWeekIndex - 3;
    const endIndex = currentWeekIndex + Math.floor(windowDimensions.width / mainCellWidth + 2);
    const newDisplayingWeeks = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const isLimited = i < 0;
      if (isLimited) continue;
      newDisplayingWeeks.push(i);
    }
    dispatch(setDisplayingWeeks(newDisplayingWeeks));
  };

  // //-------------- Calculate Scheduled time ------------
  // useEffect(() => {
  //   if (timeRange) {
  //     dispatch(calculateScheduledTime([...Object.keys(usersById)]));
  //   }
  // }, [timeRange, displayItems, isOffWeekend]);

  useEffect(() => {
    if (!timeRange) return;
    if (!scheduledTime) return;

    const { totalScheduled, totalTime, totalOT } = rowIds.reduce(
      (acc, uid) => {
        if (scheduledTime[uid]) {
          acc.totalScheduled += scheduledTime[uid].scheduledTime;
          acc.totalTime += scheduledTime[uid].totalTime;
          acc.totalOT += scheduledTime[uid].overtime;
        }
        return acc;
      },
      { totalScheduled: 0, totalTime: 0, totalOT: 0 },
    );

    timeScoreRef.current = {
      scheduledTime: totalScheduled,
      unscheduledTime: totalTime - totalScheduled,
      totalTime: totalTime,
      totalOT: totalOT,
    };
  }, [timeRange, rowIds, scheduledTime, displayItems, isOffWeekend]);

  const calculateWeekAndBuildRow = async () => {
    await calculateDisplayWeekIndex();
    dispatch(buildRows(rowIds.filter((id) => Object.keys(rowMap).includes(id.toString()))));
  };

  useEffect(() => {
    calculateWeekAndBuildRow();
  }, [currentWeekIndex, windowDimensions, rowDisplayType, viewType, displayItems, amountDayInWeek]);

  // ----- TimeRange Color ------
  const timeRangeBoard = useMemo(() => {
    return (
      timeRange && (
        <>
          <div
            className='absolute z-[-1] bottom-0 border-2 h-full !border-link border-solid bg-primary opacity-40'
            style={{
              left: `${timeRange.from.dayIndex * cellWidth}px`,
              width: `${(timeRange.to.dayIndex - timeRange.from.dayIndex + 1) * cellWidth}px`,
            }}
          />
        </>
      )
    );
  }, [timeRange]);

  return (
    <div
      className='relative flex bg-white'
      style={{
        height: `${boardHeight + CALENDAR_BAR_HEIGHT}px`,
        width: `${boardWidth}px`,
        paddingLeft: `${cornerCellWidth - 1}px`,
      }}
      onContextMenu={onContextMenuHandler}
      onMouseMove={(e) => {
        if (dragInfo.current && (dragInfo.current as DragInfo)?.isTimeRangeSelect) {
          trackMouse(e, null);
        }
      }}
    >
      <CornerCell />
      <DateCell />
      <div
        ref={boardRef}
        className='absolute w-full'
        style={{ top: `${CALENDAR_BAR_HEIGHT}px`, height: `${boardHeight}px` }}
      >
        <DraggableWrapper>
          {rowIds.map((id) => (
            <Row key={id} data-custom-attr={id} userId={id} className='' />
          ))}
        </DraggableWrapper>

        <div
          className='absolute top-0 w-full h-full -z-40'
          style={{
            backgroundImage: 'linear-gradient(to right, #9ca3af 1px, transparent 1px)',
            backgroundSize: `${cellWidth}px ${cellWidth}px`,
          }}
        />
        <div
          className='absolute top-0 w-full h-full bg-black -z-50'
          style={{
            backgroundImage: 'linear-gradient(to right, #9ca3af 1px, transparent 1px)',
            backgroundSize: `${mainCellWidth}px ${mainCellWidth}px`,
          }}
        />
        {timeRangeBoard}
      </div>
    </div>
  );
};
