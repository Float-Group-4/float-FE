import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { useScheduleContext } from '@pages/HomePage/Schedule/ScheduleContext';
import { memo, useCallback, useRef, useState } from 'react';
import { setTimeRange } from '../../../../../../../src/redux/schedule/scheduleMeasurementSlice';
import { ResizeDirection } from '../../../../../../../src/types/enums';
import { CALENDAR_BAR_HEIGHT, STARTING_POINT } from '../../common/constant';
import { dayIndexToDay, dayIndexToWeekIndex, weekIndexToDay } from '../../common/helper';
import { DragInfo, ViewType } from '../../common/type';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { IconButton } from '@mui/material';

export default function DateCell() {
  const dispatch = useAppDispatch();
  const {
    boardRef,
    autoscroller,
    timeRangeSelectionRef,
    dragInfo,
    calendarBarRef,
    onMouseMoveOutOfBoard,
    hoverRelatedDateCellRef,
  } = useScheduleContext();
  const { mainCellWidth, cellWidth, timeRange } = useAppSelector(
    (state) => state.scheduleMeasurement,
  );
  const [isTimeRangeSelect, setIsTimeRangeSelect] = useState(false);
  const mousePlaceRef = useRef<{ weekIndex: number; dayIndex: number } | null>(null);
  const mouseDownRef = useRef<any>(null);
  const timeLineRef = useRef<HTMLDivElement>(null);
  const dragTimeRangeInfo = useRef<{ paddingLeft: number | null }>({ paddingLeft: null });
  const drag = useRef<{ start: any; end: any } | null>(null);
  const nonDrag = useRef<boolean>(false);
  const _trackMouse = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;

    const weekIndex = Math.floor(x / mainCellWidth);
    const dayIndex = Math.floor(x / cellWidth);
    return { weekIndex, dayIndex };
  };
  const displayingWeeks = useAppSelector((state) => state.schedule.displayingWeeks);

  // --------- SELECT TIME RANGE --------
  const handleOnMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      if (!boardRef) return;
      const smp = _trackMouse(e.clientX, e.currentTarget.getBoundingClientRect());
      dragInfo.current = {
        isTimeRangeSelect: true,
        isCreating: false,
        smp,
        emp: smp,
        isDragging: false,
        isPlanning: false,
      };
      drag.current = {
        start: {
          dayIndex: smp.dayIndex,
          weekIndex: smp.weekIndex,
        },
        end: { dayIndex: smp.dayIndex, weekIndex: smp.weekIndex },
      };

      setIsTimeRangeSelect(true);
      autoscroller?.current.enableHorizontal();
      document.body.addEventListener('mousemove', handleMouseMove);
      document.body.addEventListener('mouseleave', handleMouseUp);
      document.body.addEventListener('mouseup', handleMouseUp, { once: true });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!boardRef) return;
    if (!dragInfo.current) return;
    if (nonDrag.current === true) {
      e.stopPropagation();
      e.preventDefault();
      handleMouseUp();
      dragInfo.current = {};
      setIsTimeRangeSelect(false);

      drag.current = null;
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseUp);
      document.body.removeEventListener('mouseup', handleMouseUp);

      autoscroller?.current.disable();
      nonDrag.current = false;
      return;
    }
    if (!drag.current && (dragInfo.current as DragInfo).smp) {
      drag.current = {
        start: {
          dayIndex: (dragInfo.current as DragInfo).smp.dayIndex,
          weekIndex: (dragInfo.current as DragInfo).smp.weekIndex,
        },
        end: null,
      };
    }
    if (drag.current && dragInfo.current && (dragInfo.current as DragInfo).emp !== null) {
      const { weekIndex, dayIndex } = (dragInfo.current as DragInfo).emp ?? {};
      if (weekIndex && dayIndex) {
        mousePlaceRef.current = { weekIndex, dayIndex };
        drag.current = { ...drag.current, end: { weekIndex, dayIndex } };
      }
    }
  };

  const handleMouseUp = () => {
    if (!dragInfo.current || !drag.current) return;

    dragInfo.current = {};
    setIsTimeRangeSelect(false);
    const [from, to] = Object.values(drag.current).sort((a, b) => a.dayIndex - b.dayIndex);

    drag.current = null;
    dispatch(setTimeRange({ from, to }));

    document.body.removeEventListener('mousemove', handleMouseMove);
    document.body.removeEventListener('mouseleave', handleMouseUp);
    document.body.removeEventListener('mouseup', handleMouseUp);
    autoscroller?.current.disable();
  };
  // ------------- RESIZE TIME BAR ---------------

  const onTimeRangeResizeStart = (e: React.MouseEvent, edge: string) => {
    if (drag.current) return;

    if (!timeRange) return;
    const { from, to } = timeRange;

    mouseDownRef.current = {
      dayIndex: edge === ResizeDirection.right ? to.dayIndex : from.dayIndex,
      lastDeltaDay: 0,
    };

    if (edge === ResizeDirection.right || edge === ResizeDirection.left) {
      autoscroller?.current.enableHorizontal();
    }
    const smp = _trackMouse(e.clientX, calendarBarRef.current!.getBoundingClientRect());

    dragInfo.current = {
      isTimeRangeSelect: true,
      isCreating: false,
      smp,
      emp: smp,
      isDragging: false,
      isPlanning: false,
    };

    const upHandler = () => {
      dragInfo.current = { emp: null, isTimeRangeSelect: false };
      mouseDownRef.current = null;
      autoscroller?.current.disable();

      window.removeEventListener('mousemove', moveHandler);
    };
    const moveHandler = () => {
      let newTimeRangeValue = timeRange;
      let deltaDay = 0;
      const { dayIndex } = (dragInfo.current as DragInfo).emp;
      deltaDay = dayIndex - mouseDownRef.current.dayIndex;
      const mouseDownlastDeltaDay = mouseDownRef.current.lastDeltaDay;
      if (deltaDay !== mouseDownlastDeltaDay) {
        mouseDownRef.current.lastDeltaDay = deltaDay;
        switch (edge) {
          case ResizeDirection.left:
            newTimeRangeValue = {
              ...newTimeRangeValue,
              from: {
                dayIndex: timeRange.from.dayIndex + deltaDay,
                weekIndex: timeRange.from.weekIndex,
              },
            };

            break;

          case ResizeDirection.right:
            newTimeRangeValue = {
              ...newTimeRangeValue,
              to: {
                dayIndex: timeRange.to.dayIndex + deltaDay,
                weekIndex: timeRange.to.weekIndex,
              },
            };
            break;
          default:
            break;
        }
        const w = timeRange.to.dayIndex - timeRange.from.dayIndex + 1;
        if (edge === ResizeDirection.left) {
          if (w - deltaDay > 0) {
            dispatch(setTimeRange(newTimeRangeValue));
          }
        }
        if (edge === ResizeDirection.right) {
          if (deltaDay + w > 0) {
            dispatch(setTimeRange(newTimeRangeValue));
          }
        }
      }
    };
    window.addEventListener('mouseup', upHandler, { once: true });

    window.addEventListener('mousemove', moveHandler);
  };

  // ----- Drag Timeline ---------

  const dragStartHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!timeRange || !timeLineRef.current) return;
    if (!dragTimeRangeInfo.current.paddingLeft) {
      dragTimeRangeInfo.current.paddingLeft = Math.floor(
        (e.clientX - timeLineRef.current!.getBoundingClientRect().left) / cellWidth,
      );
    }

    const w = timeRange.to.dayIndex - timeRange.from.dayIndex + 1;
    let lastdayIndex: number | null = null;
    autoscroller?.current.enableHorizontal();

    const draggingHandler = (e: MouseEvent) => {
      if (!calendarBarRef || !calendarBarRef.current) return;

      const dayIndex = Math.floor(
        (e.clientX - calendarBarRef.current!.getBoundingClientRect().left) / cellWidth,
      );

      if (!timeRange || !timeLineRef.current) return;

      if (dayIndex !== lastdayIndex) {
        const paddingL = dragTimeRangeInfo.current.paddingLeft!;

        const newFromIndex = dayIndex - paddingL;
        dispatch(
          setTimeRange({
            from: { dayIndex: newFromIndex, weekIndex: dayIndexToWeekIndex(newFromIndex) },
            to: {
              dayIndex: newFromIndex + w - 1,
              weekIndex: dayIndexToWeekIndex(newFromIndex + w - 1),
            },
          }),
        );

        lastdayIndex = dayIndex;
      }
      timeLineRef.current.style.cursor = 'grabbing';
    };

    const dragEndHandler = () => {
      if (!timeRange || !timeLineRef.current) return;
      dragTimeRangeInfo.current.paddingLeft = null;
      window.removeEventListener('mousemove', draggingHandler);
      window.removeEventListener('mouseleave', dragEndHandler);
      autoscroller?.current.disable();

      timeLineRef.current.style.cursor = 'auto';
    };

    window.addEventListener('mouseup', dragEndHandler, { once: true });
    window.addEventListener('mouseleave', dragEndHandler);
    window.addEventListener('mousemove', draggingHandler);
  };

  return (
    <div
      className='sticky z-40 w-full border-b border-solid border-gray-200 bg-gray-800'
      style={{
        height: `${CALENDAR_BAR_HEIGHT}px`,
        top: 0,
      }}
      onMouseEnter={onMouseMoveOutOfBoard}
      onMouseDown={handleOnMouseDown}
      onPointerDown={(e) => e.stopPropagation()}
      ref={calendarBarRef}
      key={'calendar'}
    >
      {isTimeRangeSelect && (
        <div
          ref={timeRangeSelectionRef}
          className='absolute rounded-t-md bottom-0 !bg-blue-300 h-[24px] z-[1] opacity-30'
          style={{
            width: `${cellWidth}px`,
            // @ts-ignore
            left: `${cellWidth * drag.current?.start.dayIndex}px`,
          }}
        />
      )}
      <Cells key={displayingWeeks.join('.')} />
      {/*Highlight DateCell Based on Hovering*/}
      <div
        ref={hoverRelatedDateCellRef}
        className='absolute w-[160px] top-[50px] border-b-2 border-b-blue-500'
      ></div>
      {timeRange && (
        <div
          ref={timeLineRef}
          className={`ds-timeframe absolute bottom-0 bg-transparent !cursor-grab  h-[24px] opacity-70  rounded-t-md flex items-center`}
          style={{
            width: `${(timeRange.to.dayIndex - timeRange.from.dayIndex + 1) * cellWidth}px`,
            // @ts-ignore
            left: `${timeRange.from.dayIndex * cellWidth}px`,
          }}
          onMouseDown={dragStartHandler}
        >
          <div
            className='ds-timeframe-actions top-0 text-textOnInverted right-[-3px] rounded-tl-md w-[8px] h-full absolute cursor-ew-resize z-5 !opacity-100 bg-placeholder left-0'
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onTimeRangeResizeStart(e, ResizeDirection.left);
            }}
          >
            <DragIndicatorIcon className='top-0 h-full w-[8px] cursor-ew-resize' />
          </div>

          <div
            className='ds-timeframe-actions top-0 text-textOnInverted w-[8px] h-full rounded-tr-md absolute cursor-ew-resize z-5 !opacity-100 bg-placeholder !right-0'
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onTimeRangeResizeStart(e, ResizeDirection.right);
            }}
          >
            <DragIndicatorIcon className='top-0 h-full  w-[8px] cursor-ew-resize ' />
          </div>
          <div
            className=' absolute flex items-center !opacity-100 h-full  text-textOnInverted float-right right-[10px] py-2'
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(setTimeRange(null));
            }}
          >
            <IconButton
              color='default'
              className='rounded-full h-full aspect-square hover:bg-red-500 hover:text-white'
              sx={{ width: 16, height: 16 }}
            >
              <CloseIcon sx={{ fontSize: 12 }} />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}

