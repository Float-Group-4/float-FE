import { useAppSelector } from '@hooks/reduxHooks';
import React, { MouseEvent, memo, useRef, useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { isNonWorkingDay } from '../../../../../utilities/helper';
import { useScheduleContext } from '../../ScheduleContext';
import { ITEM_MIN_HEIGHT, MARGIN_TOP, WORKLOAD_ROW_HEIGHT } from '../common/constant';
import { dayIndexToDay, getActualRowHeight } from '../common/helper';
import { SideCell } from './Cells/SideCell';
import { ItemCard } from './Items/ItemCard';

export default memo(function Row({ userId, className }: { userId: string; className: string }) {
  const {
    trackMouse,
    dragInfo,
    mousePositionRef,
    selectionRef,
    autoscroller,
    hoverRef,
    rowHoverId,
  } = useScheduleContext();
  const rowRef = useRef<HTMLDivElement>(null);

  const { cellWidth, heightPerHour, cellBaseHeight } = useAppSelector(
    (state) => state.scheduleMeasurement,
  );
  const { displayingWeeks } = useAppSelector((state) => state.schedule);

  const isWorkloadMode = false;
  const workloadRow: any = {};

  const rowMap = useAppSelector((state) => state.general.rowMap[userId]);

  const rowHeight = getActualRowHeight(
    rowMap.height,
    heightPerHour,
    cellBaseHeight,
    isWorkloadMode,
  );
  //Offset is used to hide the hover under SideCell
  const heightCalculated =
    isWorkloadMode && !workloadRow[userId]?.isNotCollapse ? WORKLOAD_ROW_HEIGHT : rowHeight + 1;
  const [isCreating, setIsCreating] = useState(false);
  const isOffWeekend = useAppSelector((state) => state.settings.isOffWeekend);
  const isHiddenWeekend = useAppSelector((state) => state.settings.isHiddenWeekend);

  // const defaultHour = useDefaultHour();
  //Select schedule for user
  const defaultHours = 8;
  const isHovering = () => (rowHoverId === userId ? true : false);

  const handleOnMouseDown = (e: MouseEvent) => {};

  return (
    <VisibilitySensor partialVisibility>
      {({ isVisible }: { isVisible: boolean }) => {
        return (
          <div
            ref={rowRef}
            className={`relative flex w-full ${className} ${isVisible ? 'visible' : 'invisible'}`}
            style={{
              height: `${heightCalculated}px`,
              touchAction: `none`,
            }}
            key={userId}
            id={userId.toString()}
            onMouseMove={(e) => {
              trackMouse(e, userId);
              if (hoverRef?.current) {
                hoverRef.current.style.height = `${heightCalculated}px`;
                hoverRef.current.style.top = `1px`;
              }
            }}
          >
            {isHovering() && (
              <div
                ref={hoverRef}
                id={`${userId}`}
                className='!absolute bg-primary top-0 !z-[-1] opacity-20'
              ></div>
            )}

            {isVisible && (
              <>
                <SideCell userId={userId} />
                <div
                  className={`relative w-full h-full border-b border-uiBorderOnSecondary`}
                  onMouseDown={handleOnMouseDown}
                  onPointerDown={(e) => e.stopPropagation()}
                  style={{
                    touchAction: `none`,
                  }}
                >
                  {isCreating && (
                    <div
                      ref={selectionRef}
                      className='absolute h-full bg-primaryOnSecondary opacity-30'
                      style={{
                        width: `${cellWidth}px`,
                        height: `${heightCalculated}px`,
                        // @ts-ignore
                        left: `${cellWidth * dragInfo.current?.dayIndex}px`,
                      }}
                    />
                  )}

                  <div
                    className={`relative w-full h-full`}
                    style={{
                      height: `${rowHeight + 1 - (isWorkloadMode ? WORKLOAD_ROW_HEIGHT : 0)}px`,
                    }}
                  >
                    {rowMap.items.map((id: string) => {
                      return <ItemCard key={id} id={id} rowId={rowMap.id} />;
                    })}
                    {rowMap.dayCell &&
                      rowMap.items &&
                      Object.keys(rowMap.dayCell).map((dayIndex: string) => {
                        const idx = parseInt(dayIndex);
                        const defaultHourForDay = 8;
                        const currDayCell = rowMap.dayCell[idx];
                        const itemY = rowMap.itemPosition[currDayCell.firstOTItem.id];
                        const overtimeDisplay = currDayCell.overTimeDisplay;
                        const _isNonWorking = isNonWorkingDay(idx);
                        let top = 0;
                        let height = rowHeight - (isWorkloadMode ? WORKLOAD_ROW_HEIGHT : 0);

                        if (!isNaN(itemY) || (_isNonWorking && isOffWeekend)) {
                          if (!_isNonWorking || !isOffWeekend) {
                            top = itemY + defaultHourForDay - overtimeDisplay;
                            top = Math.max(top, ITEM_MIN_HEIGHT) * heightPerHour + MARGIN_TOP;
                            height = rowHeight - top - (isWorkloadMode ? WORKLOAD_ROW_HEIGHT : 0);
                          }
                          return (
                            currDayCell.dayCapacity > defaultHourForDay &&
                            currDayCell.firstOTItem &&
                            ((_isNonWorking && !isOffWeekend) || !_isNonWorking) && (
                              <div
                                key={dayIndex}
                                style={{
                                  top: `${top}px`,
                                  left: `${idx * cellWidth}px`,
                                  height: `${height}px`,
                                  width: `${cellWidth}px`,
                                }}
                                className='bg-[#E8101033] bg-opacity-25 absolute rounded-sm border-t-2 border-[#EC1010]'
                              ></div>
                            )
                          );
                        } else {
                          return <React.Fragment key={dayIndex} />;
                        }
                      })}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      }}
    </VisibilitySensor>
  );
});
