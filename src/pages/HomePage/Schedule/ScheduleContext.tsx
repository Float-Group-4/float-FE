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
import { Autoscroller, DragInfo, DragItem, ScheduleContextType } from './Board/common/type';
import { useAutoscroller } from './Board/common/hook';
import { setItemPlaceHolder } from '../../../redux/general/generalSlice';

export const ScheduleContext = createContext<ScheduleContextType>({
  autoscroller: null,
  scrollRef: null,
  mousePositionRef: { current: {} },
  dragInfo: { current: {} },
  selectionRef: null,
  timeRangeSelectionRef: null,
  dragItem: null,
  dragItemRef: null,
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
});

export const useScheduleContext = () => {
  return useContext(ScheduleContext);
};

export const ScheduleContextWrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { mainCellWidth, cellWidth } = useAppSelector((state) => state.scheduleMeasurement);
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
  const hoverRef = useRef<HTMLDivElement | null>(null);
  const hoverRelatedDateCellRef = useRef<HTMLDivElement | null>(null);
  const [rowHoverId, setRowHoverId] = useState<string | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: null,
    y: null,
    itemId: null,
  });

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
  const onTimeRangeDrag = () => {};

  /* -------------------------- FastForward and JumpToItem ------------------------- */

  const fastForward = (destinationWeekIndex: number) => {};

  const fastForwardDate = (destinationDay: string | Dayjs) => {
    console.log(destinationDay);
    if (!destinationDay) return;
    const date = dayjs(destinationDay, ITEM_DATE_FORMAT);
    console.log(destinationDay, date, scrollRef);
    if (!date.isValid()) return;
    const dayIndex = date.diff(STARTING_POINT, 'days');
    if (scrollRef) {
      scrollRef.current.scrollTo({ left: (dayIndex - 1) * cellWidth });
    }
  };

  const jumpToItem = (x: number, y: number) => {};

  /* -------------------------- Dragging Item Actions ------------------------- */

  const onItemDragStart = (dragItem: DragItem) => {
    console.log(dragItem);
    dispatch(setItemPlaceHolder({ id: dragItem.item.id, isPlaceHolder: true }));

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

  const onItemDrag = async () => {};

  const onItemDragStop = async () => {};

  return (
    <ScheduleContext.Provider
      value={{
        autoscroller,
        scrollRef,
        mousePositionRef,
        dragInfo,
        selectionRef,
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
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
