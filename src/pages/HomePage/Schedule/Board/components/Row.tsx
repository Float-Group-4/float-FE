import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import React, { MouseEvent, memo, useEffect, useRef, useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { setItemActivity } from '../../../../../redux/activity/activitySlice';
import { isNonWorkingDay } from '../../../../../utilities/helper';
import { useScheduleContext } from '../../ScheduleContext';
import { ITEM_MIN_HEIGHT, MARGIN_TOP, WORKLOAD_ROW_HEIGHT } from '../common/constant';
import { getActualRowHeight } from '../common/helper';
import { SideCell } from './Cells/SideCell';
import { ItemCard } from './Items/ItemCard';
import { NonWorkItem } from './Items/NonWorkingItem';
import { TimeOffItemCard } from './Items/TimeOffCard';
import { StatusMark } from './Items/StatusMark';

export default memo(function Row({ userId, className }: { userId: string; className: string }) {
  const dispatch = useAppDispatch();
  const {
    trackMouse,
    dragInfo,
    mousePositionRef,
    selectionRef,
    autoscroller,
    hoverRef,
    rowHoverId,
    addItemModalRef,
  } = useScheduleContext();
  const rowRef = useRef<HTMLDivElement>(null);
  const itemActivity = useAppSelector((state) => state.activity.itemActivity);
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

  // const defaultHour = useDefaultHour();
  //Select schedule for user
  const defaultHours = [0, 8, 8, 8, 8, 8, 0];
  const isHovering = () => (rowHoverId === userId ? true : false);

  const handleOnMouseDown = (e: MouseEvent) => {
    if (itemActivity !== null) {
      dispatch(setItemActivity(null));
      return;
    }
    if (e.button === 0 && itemActivity === null) {
      const smp = mousePositionRef.current;
      dragInfo.current = {
        isCreating: true,
        smp,
        userId,
        emp: smp,
        isDragging: false,
        isPlanning: false,
      };
      autoscroller?.current.enable();
      setIsCreating(true);
      const handleMouseUp = () => {
        setIsCreating(false);
        console.log('Up');
        // Open Add Item Modal
        addItemModalRef.current.openAddItemModal({ dragInfo: dragInfo.current });
        dragInfo.current = {};
        document.body.removeEventListener('mouseup', handleMouseUp);
        document.body.removeEventListener('mouseleave', handleMouseUp);
        autoscroller?.current.disable();
      };
      document.body.addEventListener('mouseleave', handleMouseUp);
      document.body.addEventListener('mouseup', handleMouseUp);
    }
  };

  useEffect(() => console.log(rowMap), [null]);
  console.log(useAppSelector((state) => state.general));
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
                className='!absolute bg-gray-400 top-0 !z-[-1] opacity-20'
              ></div>
            )}

            {isVisible && (
              <>
                <SideCell userId={userId} />
                <div
                  className={`relative w-full h-full border-b border-gray-200`}
                  onMouseDown={handleOnMouseDown}
                  onPointerDown={(e) => e.stopPropagation()}
                  style={{
                    touchAction: `none`,
                  }}
                >
                  {isCreating && (
                    <div
                      ref={selectionRef}
                      className='absolute h-full bg-blue-500 opacity-30'
                      style={{
                        width: `${cellWidth}px`,
                        height: `${heightCalculated}px`,
                        // @ts-ignore
                        left: `${cellWidth * dragInfo.current?.dayIndex + 1}px`,
                      }}
                    />
                  )}

                  <div
                    className={`relative w-full h-full`}
                    style={{
                      height: `${rowHeight + 1 - (isWorkloadMode ? WORKLOAD_ROW_HEIGHT : 0)}px`,
                    }}
                  >
                    {rowMap.timeOffItems.map((id: string) => {
                      return (
                        <div key={id} className='timeoff'>
                          <TimeOffItemCard id={id} rowId={id} />
                        </div>
                      );
                    })}
                    {rowMap.statusItems.map((id: string) => {
                      return (
                        <div className='status'>
                          <StatusMark key={id} id={id} />
                        </div>
                      );
                    })}
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
                    {isOffWeekend &&
                      displayingWeeks.map((weekIdx: number) => (
                        <React.Fragment key={weekIdx}>
                          {/* Default Schedule */}
                          {/* <NonWorkItem x={weekIdx * 7 + 6} />
                            <NonWorkItem x={weekIdx * 7 + 7} /> */}
                          {/* Global Schedule */}
                          {defaultHours.map((dayCapacity: number, index: number) => {
                            const quantity = 7;
                            const dayIndex =
                              index == 0
                                ? weekIdx * quantity + quantity
                                : weekIdx * quantity + index;
                            // const _isNonWorking = isNonWorkingDay(dayIndex);
                            if (dayCapacity == 0) {
                              return <NonWorkItem x={dayIndex} key={dayIndex} />;
                            }
                          })}
                        </React.Fragment>
                      ))}
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
