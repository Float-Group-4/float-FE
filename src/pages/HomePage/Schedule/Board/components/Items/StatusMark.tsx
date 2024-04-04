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
import _ from 'lodash';
import Toolbar from '@pages/HomePage/Schedule/Sidebar/Toolbar';
import { Tooltip } from '@mui/material';
import { ArrowRight, Flag } from '@mui/icons-material';

export const StatusMark = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { setDragItem, mousePositionRef, autoscroller, dragItem, scrollRef } = useScheduleContext();
  const item = useAppSelector((state) => state.general.statusItemsById[id]);
  const cellWidth = useAppSelector((state) => state.scheduleMeasurement.cellWidth);
  const statusItem = useAppSelector((state) => state.general.statusItemsById);

  const statusColors = [
    { title: 'Home', color: 'red' },
    { title: 'Travel', color: 'violet' },
    { title: 'Office', color: 'green' },
  ];

  const [statusColor, setStatusColor] = useState('');

  const handleStatusColor = () => {
    const colorObj = statusColors.find((obj) => obj.title === item?.name);
    setStatusColor(colorObj ? colorObj.color : 'blue');
  };

  useEffect(() => {
    handleStatusColor();
  }, [item]);

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
              width: '10px',
              height: '10px',
              bottom: '10px',
              left: `${(x + index) * cellWidth + cellWidth * 0.83}px`,
            }}
          >
            <Flag sx={{ color: statusColor, fontSize: '15px' }} />
          </div>
        </Tooltip>
      ))}
    </>
  );
};
