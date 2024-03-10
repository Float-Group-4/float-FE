import { useAppSelector } from '@hooks/reduxHooks';
import { Dayjs } from 'dayjs';
import {
  MouseEvent,
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
import { CALENDAR_BAR_HEIGHT } from './Board/common/constant';
import { Autoscroller, DragInfo, DragItemV2, ScheduleContextType } from './Board/common/type';
import { useAutoscroller } from './Board/common/hook';

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
  setDragItemV2: (_: DragItemV2 | null) => {},
  onItemDragStartV2: (_: DragItemV2) => {},
  onItemDragV2: () => {},
  onItemDragStopV2: () => {},
  onMouseMoveOutOfBoard: () => {},
  contextMenuPosition: {},
  setContextMenuPosition: () => {},
});

export const useScheduleContext = () => {
  return useContext(ScheduleContext);
};

export const ScheduleContextWrapper = ({ children }: { children: ReactNode }) => {
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
  const [dragItemV2, setDragItemV2] = useState<DragItemV2 | null>(null);
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

  const onCellDrag = () => {};
  const onTimeRangeDrag = () => {};

  /* -------------------------- FastForward and JumpToItem ------------------------- */

  const fastForward = (destinationWeekIndex: number) => {};

  const fastForwardDate = (destinationDay: string | Dayjs) => {};

  const jumpToItem = (x: number, y: number) => {};

  /* -------------------------- DraggingV2 Item Actions ------------------------- */

  const onItemDragStartV2 = (dragItem: DragItemV2) => {};

  const onItemDragV2 = async () => {};

  const onItemDragStopV2 = async () => {};

  return (
    <ScheduleContext.Provider
      value={{
        autoscroller,
        scrollRef,
        mousePositionRef,
        dragInfo,
        selectionRef,
        timeRangeSelectionRef,
        dragItem: dragItemV2,
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
        setDragItemV2,
        onItemDragStartV2,
        onItemDragV2,
        onItemDragStopV2,
        onMouseMoveOutOfBoard,
        contextMenuPosition,
        setContextMenuPosition,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
