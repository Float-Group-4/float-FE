import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import dayjs, { Dayjs } from 'dayjs';
import {
  MouseEvent,
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
import { CALENDAR_BAR_HEIGHT, ITEM_DATE_FORMAT, STARTING_POINT } from './Board/common/constant';
import {
  Allocation,
  Autoscroller,
  DragInfo,
  DragItem,
  ScheduleContextType,
  Status,
  TimeOff,
} from './Board/common/type';
import { useAutoscroller } from './Board/common/hook';
import {
  setItemPlaceHolder,
  setItemsById,
  setTimeOffItemPlaceHolder,
  setTimeOffItemsById,
} from '../../../redux/general/generalSlice';
import { getNewDateByDayIndex } from './Board/common/helper';
import { buildRows, calculateScheduledTime } from '../../../redux/schedule/thunk';
import { setItemActivity } from '../../../redux/activity/activitySlice';
import { useSnackBar } from '@base/hooks/useSnackbar';
import axios from 'axios';

export const ScheduleContext = createContext<ScheduleContextType>({
  autoscroller: null,
  scrollRef: null,
  mousePositionRef: { current: {} },
  dragInfo: { current: {} },
  selectionRef: null,
  timeRangeSelectionRef: null,
  dragItem: null,
  dragItemRef: null,
  status: null,
  allocation: null,
  timeOff: null,
  setTimeOff: (any) => {},
  setStatus: (any) => {},
  setAllocation: (any) => {},
  boardRef: null,
  itemSearchContainerRef: { current: null },
  wrapperRef: { current: null },
  timeScoreRef: { current: null },
  calendarBarRef: { current: null },
  hoverRef: { current: null },
  hoverRelatedDateCellRef: { current: null },
  rowHoverId: null,
  oldHoverPositionRef: { current: null },
  setRowHoverId: (_: string) => {},
  trackMouse: () => {},
  onCellDrag: () => {},
  fastForward: () => {},
  fastForwardDate: () => {},
  jumpToItem: () => {},
  setDragItem: (_: DragItem | null) => {},
  onItemDragStart: (_: DragItem) => {},
  onItemDrag: () => {},
  onItemDragStop: () => {},
  onMouseMoveOutOfBoard: () => {},
  contextMenuPosition: {},
  setContextMenuPosition: () => {},
  addItemModalRef: {
    current: {
      openAddItemModal() {},
    },
  },
  mainModalRef: {
    current: {
      openMainModal(_) {},
    },
  },
});

export const useScheduleContext = () => {
  return useContext(ScheduleContext);
};

export const ScheduleContextWrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { enqueueErrorBar } = useSnackBar();
  const usersById = useAppSelector((state) => state.general.usersById);
  const itemsById = useAppSelector((state) => state.general.itemsById);
  const timeOffItemsById = useAppSelector((state) => state.general.timeOffItemsById);
  const { mainCellWidth, cellWidth, timeRange } = useAppSelector(
    (state) => state.scheduleMeasurement,
  );
  const oldHoverPositionRef = useRef<{ dayIndex: number; rowId: string; weekIndex: number } | null>(
    null,
  );

  const boardRef = useRef<any>();
  const scrollRef = useRef<any>();
  const mousePositionRef = useRef<any>();
  const dragInfo = useRef<DragInfo | null>();
  const timeScoreRef = useRef<{
    scheduledTime: number;
    unscheduledTime: number;
    totalTime: number;
    totalOT: number;
  }>({
    scheduledTime: 0,
    unscheduledTime: 0,
    totalTime: 0,
    totalOT: 0,
  });

  const selectionRef = useRef<any>();
  const timeRangeSelectionRef = useRef<any>();
  const calendarBarRef = useRef<any>(null);
  const autoscroller: RefObject<Autoscroller> = useAutoscroller(scrollRef);
  const dragItemRef = useRef<any>();
  const itemSearchContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [dragItem, setDragItem] = useState<DragItem | null>(null);
  const [allocation, setAllocation] = useState<Allocation | null>(null);
  const [timeOff, setTimeOff] = useState<TimeOff | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const hoverRef = useRef<HTMLDivElement | null>(null);
  const hoverRelatedDateCellRef = useRef<HTMLDivElement | null>(null);
  const [rowHoverId, setRowHoverId] = useState<string | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: null,
    y: null,
    itemId: null,
  });

  const addItemModalRef = useRef<any>();
  const mainModalRef = useRef<any>();

  /* -------------------------- Tracking Mouse on Board------------------------- */

  const trackMouse = (e: MouseEvent, rowId: string | null) => {
    const { clientX, clientY } = e;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - CALENDAR_BAR_HEIGHT;
    const weekIndex = Math.floor(x / mainCellWidth);
    const dayIndex = Math.floor(x / cellWidth);

    if (
      (!oldHoverPositionRef.current ||
        rowHoverId !== rowId ||
        oldHoverPositionRef.current.dayIndex !== dayIndex) &&
      rowId
    ) {
      oldHoverPositionRef.current = { dayIndex, rowId, weekIndex };
      setRowHoverId(rowId);
    }
    if (hoverRef.current && hoverRelatedDateCellRef.current && rowId) {
      hoverRef.current.style.left = `${dayIndex * cellWidth}px`;
      hoverRef.current.style.width = `${cellWidth}px`;

      hoverRelatedDateCellRef.current.style.left = `${dayIndex * cellWidth}px`;
      hoverRelatedDateCellRef.current.style.width = `${cellWidth}px`;
    }
    if (!mousePositionRef.current) {
      mousePositionRef.current = { clientX, clientY, x, y, weekIndex, dayIndex, rowId };
      return;
    }
    mousePositionRef.current.clientX = clientX;
    mousePositionRef.current.clientY = clientY;
    mousePositionRef.current.x = x;
    mousePositionRef.current.y = y;

    const oldPosition = mousePositionRef.current;
    if (oldPosition.dayIndex !== dayIndex || oldPosition.rowId !== rowId || rowId === null) {
      mousePositionRef.current = { ...oldPosition, dayIndex, weekIndex, rowId };
      //Hover highlight
    }
    if (dragInfo.current?.isCreating) {
      onCellDrag();
    }
    if (dragInfo.current?.isTimeRangeSelect && calendarBarRef && calendarBarRef.current) {
      const x = clientX - calendarBarRef.current.getBoundingClientRect().left;
      const weekIndex = Math.floor(x / mainCellWidth);
      const dayIndex = Math.floor(x / cellWidth);
      mousePositionRef.current = { ...mousePositionRef.current, x, weekIndex, dayIndex };

      onTimeRangeDrag();
    }
  };

  /* --------------------------  Mouse move out of component------------------------- */
  const onMouseMoveOutOfBoard = () => {};

  /* -------------------------- Cell Dragging Actions ------------------------- */

  const onCellDrag = () => {
    if (!dragInfo.current) return;
    const { smp } = dragInfo.current;
    if (smp) {
      dragInfo.current.emp = mousePositionRef.current;
      const start = Math.min(smp.dayIndex, mousePositionRef.current.dayIndex);
      const end = Math.max(smp.dayIndex, mousePositionRef.current.dayIndex);
      selectionRef.current.style.left = `${start * cellWidth}px`;
      selectionRef.current.style.width = `${(end - start + 1) * cellWidth}px`;
    }
  };
  const onTimeRangeDrag = () => {
    if (!dragInfo.current) return;
    const { smp } = dragInfo.current;
    if (smp) {
      dragInfo.current.emp = mousePositionRef.current;
      const start = Math.min(smp.dayIndex, mousePositionRef.current.dayIndex);
      const end = Math.max(smp.dayIndex, mousePositionRef.current.dayIndex);
      if (!timeRangeSelectionRef.current) return;
      timeRangeSelectionRef.current.style.left = `${start * cellWidth}px`;
      timeRangeSelectionRef.current.style.width = `${(end - start + 1) * cellWidth}px`;
      timeRangeSelectionRef.current.style.cursor = `grabbing !important`;
    }
  };

  /* -------------------------- FastForward and JumpToItem ------------------------- */

  const fastForward = (destinationWeekIndex: number) => {
    if (destinationWeekIndex < 0) return;
    if (scrollRef) {
      scrollRef.current.scrollTo({ left: destinationWeekIndex * mainCellWidth });
    }
  };

  const fastForwardDate = (destinationDay: string | Dayjs) => {
    if (!destinationDay) return;
    const date = dayjs(destinationDay, ITEM_DATE_FORMAT);
    if (!date.isValid()) return;
    const dayIndex = date.diff(STARTING_POINT, 'days');
    if (scrollRef) {
      scrollRef.current.scrollTo({ left: (dayIndex - 1) * cellWidth });
    }
  };

  const jumpToItem = (x: number, y: number) => {};

  /* -------------------------- Dragging Item Actions ------------------------- */

  const onItemDragStart = (dragItem: DragItem) => {
    switch (dragItem.item.type) {
      case 'item':
        dispatch(setItemPlaceHolder({ id: dragItem.item.id, isPlaceHolder: true }));
        break;
      case 'timeOffItem':
        dispatch(setTimeOffItemPlaceHolder({ id: dragItem.item.id, isPlaceHolder: true }));
        break;
      default:
        break;
    }

    scrollRef.current.style.cursor = 'grabbing';
    const smp = mousePositionRef.current;

    //@ts-ignore
    dragInfo.current = {
      rowId: dragItem.rowId,
      smp,
      dayDelta: 0,
      itemId: dragItem.item.id,
      originalItem: dragItem.item,
      duration: Math.floor(dragItem!.width / cellWidth) - 1,
      isFromSearchBox: dragItem.isFromSearchBox,
      isWaiting: dragItem.isFromSearchBox, // Wait for item drag out of search box
    };

    // dispatch(buildRows(owner));

    autoscroller.current!.enable();
  };

  const onItemDrag = async () => {
    if (!dragItem) return;

    const di = dragInfo.current;
    const mp = mousePositionRef.current;

    const prevRowId = di!.rowId;
    const curRowId = mp.rowId;

    const padding = Math.floor((dragItem!.px * 1.0) / cellWidth);
    const paddingIndex = padding < 0 ? padding + 1 : padding;
    const curDay = mp.dayIndex + (dragInfo.current?.isFromSearchBox ? 0 : paddingIndex);
    const dayDelta = curDay - di!.smp?.dayIndex;
    if (di!.dayDelta !== dayDelta || prevRowId !== curRowId) {
      di!.dayDelta = dayDelta;
      di!.rowId = curRowId;

      //--- Horizontal drag ------

      const _day = getNewDateByDayIndex(curDay);
      const newStartDate = dayjs(_day).format(ITEM_DATE_FORMAT);
      const newEndDate = dayjs(newStartDate).add(di!.duration!, 'days').format(ITEM_DATE_FORMAT);

      //--- Vertical drag ------
      switch (dragItem.item.type) {
        case 'item':
          dispatch(
            setItemsById({
              ...itemsById,
              [dragItem!.item.id]: {
                ...itemsById[dragItem!.item.id],
                userIds: [curRowId],
                startDate: newStartDate,
                endDate: newEndDate,
              },
            }),
          );
          break;
        case 'timeOffItem':
          dispatch(
            setTimeOffItemsById({
              ...timeOffItemsById,
              [dragItem!.item.id]: {
                ...timeOffItemsById[dragItem!.item.id],
                userIds: [curRowId],
                startDate: newStartDate,
                endDate: newEndDate,
              },
            }),
          );
          break;
        default:
          break;
      }

      const affectRow = [prevRowId!, curRowId];
      dispatch(buildRows(affectRow));
    }
  };

  const onItemDragStop = async () => {
    autoscroller.current!.disable();
    scrollRef.current.style.cursor = 'auto';
    const originalItem = dragInfo.current!.originalItem;
    const itemType = dragItem?.item.type || '';
    dispatch(setItemPlaceHolder({ id: originalItem!.id, isPlaceHolder: false }));
    dragInfo.current = null;
    dispatch(setItemActivity(null));
    const item =
      itemType == 'item' ? itemsById[originalItem!.id] : timeOffItemsById[originalItem!.id];
    const userId = item?.userIds[0] || {};
    const { from, to } =
      {
        from: dayjs(item.startDate).toISOString() || '',
        to: dayjs(item.endDate).toISOString() || '',
      } || {};
    const hour = item.hour ? item.hour : 0;
    if (timeRange) {
      dispatch(calculateScheduledTime([...Object.keys(usersById)]));
    }
    const data =
      itemType == 'item'
        ? {
            teamMemberId: userId || '',
            startDate: from,
            endDate: to,
            workHours: hour,
          }
        : {
            teamMemberId: userId || '',
            startDate: from,
            endDate: to,
          };
    const itemId = item?.id || '';
    updateItemToDatabase(itemId, itemType, data);
  };

  const updateItemToDatabase = async (itemId: string, itemType: string, data: any) => {
    try {
      const endpoint =
        itemType == 'item'
          ? `${import.meta.env.VITE_FRONTEND_BASE_URL}/allocation/${itemId}`
          : `${import.meta.env.VITE_FRONTEND_BASE_URL}/time-offs/${itemId}`;

      const response = await axios.patch(endpoint, data);
    } catch (err: any) {
      console.log('ERROR: ', err.message);
      enqueueErrorBar(err.message || '');
    }
  };

  return (
    <ScheduleContext.Provider
      value={{
        autoscroller,
        scrollRef,
        mousePositionRef,
        dragInfo,
        selectionRef,
        status,
        allocation,
        timeOff,
        setTimeOff,
        setStatus,
        setAllocation,
        timeRangeSelectionRef,
        dragItem: dragItem,
        dragItemRef,
        boardRef,
        itemSearchContainerRef,
        wrapperRef,
        timeScoreRef,
        calendarBarRef,
        hoverRef,
        hoverRelatedDateCellRef,
        oldHoverPositionRef,
        rowHoverId,
        setRowHoverId,
        trackMouse,
        onCellDrag,
        fastForward,
        fastForwardDate,
        jumpToItem,
        setDragItem,
        onItemDragStart,
        onItemDrag,
        onItemDragStop,
        onMouseMoveOutOfBoard,
        contextMenuPosition,
        setContextMenuPosition,
        addItemModalRef,
        mainModalRef,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
