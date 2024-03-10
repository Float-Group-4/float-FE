import dayjs from 'dayjs';
import { MARGIN_LEFT, MARGIN_RIGHT, MARGIN_TOP } from '../../common/constant';

import {
  HEIGHT_PER_HOUR,
  MIN_HEIGHT_HOURS,
  TASK_DEFAULT_COLOR,
  TASK_DEFOCUS_COLOR,
} from '@constants/home';
import { useAppSelector } from '@hooks/reduxHooks';
import { useScheduleContext } from '@pages/HomePage/Schedule/ScheduleContext';
import {
  convertMinuteToHumanRead,
  getContrastColor,
} from '../../../../../../../src/utilities/helper';
import { getHorizontalDimensions } from '../../common/helper';
import PlaceholderItem from './PlaceholderItem';

export const ItemCard = ({ id, rowId }: { id: string; rowId: string }) => {
  const { setDragItemV2, setContextMenuPosition } = useScheduleContext();
  const task = useAppSelector((state) => state.schedule.plannedTaskMap[id]);
  const { isShowTasksOverdue, isShowTaskStatus, isShowTasksPriority } = useAppSelector(
    (state) => state.settings,
  );
  const priorityMap = useAppSelector((state) => state.schedule.priorityMap);
  const statusMap = useAppSelector((state) => state.schedule.statusMap);
  const cellWidth = useAppSelector((state) => state.boardMeasurement.cellWidth);
  const y = useAppSelector(
    (state) => state.schedule.rowMap[rowId].taskPosition[id] * HEIGHT_PER_HOUR + MARGIN_TOP,
  );
  const focusItem = useAppSelector((state) => state.schedule.focusItem);

  if (!task) return <></>;

  const isOverdue = dayjs().isAfter(task.DueDate);
  // const mappedBadge = BADGE_STATUS_MAPPER[task.Status as StatusChoice];

  const isShowStatus = dayjs(task.DueDate).diff(task.StartDate, 'days') >= 1 && isShowTaskStatus;

  const { x, w } = getHorizontalDimensions({ StartDate: task.StartDate, DueDate: task.DueDate });

  const textColor = getContrastColor(task.Color || TASK_DEFAULT_COLOR);

  const handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    const rightMouse = 2;
    if (e.button === rightMouse) {
      setContextMenuPosition({ x: e.clientX, y: e.clientY, itemId: id });
    }
    if (e.button !== 0) return;
  };

  return task.isPlaceholder ? (
    <PlaceholderItem
      className='rounded-md'
      style={{
        top: `${y}px`, //item position
        height: `${Math.max(MIN_HEIGHT_HOURS, task.ScheduleMinute / 60.0 ?? 0) * HEIGHT_PER_HOUR}px`,
        width: `${w * cellWidth - MARGIN_RIGHT}px`,
        left: `${x * cellWidth + MARGIN_LEFT}px`,
        backgroundColor: task.Color ?? TASK_DEFAULT_COLOR,
      }}
    />
  ) : (
    <div
      id={id}
      className='absolute touch-none cursor-pointer z-[2] tooltip-target'
      onMouseDown={(_) => handleMouseDown}
      style={{
        top: `${y}px`, //item position
        height: `${Math.max(MIN_HEIGHT_HOURS, task.ScheduleMinute / 60.0 ?? 0) * HEIGHT_PER_HOUR}px`,
        width: `${w * cellWidth - MARGIN_RIGHT}px`,
        left: `${x * cellWidth + MARGIN_LEFT}px`,
      }}
    >
      <div className='relative w-full h-full text-white '>
        <div
          className={`h-full flex flex-col rounded-md justify-between`}
          data-tooltip-id='task-tooltip'
          data-tooltip-content={id}
          style={{
            backgroundColor:
              focusItem === ''
                ? task.Color || TASK_DEFAULT_COLOR
                : focusItem === task.Id
                  ? task.Color
                  : TASK_DEFOCUS_COLOR,
            border: '0.5px solid #80808020',
            overflow: 'hidden',
          }}
        >
          <div
            className={`truncate px-1 flex gap-2 items-center`}
            style={{ minHeight: MIN_HEIGHT_HOURS * HEIGHT_PER_HOUR }}
          >
            <p className='text-xs' style={{ color: textColor }}>
              {task.Name}
            </p>
            {/* {isOverdue && <CustomIcon name='ti ti-alert-circle' className='text-yellow-400 ' />} */}
          </div>
          <div className='flex items-end justify-between p-1' style={{ color: textColor }}>
            <div className='flex flex-row items-center gap-2 '>
              <div
                className='overflow-x-hidden text-ellipsis w-max rounded-[4px] px-[6px] py-[1px] uppercase text-[10px] text-white'
                style={{
                  display: isShowStatus ? 'block' : 'none',
                  backgroundColor: statusMap[task?.Status]?.Color || '#fff',
                  color: getContrastColor(statusMap[task?.Status]?.Color || '#fff'),
                }}
              >
                {statusMap[task?.Status]?.Name || 'No Status'}
              </div>
              {/* <Button
                className='p-0 h-fit'
                variant='ghost'
                size='sm'
                style={{
                  display: isShowTasksPriority ? 'block' : 'none',
                }}
              >
                <CustomIcon
                  color={getContrastColor(task.Color)}
                  name={priorityMap[task.Priority]?.Icon}
                />
              </Button> */}
            </div>
            <span className='leading-none'>
              {convertMinuteToHumanRead(task.ScheduleMinute ?? 0)}
            </span>
          </div>
        </div>

        <div
          className='top-0 left-[-3px] w-[6px] h-full absolute cursor-ew-resize '
          onMouseDown={(e) => {
            e.stopPropagation();
            // onTaskResizeStart(id, ResizeDirection.left);
          }}
        />

        <div
          className='top-0 right-[-3px] w-[6px] h-full absolute cursor-ew-resize '
          onMouseDown={(e) => {
            e.stopPropagation();
            // onTaskResizeStart(id, ResizeDirection.right);
          }}
        />

        <div
          className='left-0 bottom-[-2x] h-[7px] w-full absolute cursor-ns-resize '
          onMouseDown={(e) => {
            e.stopPropagation();
            // onTaskResizeStart(id, ResizeDirection.bottom);
          }}
        />
      </div>
    </div>
  );
};
