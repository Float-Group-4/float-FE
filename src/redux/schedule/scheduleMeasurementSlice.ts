import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LocalStorageKey, ViewType } from '../../types/enums';
import { TimeRange } from '@pages/HomePage/Schedule/Board/common/type';
import {
  CELL_WIDTH_BY_VIEW_TYPE,
  DEFAULT_MIN_HOURS,
  MARGIN_BOTTOM,
  MARGIN_TOP,
} from '@pages/HomePage/Schedule/Board/common/constant';
import { USER_CELL_HEIGHT } from '@constants/home';

interface ScheduleMeasurementState {
  viewType: ViewType;
  totalWeekCols: number;
  boardWidth: number;
  mainCellWidth: number;
  cellWidth: number;
  cornerCellWidth: number;
  heightPerHour: number;
  cellBaseHeight: number;
  isCollapsed: boolean;
  isCollapseShow: boolean;
  timeRange: TimeRange | null;
  scheduledTime:
    | Record<number, { scheduledTime: number; totalTime: number; overtime: number }>
    | Record<string, any>;
  groupItemsByStatus: Record<number, Record<string, { color: string; countItem: number }>>;
  amountDayInWeek: number;
}
const initialState: ScheduleMeasurementState = {
  viewType: ViewType.weeks,
  totalWeekCols: 100,
  boardWidth: 63000,
  mainCellWidth: 630,
  cellWidth: 90,
  cornerCellWidth: 270,
  heightPerHour: 8,
  // cellBaseHeight: 8 * DEFAULT_MIN_HOURS + MARGIN_TOP + MARGIN_BOTTOM,
  cellBaseHeight: USER_CELL_HEIGHT,
  isCollapsed: false,
  isCollapseShow: false,
  timeRange: null,
  scheduledTime: {},
  groupItemsByStatus: {},
  amountDayInWeek: 7,
};
const scheduleMeasurementSlice = createSlice({
  name: 'scheduleMeasurement',
  initialState,
  reducers: {
    setCornerCellWidth: (state, action) => {
      state.cornerCellWidth = action.payload;
    },
    extendBoardWidth: (state) => {
      state.totalWeekCols += 50;
      state.boardWidth = state.mainCellWidth * state.totalWeekCols;
    },
    setViewType: (state, action: PayloadAction<ViewType>) => {
      state.viewType = action.payload;
      state.cellWidth = CELL_WIDTH_BY_VIEW_TYPE[action.payload];
      state.mainCellWidth = state.cellWidth * state.amountDayInWeek;
      state.boardWidth = state.mainCellWidth * state.totalWeekCols;
      state.cellBaseHeight = state.heightPerHour * DEFAULT_MIN_HOURS + MARGIN_TOP + MARGIN_BOTTOM;
    },
    toggleCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed;
      state.cornerCellWidth = state.isCollapsed ? 90 : 270;
    },
    toggleCollapseShow: (state, action) => {
      state.isCollapseShow = action.payload;
    },
    setTimeRange: (state, action: PayloadAction<TimeRange | null>) => {
      if (action.payload) {
        const { from, to } = action.payload;
        if (from.dayIndex > to.dayIndex) {
          state.timeRange = { from: to, to: from };
        } else {
          state.timeRange = { from, to };
        }
        localStorage.setItem(`${LocalStorageKey.timeRange}`, `${JSON.stringify(state.timeRange)}`);
      } else {
        state.timeRange = null;
        localStorage.setItem(`${LocalStorageKey.timeRange}`, `${JSON.stringify({})}`);
      }
    },
    setScheduledTime: (
      state,
      action: PayloadAction<{
        [uid: number]: { scheduledTime: number; totalTime: number; OT: number };
      } | null>,
    ) => {
      if (action.payload) {
        state.scheduledTime = { ...state.scheduledTime, ...action.payload };
      } else {
        state.scheduledTime = {};
      }
    },
    setGroupItemsByStatus: (
      state,
      action: PayloadAction<{
        [uid: number]: Record<string, { color: string; countItem: number }>;
      } | null>,
    ) => {
      if (action.payload) {
        state.groupItemsByStatus = { ...state.groupItemsByStatus, ...action.payload };
      } else {
        state.groupItemsByStatus = {};
      }
    },
    setAmountDayInWeek: (state, action: PayloadAction<number>) => {
      state.totalWeekCols = Math.ceil(
        (state.amountDayInWeek * state.totalWeekCols) / action.payload,
      );
      state.amountDayInWeek = action.payload;
      state.mainCellWidth = state.cellWidth * action.payload;
      state.boardWidth = state.mainCellWidth * state.totalWeekCols;
    },
  },
});

export const {
  setViewType,
  extendBoardWidth,
  setGroupItemsByStatus,
  toggleCollapse,
  toggleCollapseShow,
  setTimeRange,
  setScheduledTime,
  setAmountDayInWeek,
} = scheduleMeasurementSlice.actions;
export default scheduleMeasurementSlice;
