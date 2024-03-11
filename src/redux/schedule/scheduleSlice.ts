import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RowDisplayType, UserFilterType } from '../../types/enums';
import { INITIAL_WEEK_INDEX } from '../../pages/HomePage/Schedule/Board/common/constant';
import { mergeListsOrder } from '../../pages/HomePage/Schedule/Board/common/helper';

export interface UserFilterValue {
  id: number;
  name: string;
  leftAvatar: string;
}

interface ScheduleState {
  currentWeekIndex: number;
  displayingWeeks: number[];
  workloadRow: Record<number, { isNotCollapse: boolean }>;
  order: { [key in RowDisplayType]: string[] };
  userFilter: { [key in UserFilterType]: UserFilterValue[] };
  displayItems: number[];
  rowDisplayType: RowDisplayType;
  isWorkloadMode: boolean;
  selectedItemIds: number[];
  isMultiSelectMode: boolean;
}

const initialState: ScheduleState = {
  currentWeekIndex: INITIAL_WEEK_INDEX,
  displayingWeeks: [],
  workloadRow: {},
  order: { [RowDisplayType.assignees]: [], [RowDisplayType.teams]: [] },
  userFilter: { [UserFilterType.users]: [], [UserFilterType.teams]: [] },
  displayItems: [],
  rowDisplayType: RowDisplayType.assignees,
  isWorkloadMode: false,
  selectedItemIds: [],
  isMultiSelectMode: false,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setCurrentWeekIndex: (state, action) => {
      state.currentWeekIndex = action.payload;
    },
    setDisplayingWeeks: (state, action) => {
      state.displayingWeeks = action.payload;
    },
    setWorkloadRow: (
      state,
      action: PayloadAction<{ [key: number]: { isNotCollapse: boolean } }>,
    ) => {
      state.workloadRow = { ...state.workloadRow, ...action.payload };
    },
    setOrder: (state, action: PayloadAction<{ type: RowDisplayType; order: string[] }>) => {
      const { type, order } = action.payload;
      const newOrder =
        state.order[type].length > 0 ? mergeListsOrder(state.order[type], order) : order;
      Object.assign(state.order, { [type]: newOrder });
    },
    setUserFilter: (
      state,
      action: PayloadAction<{ filterList: UserFilterValue[]; type: UserFilterType }>,
    ) => {
      const { filterList, type } = action.payload;
      const userFilter = { ...state.userFilter, [type]: filterList };
      state.userFilter = userFilter;
    },
    clearFilter: (state) => {
      const userFilter = {
        ...state.userFilter,
        [UserFilterType.users]: [],
        [UserFilterType.teams]: [],
      };
      state.userFilter = userFilter;
    },
    setDisplayItems: (state, action) => {
      state.displayItems = action.payload;
    },
    setDisplayRowsTime: (state, action) => {
      state.rowDisplayType = action.payload;
    },
    toggleWorkloadMode: (state) => {
      state.isWorkloadMode = !state.isWorkloadMode;
    },
    setSelectedItems: (state, action) => {
      state.selectedItemIds = action.payload;
    },
    toggleMultiSelectMode: (state) => {
      state.isMultiSelectMode = !state.isMultiSelectMode;
    },
    setMultiSelectMode: (state, action) => {
      state.isMultiSelectMode = action.payload;
    },
  },
});

export const {
  setCurrentWeekIndex,
  setDisplayingWeeks,
  setOrder,
  setWorkloadRow,
  setUserFilter,
  clearFilter,
  setDisplayItems,
  setDisplayRowsTime,
  toggleWorkloadMode,
  setSelectedItems,
  toggleMultiSelectMode,
  setMultiSelectMode,
} = scheduleSlice.actions;
export default scheduleSlice;