const Cells = memo(() => {
  const { mainCellWidth } = useAppSelector((state) => state.scheduleMeasurement);
  const displayingWeeks = useAppSelector((state) => state.schedule.displayingWeeks);
  const isHiddenWeekend = useAppSelector((state) => state.settings.isHiddenWeekend);

  return (
    <>
      {displayingWeeks.map((weekIndex: number) => {
        const startOfWeek = dayjs(STARTING_POINT.clone().add(weekIndex, 'weeks'));
        const weekOfYear = startOfWeek.week();
        const startMonth = startOfWeek.format('MMM');
        const endMonth = startOfWeek.clone().add(6, 'days').format('MMM');
        const days = !isHiddenWeekend
          ? Array(7)
              .fill(null)
              .map((_, i) => startOfWeek.clone().add(i, 'days'))
          : Array(5)
              .fill(null)
              .map((_, i) => startOfWeek.clone().add(i + 1, 'days'));
        const left = mainCellWidth * weekIndex;
        return (
          <div
            key={weekIndex}
            className='absolute top-0 flex flex-col justify-around h-full overflow-hidden bg-gray-100 font-veryLight'
            style={{
              width: `${mainCellWidth}px`,
              left: `${left}px`,
            }}
          >
            <div className='flex items-center border-gray-100 h-[30px]'>
              <div className='pl-3 '>
                <JumpCell weekIndex={weekIndex} type={'week'} label={weekOfYear} />
              </div>
              <div className='flex justify-center flex-1 font-medium'>
                {startMonth == endMonth ? (
                  <JumpCell weekIndex={weekIndex} type={'month'} label={startMonth} />
                ) : (
                  <span>
                    <JumpCell weekIndex={weekIndex} type={'month'} label={startMonth} />
                    <span>-</span>
                    <JumpCell weekIndex={weekIndex + 1} type={'month'} label={endMonth} />
                  </span>
                )}
              </div>
              <div className='h-3 w-[1px] bg-blue-500'></div>
            </div>
            <div className='flex text-xs h-[24px]'>
              {days.map((d) => {
                const dayString = d.format('YYYY-MM-DD');
                return <HolidayDot key={dayString} day={dayString} />;
              })}
            </div>
          </div>
        );
      })}
    </>
  );
});

