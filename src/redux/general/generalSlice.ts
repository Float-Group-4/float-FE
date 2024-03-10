import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep, uniq } from 'lodash';
import { Item } from 'src/types/primitive/item.interface';
import { BoardType } from '../../types/enums';
import { buildRows } from '../schedule/thunk';

interface GeneralState {
  itemsById: Record<string, Item>;
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

const emptyMappedField: any = {
  timeline: null,
  assignees: null,
  hour: null,
  status: null,
  color: null,
  subitems: 'subitems',
};

const initialState: GeneralState = {
  itemsById: {},
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
      items: [],
      itemPosition: {},
      height: 0,
      dayCell: {},
    },
    userId2: {
      id: 'userId2',
      items: [],
      itemPosition: {},
      height: 0,
      dayCell: {},
    },
    userId3: {
      id: 'userId3',
      items: [],
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
        id: number;
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
  },

  extraReducers: (builder) => {
    builder.addCase(buildRows.fulfilled, (state, action: PayloadAction<any>) => {
      const rows = action.payload;
      rows.forEach((r: any) => (state.rowMap[r.id] = r));
    });
  },
});

export const { setItemPlaceHolder, addNewItem, addItemIntoMap, setFetchedIndexes } =
  generalSlice.actions;

export default generalSlice;
