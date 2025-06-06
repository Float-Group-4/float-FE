import { MouseEvent, MutableRefObject } from 'react';
import { Dayjs } from 'dayjs';
import { Item } from '../../../../../types/primitive/item.interface';
import { StatusItem } from 'src/types/primitive/statusItem.interface';
import { TimeOffItem } from 'src/types/primitive/timeOffItem.interface';

export enum ViewType {
  days = 'days',
  weeks = 'weeks',
  months = 'months',
}

export interface MousePosition {
  weekIndex: number;
  dayIndex: number;
  x: number;
  y: number;
  clientX: number;
  clientY: number;
  rowId: number;
}

export interface KeyboardPress {
  name: string;
  code: string;
  isMeta: boolean;
}

export interface DragInfo {
  isCreating?: boolean;
  isTimeRangeSelect?: boolean;
  smp: MousePosition;
  emp: MousePosition;
  userId: string;
  item?: Item | TimeOffItem | StatusItem | null;
  rowId: string | null;
  stableRowId: number | null;
  isPlanning?: boolean;
  padding?: { px: number; py: number };
  dayDelta?: number;
  itemId?: string;
  originalItem?: Item | TimeOffItem | StatusItem;
  duration?: number;
  isFromSearchBox?: boolean;
  isWaiting?: boolean;
}
export interface DragItem {
  clientX: number;
  clientY: number;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  element: JSX.Element;
  item: Item | TimeOffItem | StatusItem;
  isFromSearchBox?: boolean;
  rowId: string | null;
  px: number;
  py: number;
  isAddUpdate?: boolean;
}
export interface EditTaskModalDetail {
  id: number;
}

export interface Row {
  id: number;
  items: number[];
  itemPosition: Record<number, number>;
  height: number;
  dayCell: Record<
    number,
    {
      dayCapacity: number;
      firstOTItem: Omit<Item & { columnsById: Record<string, any> }, 'column_values'>;
      overTimeDisplay: number;
    }
  >;
  type?: string;
}

export interface ScheduleContextType {
  autoscroller: MutableRefObject<any> | null;
  scrollRef: MutableRefObject<HTMLDivElement> | null;
  mousePositionRef: MutableRefObject<MousePosition | Record<string, any>>;
  dragInfo: MutableRefObject<DragInfo | undefined | Record<string, any> | null>;
  selectionRef: MutableRefObject<HTMLDivElement> | null;
  timeRangeSelectionRef: MutableRefObject<HTMLDivElement> | null;
  dragItem: DragItem | null;
  dragItemRef: MutableRefObject<HTMLDivElement> | null;
  allocation: Allocation | null;
  status: Status | null;
  timeOff: TimeOff | null;
  boardRef: MutableRefObject<HTMLDivElement> | null;
  itemSearchContainerRef: MutableRefObject<HTMLDivElement | null>;
  wrapperRef: MutableRefObject<HTMLDivElement | null>;
  timeScoreRef: MutableRefObject<{
    scheduledTime: number;
    unscheduledTime: number;
    totalTime: number;
    totalOT: number;
  } | null>;
  calendarBarRef: MutableRefObject<HTMLDivElement | null>;
  hoverRef: MutableRefObject<HTMLDivElement | null>;
  hoverRelatedDateCellRef: MutableRefObject<HTMLDivElement | null>;
  rowHoverId: string | null;
  oldHoverPositionRef: MutableRefObject<{
    dayIndex: number;
    rowId: string;
    weekIndex: number;
  } | null>;
  setRowHoverId: (rowId: string) => void;
  trackMouse: (_: MouseEvent, __: string | null) => void;
  onCellDrag: () => void;
  fastForward: (_: number) => void;
  fastForwardDate: (_: string | Dayjs) => void;
  jumpToItem: (_: number, __: number) => void;
  setDragItem: (_: DragItem | null) => void;
  setTimeOff: (_: any) => void;
  setStatus: (_: any) => void;
  setAllocation: (_: any) => void;
  onItemDragStart: (_: DragItem) => void;
  onItemDrag: () => void;
  onItemDragStop: () => void;
  onMouseMoveOutOfBoard: () => void;
  contextMenuPosition: any;
  setContextMenuPosition: any;
  addItemModalRef: MutableRefObject<{ openAddItemModal: (_?: any) => void }>;
  mainModalRef: MutableRefObject<{ openMainModal: (_?: any) => void }>;
}

export interface RangeDate {
  from?: Date | null;
  to?: Date | null;
}

export interface ColorPicker {
  hex: string;
  hsl: Record<string, any>;
  hsv: Record<string, any>;
  rgb: Record<string, any>;
  oldHue: number;
  source: string;
}
export interface ItemStatus {
  label: string;
  color: string;
}

export interface Autoscroller {
  cb?: any;
  enable(): void;
  disable(): void;
  enableVertical(_: any): void;
  disableVertical(): void;
  enableHorizontal(): void;
  disableHorizontal(): void;
}

export interface TimeRange {
  from: { weekIndex: number; dayIndex: number };
  to: { weekIndex: number; dayIndex: number };
}

export interface Allocation {
  startDate: string;
  endDate: string;
  hourEachDay: number;
  startTime?: Date | number;
  endTime?: Date | number;
  id: string;
  projectId: any;
  taskId?: any;
  userId: string;
  type: string; // tentative, completed
  note: string;
  assignees: any;
}

export interface TimeOff {
  startDate: string;
  endDate: string;
  hourEachDay: number;
  startTime?: Date | number;
  endTime?: Date | number;
  id: string;
  userId: string;
  isTentative: boolean;
  reason: any;
  note: string;
  name: string;
  assignees: any;
}

export interface Status {
  startDate: string;
  endDate: string;
  type: string;
  name: string;
  color?: string;
  assignee: any;
}
