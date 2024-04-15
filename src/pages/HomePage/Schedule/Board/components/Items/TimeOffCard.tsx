import dayjs from 'dayjs';
import { ITEM_DATE_FORMAT, MARGIN_LEFT, MARGIN_RIGHT, MARGIN_TOP } from '../../common/constant';

import { HEIGHT_PER_HOUR, MIN_HEIGHT_HOURS, TASK_DEFAULT_COLOR } from '@constants/home';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { useScheduleContext } from '@pages/HomePage/Schedule/ScheduleContext';
import {
  convertMinuteToHumanRead,
  getContrastColor,
} from '../../../../../../../src/utilities/helper';
import { getHeightByItem, getHorizontalDimensions, roundToQuarter } from '../../common/helper';
import PlaceholderItem from './PlaceholderItem';
import { useEffect, useRef, useState } from 'react';
import { ResizeDirection } from '../../../../../../../src/types/enums';
import { buildRows } from '../../../../../../../src/redux/schedule/thunk';
import { setTimeOffItemsById } from '../../../../../../../src/redux/general/generalSlice';
import _ from 'lodash';

export const TimeOffItemCard = ({ id, rowId }: { id: string; rowId: string }) => {
  const dispatch = useAppDispatch();
  const { setDragItem, mousePositionRef, autoscroller, dragItem, scrollRef } = useScheduleContext();
  const item = useAppSelector((state) => state.general.timeOffItemsById[id]);
  const cellWidth = useAppSelector((state) => state.scheduleMeasurement.cellWidth);
  const timeOffItemsById = useAppSelector((state) => state.general.timeOffItemsById);

  const mouseDownRef = useRef<any>();

  if (!item) return <></>;

  const { x, w } = getHorizontalDimensions({ from: item.startDate, to: item.endDate });

  const handleMouseDown = (e: React.MouseEvent) => {
    const mp = mousePositionRef.current;
    e.stopPropagation();
    if (e.button !== 0 || !mp) return;

    const rect = e.currentTarget!.getBoundingClientRect();
    const px = rect.left - e.clientX;
    const py = rect.top - e.clientY;

    setDragItem({
      item: item,
      rowId: rowId,
      element: (
        <div
          className={` w-full absolute touch-none`}
          style={{
            height: '100%',
            width: `${w * cellWidth}px`,
            background: `linear-gradient(-45deg, lightblue 5%, white 5%, white 50%, lightblue 50%, lightblue 55%, white 55%, white) 0% 0% / 5px 5px`,
          }}
        >
          <div
            className={`text-textOnPrimary px-2 pb-1 flex flex-col justify-between truncate w-full h-full box-border`}
          >
            <div className='w-full flex justify-between'>
              <div className='flex items-center gap-1 truncate' style={{ color: `black` }}>
                <span className='truncate'>{item.reason}</span>
              </div>
            </div>
          </div>
        </div>
      ),
      offsetX: rect.left,
      offsetY: rect.top,
      width: w * cellWidth,
      height: 100,
      clientX: e.clientX,
      clientY: e.clientY,
      px,
      py,
    });
  };

  const onTimeOffItemStart = (e: React.MouseEvent) => {
    if (dragItem) return;

    mouseDownRef.current = {
      //@ts-ignore
      dayIndex: mousePositionRef.current.dayIndex,
      lastDeltaDay: 0,
      //@ts-ignore
      pointY: e.clientY + scrollRef?.current.scrollTop,
      lastDeltaHour: 0,
    };

    const upHandler = () => {
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

        dispatch(
          setTimeOffItemsById({
            ...timeOffItemsById,
            [id]: {
              ...timeOffItemsById[id],
              startDate: newTimeRangeValue.from,
              endDate: newTimeRangeValue.to,
            },
          }),
        );

        dispatch(buildRows(item.userIds));
      }
    };
    window.addEventListener('mouseup', upHandler, { once: true });

    window.addEventListener('mousemove', moveHandler);
  };

  const handleClick = () => {};

  return (
    <div
      id={id}
      onClick={handleClick}
      className='absolute touch-none cursor-pointer z-[15] tooltip-target timeoff'
      onMouseDown={handleMouseDown}
      style={{
        height: '100%',
        width: `${w * cellWidth}px`,
        left: `${x * cellWidth}px`,
      }}
    >
      <div className='relative w-full h-full text-black '>
        <div
          className={`h-full flex flex-col justify-between`}
          data-tooltip-id='item-tooltip'
          data-tooltip-content={id}
          style={{
            background: `linear-gradient(-45deg, lightblue 5%, white 5%, white 50%, lightblue 50%, lightblue 55%, white 55%, white) 0% 0% / 5px 5px`,
            border: '0.5px solid #80808020',
            overflow: 'hidden',
          }}
        >
          <div
            className={`truncate px-1 flex gap-2 items-center`}
            style={{ minHeight: MIN_HEIGHT_HOURS * HEIGHT_PER_HOUR }}
          >
            <p className='text-xs ' style={{ color: 'black' }}>
              {item.reason}
            </p>
          </div>
        </div>

        <div
          className='top-0 left-[-3px] w-[6px] h-full absolute cursor-ew-resize '
          onMouseDown={(e) => {
            onTimeOffItemStart(e);
          }}
        />

        <div
          className='top-0 right-[-3px] w-[6px] h-full absolute cursor-ew-resize '
          onMouseDown={(e) => {
            onTimeOffItemStart(e);
          }}
        />

        <div
          className='left-0 bottom-[-2x] h-[7px] w-full absolute cursor-ns-resize '
          onMouseDown={(e) => {
            onTimeOffItemStart(e);
          }}
        />
      </div>
    </div>
  );
};
