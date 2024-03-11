import dayjs from 'dayjs';
import { MARGIN_LEFT, MARGIN_RIGHT, MARGIN_TOP } from '../../common/constant';

import { HEIGHT_PER_HOUR, MIN_HEIGHT_HOURS, TASK_DEFAULT_COLOR } from '@constants/home';
import { useAppSelector } from '@hooks/reduxHooks';
import { useScheduleContext } from '@pages/HomePage/Schedule/ScheduleContext';
import {
  convertMinuteToHumanRead,
  getContrastColor,
} from '../../../../../../../src/utilities/helper';
import { getHeightByItem, getHorizontalDimensions } from '../../common/helper';
import PlaceholderItem from './PlaceholderItem';

export const ItemCard = ({ id, rowId }: { id: string; rowId: string }) => {
  const { setDragItem, mousePositionRef, autoscroller } = useScheduleContext();
  const item = useAppSelector((state) => state.general.itemsById[id]);
  // const priorityMap = useAppSelector((state) => state.schedule.priorityMap);
  // const statusMap = useAppSelector((state) => state.schedule.statusMap);
  const cellWidth = useAppSelector((state) => state.scheduleMeasurement.cellWidth);
  const heightPerHour = useAppSelector((state) => state.scheduleMeasurement.heightPerHour);
  const y = useAppSelector((state) => state.general.rowMap[rowId].itemPosition[id]);
  // const focusItem = useAppSelector((state) => state.general.focusItem);

  if (!item) return <></>;

  const isOverdue = dayjs().isAfter(item.endDate);
  // const mappedBadge = BADGE_STATUS_MAPPER[item.Status as StatusChoice];

  // const isShowStatus = dayjs(item.endDate).diff(item.startDate, 'days') >= 1 && isShowitemStatus;

  const { x, w } = getHorizontalDimensions({ from: item.startDate, to: item.endDate });

  const textColor = getContrastColor(TASK_DEFAULT_COLOR);

  // const handleMouseDown = (e: MouseEvent) => {
  //   e.stopPropagation();
  //   const rightMouse = 2;
  //   if (e.button === rightMouse) {
  //     setContextMenuPosition({ x: e.clientX, y: e.clientY, itemId: id });
  //   }
  //   if (e.button !== 0) return;
  // };
  const handleMouseDown = (e: React.MouseEvent) => {
    const mp = mousePositionRef.current;
    if (e.button !== 0 || !mp) return;

    const rect = e.currentTarget!.getBoundingClientRect();
    const px = rect.left - e.clientX;
    const py = rect.top - e.clientY;
    console.log('Set Drag Item: ', item);

    setDragItem({
      item: item,
      rowId: rowId,
      element: (
        <div
          className={` w-full  rounded-md  absolute touch-none bg-blue-500`}
          style={{
            height: `${getHeightByItem(heightPerHour, item, 8, 1)}px`,
            width: `${w * cellWidth - MARGIN_RIGHT}px`,
          }}
        >
          <div
            className={`bg-blue-500 text-textOnPrimary rounded-md px-2 pb-1 flex flex-col justify-between truncate w-full h-full box-border`}
          >
            <div className='w-full flex justify-between'>
              <div className='flex items-center gap-1 truncate' style={{ color: `white` }}>
                <span className='truncate'>{item.name}</span>
              </div>
            </div>
            <div className=' flex justify-between w-full h-[16px] text-center items-center'>
              <span className='order-1 ' style={{ color: `white` }}>
                {`${Number((item.hour / 1).toFixed(2))}h`}
              </span>
            </div>
          </div>
        </div>
      ),
      offsetX: rect.left,
      offsetY: rect.top,
      width: w * cellWidth,
      height: getHeightByItem(heightPerHour, item, 8, 1),
      clientX: e.clientX,
      clientY: e.clientY,
      px,
      py,
    });
  };

  return item.isPlaceHolder ? (
    <PlaceholderItem
      className='rounded-md'
      style={{
        top: `${y}px`, //item position
        height: `${Math.max(MIN_HEIGHT_HOURS, 480 / 60.0 ?? 0) * HEIGHT_PER_HOUR}px`,
        width: `${w * cellWidth - MARGIN_RIGHT}px`,
        left: `${x * cellWidth + MARGIN_LEFT}px`,
        backgroundColor: TASK_DEFAULT_COLOR,
      }}
    />
  ) : (
    <div
      id={id}
      className='absolute touch-none cursor-pointer z-[2] tooltip-target'
      onMouseDown={handleMouseDown}
      style={{
        top: `${y}px`, //item position
        height: `${Math.max(MIN_HEIGHT_HOURS, 480 / 60.0 ?? 0) * HEIGHT_PER_HOUR}px`,
        width: `${w * cellWidth - MARGIN_RIGHT}px`,
        left: `${x * cellWidth + MARGIN_LEFT}px`,
      }}
    >
      <div className='relative w-full h-full text-white '>
        <div
          className={`h-full flex flex-col rounded-md justify-between`}
          data-tooltip-id='item-tooltip'
          data-tooltip-content={id}
          style={{
            backgroundColor: TASK_DEFAULT_COLOR,
            border: '0.5px solid #80808020',
            overflow: 'hidden',
          }}
        >
          <div
            className={`truncate px-1 flex gap-2 items-center`}
            style={{ minHeight: MIN_HEIGHT_HOURS * HEIGHT_PER_HOUR }}
          >
            <p className='text-xs' style={{ color: textColor }}>
              {item.name}
            </p>
            {/* {isOverdue && <CustomIcon name='ti ti-alert-circle' className='text-yellow-400 ' />} */}
          </div>
          <div className='flex items-end justify-end p-1' style={{ color: textColor }}>
            <span className='leading-none'>{convertMinuteToHumanRead(480)}</span>
          </div>
        </div>

        <div
          className='top-0 left-[-3px] w-[6px] h-full absolute cursor-ew-resize '
          onMouseDown={(e) => {
            e.stopPropagation();
            // onitemResizeStart(id, ResizeDirection.left);
          }}
        />

        <div
          className='top-0 right-[-3px] w-[6px] h-full absolute cursor-ew-resize '
          onMouseDown={(e) => {
            e.stopPropagation();
            // onitemResizeStart(id, ResizeDirection.right);
          }}
        />

        <div
          className='left-0 bottom-[-2x] h-[7px] w-full absolute cursor-ns-resize '
          onMouseDown={(e) => {
            e.stopPropagation();
            // onitemResizeStart(id, ResizeDirection.bottom);
          }}
        />
      </div>
    </div>
  );
};
