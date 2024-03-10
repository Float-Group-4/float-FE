import { createSlice } from '@reduxjs/toolkit';
import {
  BoardType,
  ItemColorType,
  ItemLevelSetting,
  WorkHourFormatSetting,
  WorkloadViewType,
} from '../../types/enums';

export interface SettingsState {
  defaultMinute: number;
  isOffWeekend: boolean;
  enableWorkCapacityScheme: number;
  isDividedByPeople: boolean;
  workHourFormat: number;
  workloadType: string;
  visibility: string;
  visibledUserIds: number[];
  isGlobal: boolean;
  sharedBoards: number[];
  itemLevel: number;
  subBoardMappingFields: any;
  itemColorType: number;
  mappedColorSchemaField: Record<number, string>;
  isHiddenWeekend: boolean;
}

export const initialSettingsState: SettingsState = {
  defaultMinute: 8 * 60, // 8 hours
  isOffWeekend: true,
  enableWorkCapacityScheme: 0,
  isDividedByPeople: false,
  workHourFormat: WorkHourFormatSetting.hoursPerDay,
  workloadType: WorkloadViewType.byHour,
  visibility: BoardType.public,
  visibledUserIds: [],
  isGlobal: false,
  sharedBoards: [],
  itemLevel: ItemLevelSetting.main,
  subBoardMappingFields: {},
  itemColorType: ItemColorType.byField,
  mappedColorSchemaField: {},
  isHiddenWeekend: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialSettingsState,
  reducers: {
    setdefaultMinute: (state, action) => {
      state.defaultMinute = action.payload;
    },
    setIsOffWeekend: (state, action) => {
      state.isOffWeekend = action.payload;
    },
    setIsDividedByPeople: (state, action) => {
      state.isDividedByPeople = action.payload;
    },
    // setIsDividedByDays: (state, action) => {
    //   state.isDividedByDays = action.payload;
    // },
    setworkloadType: (state, action) => {
      state.workloadType = action.payload;
    },
    setSetting: (state, action) => {
      state = { ...action.payload };
    },
    setIsHiddenWeekend: (state, action) => {
      state.isHiddenWeekend = action.payload;
    },
  },
});

export const {
  setdefaultMinute,
  setIsOffWeekend,
  setIsDividedByPeople,
  setworkloadType,
  setSetting,
  setIsHiddenWeekend,
} = settingsSlice.actions;
export default settingsSlice;
