import { MouseEvent, MutableRefObject } from 'react';
import { Dayjs } from 'dayjs';
import { Item } from '../../../../../types/primitive/item.interface';

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
  item?: Item | null;
  rowId: string | null;
  stableRowId: number | null;
  isPlanning?: boolean;
  padding?: { px: number; py: number };
  dayDelta?: number;
  itemId?: string;
  originalItem?: Item;
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
  item: Item;
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
  onItemDragStart: (_: DragItem) => void;
  onItemDrag: () => void;
  onItemDragStop: () => void;
  onMouseMoveOutOfBoard: () => void;
  contextMenuPosition: any;
  setContextMenuPosition: any;
  addItemModalRef: MutableRefObject<{ openAddItemModal: (_?: any) => void }>;
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
