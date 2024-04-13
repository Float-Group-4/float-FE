import dayjs from 'dayjs';
import { ITEM_DATE_FORMAT, MARGIN_LEFT, MARGIN_RIGHT, MARGIN_TOP } from '../../common/constant';

import { HEIGHT_PER_HOUR, MIN_HEIGHT_HOURS, TASK_DEFAULT_COLOR } from '@constants/home';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { useScheduleContext } from '@pages/HomePage/Schedule/ScheduleContext';
import _ from 'lodash';
import { useRef, useState } from 'react';
import { setItemsById } from '../../../../../../../src/redux/general/generalSlice';
import { buildRows } from '../../../../../../../src/redux/schedule/thunk';
import { ResizeDirection } from '../../../../../../../src/types/enums';
import {
  convertMinuteToHumanRead,
  getContrastColor,
} from '../../../../../../../src/utilities/helper';
import { getHeightByItem, getHorizontalDimensions, roundToQuarter } from '../../common/helper';

export const ItemCard = ({ id, rowId }: { id: string; rowId: string }) => {
  const dispatch = useAppDispatch();
  const { setDragItem, mousePositionRef, autoscroller, dragItem, scrollRef } = useScheduleContext();
  const item = useAppSelector((state) => state.general.itemsById[id]);
  const cellWidth = useAppSelector((state) => state.scheduleMeasurement.cellWidth);
  const heightPerHour = useAppSelector((state) => state.scheduleMeasurement.heightPerHour);
  const y = useAppSelector((state) => state.general.rowMap[rowId].itemPosition[id]);
  const itemsById = useAppSelector((state) => state.general.itemsById);

  const [isResizing, setIsResizing] = useState(false);
  const mouseDownRef = useRef<any>();

  if (!item) return <></>;

  const { x, w } = getHorizontalDimensions({ from: item.startDate, to: item.endDate });

  const textColor = getContrastColor(TASK_DEFAULT_COLOR);

  const handleMouseDown = (e: React.MouseEvent) => {
    const mp = mousePositionRef.current;
    e.stopPropagation();
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
            height: `${getHeightByItem(heightPerHour, item, 8)}px`,
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
      height: getHeightByItem(heightPerHour, item, 8),
      clientX: e.clientX,
      clientY: e.clientY,
      px,
      py,
    });
  };

  //-------------- Resize Item --------------
  const resizeItemHour = async (e: MouseEvent) => {
    let deltaHour = 0;
    const maxHour = 24;

    //@ts-ignore
    const deltaY = e.clientY + scrollRef?.current.scrollTop - mouseDownRef.current.pointY;
    deltaHour = roundToQuarter(deltaY / heightPerHour / 2, 0.25);
    const mouseDownlastDeltaHour = mouseDownRef.current.lastDeltaHour;
    if (deltaHour !== mouseDownlastDeltaHour) {
      mouseDownRef.current.lastDeltaHour = deltaHour;
      const oldHour = roundToQuarter(item.hour ?? 0, 0.25);
      if (deltaHour + oldHour > 0) {
        mouseDownRef.current.hour = _.clamp(deltaHour + oldHour, 0, maxHour);
        dispatch(
          setItemsById({
            ...itemsById,
            [id]: {
              ...itemsById[id],
              hour: mouseDownRef.current.hour,
            },
          }),
        );
        dispatch(buildRows(item.userIds));
      }
    }
  };

  const onItemResizeStart = (e: React.MouseEvent, edge: string) => {
    if (dragItem) return;

    setIsResizing(true);

    mouseDownRef.current = {
      //@ts-ignore
      dayIndex: mousePositionRef.current.dayIndex,
      lastDeltaDay: 0,
      //@ts-ignore
      pointY: e.clientY + scrollRef?.current.scrollTop,
      hour: item.hour || 0,
      lastDeltaHour: 0,
    };

    if (edge === ResizeDirection.right || edge === ResizeDirection.left) {
      autoscroller?.current.enable();
    }
    if (edge === ResizeDirection.bottom) {
      autoscroller?.current.enableVertical();
    }
    const upHandler = () => {
      setIsResizing(false);
      if (edge === ResizeDirection.right || edge === ResizeDirection.left) {
        //@ts-ignore
        if (mousePositionRef.current.dayIndex - mouseDownRef.current.dayIndex != 0) {
          // Update timeline to API
        }
      }
      if (edge === ResizeDirection.bottom) {
        // Update hour to API
      }

      autoscroller?.current.disable();

      window.removeEventListener('mousemove', moveHandler);
    };
    const moveHandler = async (e: MouseEvent) => {
      let newTimeRangeValue = { from: item.startDate, to: item.endDate };
      let deltaDay = 0;
      //@ts-ignore
      deltaDay = mousePositionRef.current.dayIndex - mouseDownRef.current.dayIndex;
      const mouseDownlastDeltaDay = mouseDownRef.current.lastDeltaDay;
      if (deltaDay !== mouseDownlastDeltaDay) {
        mouseDownRef.current.lastDeltaDay = deltaDay;
        switch (edge) {
          case ResizeDirection.left:
            {
              const dayAdded = w - deltaDay > 0 ? deltaDay : w - 1;
              const newFrom = dayjs(newTimeRangeValue.from, ITEM_DATE_FORMAT)
                .clone()
                .add(dayAdded, 'day');
              newTimeRangeValue = {
                ...newTimeRangeValue,
                from: newFrom.format(ITEM_DATE_FORMAT),
              };
              console.log(newFrom);
            }
            break;

          case ResizeDirection.right:
            {
              const dayAdded = deltaDay + w > 0 ? deltaDay : 1 - w;
              const newTo = dayjs(newTimeRangeValue.to, ITEM_DATE_FORMAT)
                .clone()
                .add(dayAdded, 'day');
              newTimeRangeValue = {
                ...newTimeRangeValue,
                to: newTo.format(ITEM_DATE_FORMAT),
              };
            }
            break;

          default:
            break;
        }
        dispatch(
          setItemsById({
            ...itemsById,
            [id]: {
              ...itemsById[id],
              startDate: newTimeRangeValue.from,
              endDate: newTimeRangeValue.to,
            },
          }),
        );
        if (deltaDay + w > 0 || w - deltaDay > 0) {
          dispatch(buildRows(item.userIds));
        }
      }
      if (edge === ResizeDirection.bottom) {
        resizeItemHour(e);
      }
    };
    window.addEventListener('mouseup', upHandler, { once: true });

    window.addEventListener('mousemove', moveHandler);
  };

  return (dragItem && dragItem.item.id == id) || item.isPlaceHolder ? (
    <div
      className={`absolute opacity-40 rounded-md bg-blue-500 `}
      style={{
        top: `${y * heightPerHour + MARGIN_TOP}px`,
        height: `${getHeightByItem(heightPerHour, item, 8)}px`,
        width: `${w * cellWidth - MARGIN_RIGHT}px`,
        left: `${x * cellWidth + MARGIN_LEFT}px`,
        backgroundColor: '#3451b2',
      }}
    ></div>
  ) : (
    <div
      id={id}
      className='absolute touch-none cursor-pointer z-[2] tooltip-target'
      onMouseDown={handleMouseDown}
      style={{
        top: `${y * heightPerHour + MARGIN_TOP}px`, //item position
        height: `${getHeightByItem(heightPerHour, item, 8)}px`,
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
            className={`truncate px-2 flex gap-2 items-center`}
            style={{ minHeight: MIN_HEIGHT_HOURS * heightPerHour }}
          >
            <p className='text-xs' style={{ color: textColor }}>
              {item.name}
            </p>
            {/* {isOverdue && <CustomIcon name='ti ti-alert-circle' className='text-yellow-400 ' />} */}
          </div>
          <div className='flex items-end justify-end p-1' style={{ color: textColor }}>
            <span className='leading-none'>{convertMinuteToHumanRead(item.hour * 60)}</span>
          </div>
        </div>

        <div
          className='top-0 left-[-3px] w-[6px] h-full absolute cursor-ew-resize '
          onMouseDown={(e) => {
            e.stopPropagation();
            onItemResizeStart(e, ResizeDirection.left);
          }}
        />

        <div
          className='top-0 right-[-3px] w-[6px] h-full absolute cursor-ew-resize '
          onMouseDown={(e) => {
            e.stopPropagation();
            onItemResizeStart(e, ResizeDirection.right);
          }}
        />

        <div
          className='left-0 bottom-[-2x] h-[7px] w-full absolute cursor-ns-resize '
          onMouseDown={(e) => {
            e.stopPropagation();
            onItemResizeStart(e, ResizeDirection.bottom);
          }}
        />
      </div>
    </div>
  );
};
