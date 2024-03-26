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
import Toolbar from '@pages/HomePage/Schedule/Sidebar/Toolbar';
import { Tooltip } from '@mui/material';

export const StatusMark = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { setDragItem, mousePositionRef, autoscroller, dragItem, scrollRef } = useScheduleContext();
  const item = useAppSelector((state) => state.general.statusItemsById[id]);
  const cellWidth = useAppSelector((state) => state.scheduleMeasurement.cellWidth);
  const statusItem = useAppSelector((state) => state.general.statusItemsById);

  const mouseDownRef = useRef<any>();

  if (!item) return <></>;

  const { x, w } = getHorizontalDimensions({ from: item.startDate, to: item.endDate });

  const days = calculateNumberOfDays(item.startDate, item.endDate);
  const itemsArray = Array.from({ length: days });

  function calculateNumberOfDays(startDateStr: string, endDateStr: string) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const differenceInMs = endDate.getTime() - startDate.getTime();
    const numberOfDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

    return numberOfDays + 1;
  }

  const handleClick = () => {};

  return (
    <>
      {itemsArray.map((_, index) => (
        <Tooltip title={item.name} key={index}>
          <div
            id={id}
            onClick={handleClick}
            className='absolute touch-none cursor-pointer z-10 tooltip-target statusMark'
            style={{
              height: '0px',
              width: '0px',
              bottom: '5%',
              left: `${(x + index) * cellWidth + cellWidth * 0.83}px`,
              borderStyle: 'solid',
              borderWidth: '0 0 10px 10px',
              borderColor: 'transparent transparent #FF4532 transparent',
              transform: 'rotate(0deg)',
            }}
          ></div>
        </Tooltip>
      ))}
    </>
  );
};
