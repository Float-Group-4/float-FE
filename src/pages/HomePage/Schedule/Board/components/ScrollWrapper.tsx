import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { useEffect } from 'react';
import { setCurrentWeekIndex } from '../../../../../redux/schedule/scheduleSlice';
import { useScheduleContext } from '../../ScheduleContext';
import { INITIAL_WEEK_INDEX } from '../common/constant';
import { extendBoardWidth } from '../../../../../redux/schedule/scheduleMeasurementSlice';

export const ScrollWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { boardWidth, mainCellWidth, viewType, amountDayInWeek } = useAppSelector(
    (state) => state.scheduleMeasurement,
  );
  const { currentWeekIndex } = useAppSelector((state) => state.schedule);

  const { scrollRef } = useScheduleContext();
  useEffect(() => {
    if (scrollRef) {
      scrollRef.current.scrollLeft = INITIAL_WEEK_INDEX * mainCellWidth;
    }
  }, [viewType]);
  useEffect(() => {
    if (scrollRef) {
      scrollRef.current.scrollLeft = currentWeekIndex * mainCellWidth;
    }
  }, [amountDayInWeek]);

  const onScrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const newWeekIndex = Math.floor(e.currentTarget.scrollLeft / mainCellWidth);
    if (newWeekIndex !== currentWeekIndex) {
      dispatch(setCurrentWeekIndex(newWeekIndex));
    }
    if (e.currentTarget.scrollLeft >= boardWidth * 0.95) {
      dispatch(extendBoardWidth());
    }
  };
  return (
    <div className='relative select-none' id='schedule-board'>
      <div
        ref={scrollRef}
        onScroll={onScrollHandler}
        className={`relative h-screen w-full will-change-transform overflow-auto`}
      >
        {children}
      </div>
    </div>
  );
};