const JumpCell = ({ weekIndex, label, type }: any) => {
  const dispatch = useAppDispatch();
  const nonDrag = useRef<boolean>(false);
  const { fastForward } = useScheduleContext();

  //----- JUMP HANDLER -----------
  const jumpWeekHandler = useCallback(
    (weekIndex: number, type: string) => {
      nonDrag.current = true;
      const now = weekIndexToDay(weekIndex);
      let startOfWeek = null;
      let endOfWeek = null;
      let leftPadding = 0;
      switch (type) {
        case 'month':
          startOfWeek = now.startOf('month');
          endOfWeek = now.endOf('month');
          leftPadding = 1;
          break;
        case 'week':
          startOfWeek = now.startOf('week');
          endOfWeek = now.endOf('week');
          break;

        default:
          return;
      }
      const from = {
        weekIndex: startOfWeek.diff(STARTING_POINT, 'week'),
        dayIndex: startOfWeek.diff(STARTING_POINT, 'day'),
      };
      const to = {
        weekIndex: endOfWeek.diff(STARTING_POINT, 'week'),
        dayIndex: endOfWeek.diff(STARTING_POINT, 'day'),
      };
      dispatch(setTimeRange({ from, to }));
      fastForward(from.weekIndex);
    },
    [fastForward],
  );

  return (
    <span
      className='px-2 rounded cursor-pointer hover:bg-blue-500 hover:text-white'
      onClick={() => {
        jumpWeekHandler(weekIndex, type);
      }}
    >
      {label}
    </span>
  );
};

