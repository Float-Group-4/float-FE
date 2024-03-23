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
  statusItemsById: Record<string, StatusItem>;
  subBoardById: Record<number, any>;
  itemIdsByWeekIndex: Record<number, number[]>;
  usersById: Record<string, any>;
  rowMap: Record<string, any>;
  // visibility
  visibility: BoardType;
  visibledUserIds: number[];

  // Fetched Week Indexes
  fetchedWeekIndexes: any;
}

const initialState: GeneralState = {
  itemsById: {
    item1: {
      id: 'item1',
      userIds: ['userId1'],
      name: 'Item 1',
      startDate: '2024-03-10',
      endDate: '2024-03-12',
      hour: 8,
      isPlaceHolder: false,
    },
    item2: {
      id: 'item2',
      userIds: ['userId2'],
      name: 'Item 2',
      startDate: '2024-03-25',
      endDate: '2024-03-28',
      hour: 10,
      isPlaceHolder: false,
    },
    item3: {
      id: 'item3',
      userIds: ['userId3'],
      name: 'Item 3',
      startDate: '2024-03-11',
      endDate: '2024-03-14',
      hour: 4,
      isPlaceHolder: false,
    },
  },
  timeOffItemsById: {},
  statusItemsById: {
    status1: {
      id: 'status1',
      userIds: ['userId3'],
      name: 'Home',
      startDate: '2024-03-25',
      endDate: '2024-03-28',
      isPlaceHolder: false,
    },
  },
  subBoardById: {},
  itemIdsByWeekIndex: {},
  usersById: {
    userId1: {
      id: 'userId1',
      name: 'Nguyen Ngoc Quang',
      workHour: 40,
    },
    userId2: {
      id: 'userId2',
      name: 'Ha Tuan Lam',
      workHour: 40,
    },
    userId3: {
      id: 'userId3',
      name: 'Truong Gia Huy',
      workHour: 40,
    },
  },
  rowMap: {
    userId1: {
      id: 'userId1',
      items: ['item1'],
      timeOffItems: [],
      statusItems: [],
      itemPosition: {},
      height: 0,
      dayCell: {},
    },
    userId2: {
      id: 'userId2',
      items: ['item2'],
      timeOffItems: [],
      statusItems: [],
      itemPosition: {},
      height: 0,
      dayCell: {},
    },
    userId3: {
      id: 'userId3',
      items: [],
      timeOffItems: [],
      statusItems: ['status1'],
      itemPosition: {},
      height: 0,
      dayCell: {},
    },
  },

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
      console.log(action.payload);
      state.itemsById = action.payload;
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
      console.log(action.payload);
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
      console.log(action.payload);
      state.statusItemsById = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(buildRows.fulfilled, (state, action: PayloadAction<any>) => {
      const rows = action.payload;
      rows.forEach((r: any) => (state.rowMap[r.id] = r));
    });
  },
});

export const { setItemPlaceHolder, addNewItem, addItemIntoMap, setFetchedIndexes, setItemsById } =
  generalSlice.actions;

export default generalSlice;
