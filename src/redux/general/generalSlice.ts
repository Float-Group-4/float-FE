import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep, uniq } from 'lodash';
import { Item } from 'src/types/primitive/item.interface';
import { BoardType } from '../../types/enums';
import { buildRows } from '../schedule/thunk';
import { TimeOffItem } from 'src/types/primitive/timeOffItem.interface';
import { StatusItem } from 'src/types/primitive/statusItem.interface';

interface GeneralState {
  itemsById: Record<string, Item>;
  timeOffItemsById: Record<string, TimeOffItem>;
  timeOffTypes: Record<string, any>;
  statusItemsById: Record<string, StatusItem>;
  statusTypes: Record<string, any>;
  itemIdsByWeekIndex: Record<number, number[]>;
  usersById: Record<string, any>;
  rowMap: Record<string, any>;
  teamProjects: Record<string, any>;
  teamProjectTasks: Record<string, any>;
  // visibility
  visibility: BoardType;
  visibledUserIds: number[];

  // Fetched Week Indexes
  fetchedWeekIndexes: any;
}

const initialState: GeneralState = {
  itemsById: {},
  timeOffItemsById: {},
  timeOffTypes: {},
  statusItemsById: {},
  statusTypes: {},
  itemIdsByWeekIndex: {},
  usersById: {},
  rowMap: {},
  teamProjects: {},
  teamProjectTasks: {},
  visibility: BoardType.public,
  visibledUserIds: [],
  fetchedWeekIndexes: {},
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setItemPlaceHolder: (
      state,
      action: PayloadAction<{
        id: string;
        isPlaceHolder: boolean;
      }>,
    ) => {
      const { id, isPlaceHolder } = action.payload;
      if (state.itemsById[id])
        Object.assign(state.itemsById[id], { ...state.itemsById[id], isPlaceHolder });
    },
    addNewItem: (state, action) => {
      const { items, mappedFieldBoards } = action.payload;
      for (const item of items) {
        Object.assign(state.itemsById, { [item.id]: { ...item, isPlaceHolder: false } });
        const mapField = mappedFieldBoards[item.board?.id];
        if (mapField?.timeline) {
          const value = item.columnsById[mapField.timeline].value;
        }
        if (mapField?.assignees) {
          const { userIds = [] } = item.columnsById[mapField.assignees]?.value || {
            userIds: [],
          };
          const uIds = userIds;
          const uIdsUniq: number[] = uniq(uIds);
          uIdsUniq.forEach((uid: number) => {
            if (!state.rowMap[uid]) {
              state.rowMap[uid] = {
                id: uid,
                items: [],
                itemPosition: {},
                height: 0,
                dayCell: {},
              };
            }
            state.rowMap[uid].items = uniq([...cloneDeep(state.rowMap[uid].items), item.id]);
          });
        }
      }
    },
    addItemIntoMap: (state, action) => {
      state.itemsById = { ...state.itemsById, ...action.payload };
    },
    setFetchedIndexes: (state, action) => {
      state.fetchedWeekIndexes = action.payload;
    },
    setItemsById: (state, action) => {
      state.itemsById = action.payload;
    },
    setUsersById: (state, action) => {
      state.usersById = action.payload;
      const rows = Object.values(action.payload);
      rows.forEach((r: any) => (state.rowMap[r.id] = r));
    },

    // Time off
    setTimeOffItemPlaceHolder: (
      state,
      action: PayloadAction<{
        id: string;
        isPlaceHolder: boolean;
      }>,
    ) => {
      const { id, isPlaceHolder } = action.payload;
      Object.assign(state.timeOffItemsById[id], { ...state.timeOffItemsById[id], isPlaceHolder });
    },
    addNewTimeOffItem: (state, action) => {
      const { items, mappedFieldBoards } = action.payload;
      for (const item of items) {
        Object.assign(state.timeOffItemsById, { [item.id]: { ...item, isPlaceHolder: false } });
        const mapField = mappedFieldBoards[item.board?.id];
        if (mapField?.timeline) {
          const value = item.columnsById[mapField.timeline].value;
        }
        if (mapField?.assignees) {
          const { userIds = [] } = item.columnsById[mapField.assignees]?.value || {
            userIds: [],
          };
          const uIds = userIds;
          const uIdsUniq: number[] = uniq(uIds);
          uIdsUniq.forEach((uid: number) => {
            if (!state.rowMap[uid]) {
              state.rowMap[uid] = {
                id: uid,
                items: [],
                itemPosition: {},
                height: 0,
                dayCell: {},
              };
            }
            state.rowMap[uid].items = uniq([...cloneDeep(state.rowMap[uid].items), item.id]);
          });
        }
      }
    },
    addTimeOffItemIntoMap: (state, action) => {
      state.timeOffItemsById = { ...state.timeOffItemsById, ...action.payload };
    },
    setTimeOffItemsById: (state, action) => {
      state.timeOffItemsById = action.payload;
    },

    // Status
    setStatusItemPlaceHolder: (
      state,
      action: PayloadAction<{
        id: string;
        isPlaceHolder: boolean;
      }>,
    ) => {
      const { id, isPlaceHolder } = action.payload;
      Object.assign(state.statusItemsById[id], { ...state.statusItemsById[id], isPlaceHolder });
    },
    addNewStatusItem: (state, action) => {
      const { items, mappedFieldBoards } = action.payload;
      for (const item of items) {
        Object.assign(state.statusItemsById, { [item.id]: { ...item, isPlaceHolder: false } });
        const mapField = mappedFieldBoards[item.board?.id];
        if (mapField?.timeline) {
          const value = item.columnsById[mapField.timeline].value;
        }
        if (mapField?.assignees) {
          const { userIds = [] } = item.columnsById[mapField.assignees]?.value || {
            userIds: [],
          };
          const uIds = userIds;
          const uIdsUniq: number[] = uniq(uIds);
          uIdsUniq.forEach((uid: number) => {
            if (!state.rowMap[uid]) {
              state.rowMap[uid] = {
                id: uid,
                items: [],
                itemPosition: {},
                height: 0,
                dayCell: {},
              };
            }
            state.rowMap[uid].items = uniq([...cloneDeep(state.rowMap[uid].items), item.id]);
          });
        }
      }
    },
    addStatusItemIntoMap: (state, action) => {
      state.statusItemsById = { ...state.statusItemsById, ...action.payload };
    },
    setStatusItemsById: (state, action) => {
      state.statusItemsById = action.payload;
    },

    setTeamProjects: (state, action) => {
      state.teamProjects = action.payload;
    },
    setTeamProjectTasks: (state, action) => {
      state.teamProjectTasks = action.payload;
    },

    setTimeOffTypes: (state, action) => {
      state.timeOffTypes = action.payload;
    },

    setStatusTypes: (state, action) => {
      state.statusTypes = action.payload;
    },

    resetData: (state) => {
      state = initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(buildRows.fulfilled, (state, action: PayloadAction<any>) => {
      const rows = action.payload;
      rows.forEach((r: any) => (state.rowMap[r.id] = r));
    });
  },
});

export const {
  setItemPlaceHolder,
  addNewItem,
  addItemIntoMap,
  setFetchedIndexes,
  setItemsById,
  setUsersById,
  setTimeOffItemPlaceHolder,
  addNewTimeOffItem,
  addTimeOffItemIntoMap,
  setTimeOffItemsById,
  setStatusItemPlaceHolder,
  addNewStatusItem,
  addStatusItemIntoMap,
  setStatusItemsById,
  setTeamProjects,
  setTeamProjectTasks,
  setTimeOffTypes,
  setStatusTypes,
  resetData,
} = generalSlice.actions;

export default generalSlice;
