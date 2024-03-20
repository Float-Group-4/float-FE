import { animated, useSprings } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { arrayMoveImmutable } from 'array-move';
import { ReactNode, useEffect, useRef } from 'react';

import { WORKLOAD_ROW_HEIGHT } from '../common/constant';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { useScheduleContext } from '../../ScheduleContext';
import { getActualRowHeight, getRowY } from '../common/helper';
import { setOrder } from '../../../../../../src/redux/schedule/scheduleSlice';

export const DraggableWrapper = ({ children }: { children: ReactNode[] | null }) => {
  if (children === null) return <div></div>;
  const dispatch = useAppDispatch();
  const { autoscroller, wrapperRef } = useScheduleContext();
  const { rowDisplayType, workloadRow, isWorkloadMode } = useAppSelector((state) => state.schedule);
  const { cellBaseHeight, heightPerHour } = useAppSelector((state) => state.scheduleMeasurement);

  const rowMap = useAppSelector((state) => state.general.rowMap);

  let oriOrder = children.map((c: any) => c.key);
  const order = useRef(oriOrder);
  useEffect(() => {
    oriOrder = children.map((c: any) => c.key);

    order.current = oriOrder;
  }, [rowDisplayType]);

  const getIndexWhileMoving = (my: number, rowId: number) => {
    let curIndex = 0;
    let accumulateHeight = 0;
    const curY =
      getRowY(
        rowMap,
        rowId,
        order.current,
        heightPerHour,
        cellBaseHeight,
        isWorkloadMode,
        workloadRow,
      ) + my;
    const baseLine =
      curY +
      (isWorkloadMode && !workloadRow[rowId]?.isNotCollapse
        ? WORKLOAD_ROW_HEIGHT
        : getActualRowHeight(rowMap[rowId].height, heightPerHour, cellBaseHeight, isWorkloadMode));
    for (let i = 0; i < order.current.length - 1; i++) {
      curIndex = i;
      const curRowHeight =
        isWorkloadMode && !workloadRow[order.current[i]]?.isNotCollapse
          ? WORKLOAD_ROW_HEIGHT
          : getActualRowHeight(
              rowMap[order.current[i]].height,
              heightPerHour,
              cellBaseHeight,
              isWorkloadMode,
            );
      accumulateHeight += curRowHeight;
      const nextRowHeight =
        isWorkloadMode && !workloadRow[order.current[i + 1]]?.isNotCollapse
          ? WORKLOAD_ROW_HEIGHT
          : getActualRowHeight(
              rowMap[order.current[i + 1]].height,
              heightPerHour,
              cellBaseHeight,
              isWorkloadMode,
            );
      if (my <= 0) {
        if (curY < accumulateHeight - curRowHeight * 0.5) return curIndex;
      } else {
        if (baseLine <= accumulateHeight + nextRowHeight * 0.5) return curIndex;
      }
    }
    return curIndex + 1;
  };

  const fn =
    (_order: any[], active = false, originalIndex = 999, my = 0, rowId = 0) =>
    (index: number) => {
      return active && index === originalIndex
        ? {
            y:
              getRowY(
                rowMap,
                rowId,
                order.current,
                heightPerHour,
                cellBaseHeight,
                isWorkloadMode,
                workloadRow,
              ) + my,
            zIndex: 39,
            shadow: 15,
            immediate: (key: string) => key === 'zIndex',
          }
        : {
            y: getRowY(
              rowMap,
              oriOrder[index],
              _order,
              heightPerHour,
              cellBaseHeight,
              isWorkloadMode,
              workloadRow,
            ),
            zIndex: index,
            shadow: 0,
            immediate: !active,
          };
    };

  const [springs, api] = useSprings(children.length, fn(order.current), [rowMap, oriOrder]);
  const bind = useGesture(
    {
      onDrag: ({ args: [originalIndex, rowId], active, movement: [, my] }) => {
        const curIndex = order.current.indexOf(rowId);
        const curOnIndex = getIndexWhileMoving(my, rowId);
        const newOrder = arrayMoveImmutable(order.current, curIndex, curOnIndex);
        api.start(fn(newOrder, active, originalIndex, my, rowId));

        if (!active) {
          order.current = newOrder;
          autoscroller?.current.disableVertical();
        } else {
          autoscroller?.current.enableVertical();
        }
      },
      onDragEnd: async () => {
        dispatch(setOrder({ type: rowDisplayType, order: order.current }));
      },
    },
    {
      drag: { bounds: wrapperRef },
    },
  );

  return (
    <div ref={wrapperRef} className='h-full'>
      {springs.map((props, i) => {
        return (
          <animated.div
            //@ts-ignore
            {...bind(i, children[i].key)}
            //@ts-ignore
            key={children[i].key}
            style={{
              ...props,
              boxShadow: props.shadow.to((s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
            }}
            className='absolute w-full '
            // children={children[i]}
          >
            {children[i]}
          </animated.div>
        );
      })}
    </div>
  );
};