const HolidayDot = memo(({ day }: { day: string }) => {
  const { cellWidth, viewType, timeRange } = useAppSelector((state) => state.scheduleMeasurement);
  const d = dayjs(day, 'YYYY-MM-DD');
  const isToday = d.isToday();
  const weekDay = d.format('ddd');
  const dateOfMonth = d.get('D');
  const isInRange =
    timeRange &&
    d.isBetween(dayIndexToDay(timeRange?.from.dayIndex), dayIndexToDay(timeRange?.to.dayIndex));
  const isLeftEdge = timeRange && d.diff(dayIndexToDay(timeRange?.from.dayIndex), 'days') === 0;
  const isRightEdge = timeRange && d.diff(dayIndexToDay(timeRange?.to.dayIndex), 'days') === 0;

  return (
    <div
      className={`relative border-red-500 flex ${viewType === ViewType.months ? 'pl-1' : 'pl-3'} gap-1 items-center ${
        isToday && 'text-blue-500 font-medium '
      } ${isInRange && 'bg-gray-300  '}
                ${isLeftEdge && 'bg-gray-300   rounded-tl-md'}
                ${isRightEdge && 'bg-gray-300  rounded-tr-md'} `}
      style={{ width: `${cellWidth}px` }}
    >
      <span className='relative flex items-center h-full gap-1 px-1 hover:bg-blue-500 hover:text-white rounded-t-md'>
        <span>{viewType === ViewType.months ? '' : weekDay}</span>
        <span
          className={`${
            isToday && 'h-full w-5 text-white bg-blue-500 rounded-t-md'
          }  font-medium flex justify-center items-center`}
        >
          {dateOfMonth}
        </span>
      </span>
    </div>
  );
});
