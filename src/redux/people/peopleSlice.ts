import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BudgetValue, RowDisplayType, UserFilterType } from '../../types/enums';
import { INITIAL_WEEK_INDEX } from '../../pages/HomePage/Schedule/Board/common/constant';
import { mergeListsOrder } from '../../pages/HomePage/Schedule/Board/common/helper';
import {
  AccountType,
  ContractType,
  PersonInfo,
  WorkingType,
} from '@pages/HomePage/AddPeople/models';

export interface UserFilterValue {
  id: number;
  name: string;
  leftAvatar: string;
}

interface PeopleState {
  people: PersonInfo[];
}
const defaultColor = '#3451b2';

const initialState: PeopleState = {
  people: [
    {
      id: '1',
      name: 'Luu Tuan Quan',
      accountType: AccountType.admin,
      availability: {
        startDate: new Date(),
        endDate: new Date(),
        workingType: WorkingType.fullTime,
        publicHoliday: 'Tet',
        note: 'I am a person hihihi',
      },
      email: 'luutuanquan@gmail.com',
      role: 'admin',
      department: 'dep1',
      tags: ['t1', 't2'],
      type: ContractType.employee, // Employee, Contractor, Placeholder;
      hourlyRate: 1000,
      projects: ['1', '2'],
    },
    {
      id: '2',
      name: 'Huynh Minh Bao',
      accountType: AccountType.member,
      availability: {
        startDate: new Date(),
        endDate: new Date(),
        workingType: WorkingType.fullTime,
        publicHoliday: 'Summer',
        note: 'I am a w hihihi',
      },
      email: 'hmb@gmail.com',
      role: 'admin',
      department: 'dep1',
      tags: ['t1', 't3', 't2'],
      type: ContractType.employee, // Employee, Contractor, Placeholder;
      hourlyRate: 3,
      projects: ['1'],
    },
    {
      id: '3',
      name: 'Le Minh Nhat',
      accountType: AccountType.member,
      availability: {
        startDate: new Date(),
        endDate: new Date(),
        workingType: WorkingType.fullTime,
        publicHoliday: '',
        note: 'Nhat note',
      },
      email: 'lmn@gmail.com',
      role: 'member',
      department: 'dep2',
      tags: ['t3', 't2'],
      type: ContractType.placeholder, // Employee, Contractor, Placeholder;
      hourlyRate: 1000,
      projects: ['1', '2'],
    },
    {
      id: '4',
      name: 'Nguyen Ngoc Quang',
      accountType: AccountType.admin,
      availability: {
        startDate: new Date(),
        endDate: new Date(),
        workingType: WorkingType.fullTime,
        publicHoliday: 'Tet, Summer',
        note: 'I am a Quang hihihi',
      },
      email: 'quang@gmail.com',
      role: 'admin',
      department: 'dep1',
      tags: ['t1', 't2', 't3'],
      type: ContractType.contractor, // Employee, Contractor, Placeholder;
      hourlyRate: 10,
      projects: ['2'],
    },
  ],
};

const peopleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addPeople: (
      state,
      action: PayloadAction<{
        person: PersonInfo;
      }>,
    ) => {
      const { person } = action.payload;
      state.people.push(person);
    },
    updatePeople: (
      state,
      action: PayloadAction<{
        person: PersonInfo;
      }>,
    ) => {
      const { person } = action.payload;
      var i = state.people.findIndex((e) => {
        e.id == person.id;
      });

      if (i != -1) {
        Object.assign(state.people[i], { person });
      }
    },
    // setCurrentWeekIndex: (state, action) => {
    //   state.currentWeekIndex = action.payload;
    // },
    // setDisplayingWeeks: (state, action) => {
    //   state.displayingWeeks = action.payload;
    // },
    // setWorkloadRow: (
    //   state,
    //   action: PayloadAction<{ [key: number]: { isNotCollapse: boolean } }>,
    // ) => {
    //   state.workloadRow = { ...state.workloadRow, ...action.payload };
    // },
    // setOrder: (state, action: PayloadAction<{ type: RowDisplayType; order: string[] }>) => {
    //   const { type, order } = action.payload;
    //   const newOrder =
    //     state.order[type].length > 0 ? mergeListsOrder(state.order[type], order) : order;
    //   Object.assign(state.order, { [type]: newOrder });
    // },
    // setUserFilter: (
    //   state,
    //   action: PayloadAction<{ filterList: UserFilterValue[]; type: UserFilterType }>,
    // ) => {
    //   const { filterList, type } = action.payload;
    //   const userFilter = { ...state.userFilter, [type]: filterList };
    //   state.userFilter = userFilter;
    // },
    // clearFilter: (state) => {
    //   const userFilter = {
    //     ...state.userFilter,
    //     [UserFilterType.users]: [],
    //     [UserFilterType.teams]: [],
    //   };
    //   state.userFilter = userFilter;
    // },
    // setDisplayItems: (state, action) => {
    //   state.displayItems = action.payload;
    // },
    // setDisplayRowsTime: (state, action) => {
    //   state.rowDisplayType = action.payload;
    // },
    // toggleWorkloadMode: (state) => {
    //   state.isWorkloadMode = !state.isWorkloadMode;
    // },
    // setSelectedItems: (state, action) => {
    //   state.selectedItemIds = action.payload;
    // },
    // toggleMultiSelectMode: (state) => {
    //   state.isMultiSelectMode = !state.isMultiSelectMode;
    // },
    // setMultiSelectMode: (state, action) => {
    //   state.isMultiSelectMode = action.payload;
    // },
  },
});

export const { addPeople, updatePeople } = peopleSlice.actions;
export default peopleSlice;
