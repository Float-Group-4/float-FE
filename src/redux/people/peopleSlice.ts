import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BudgetValue, RowDisplayType, UserFilterType } from '../../types/enums';
import { INITIAL_WEEK_INDEX } from '../../pages/HomePage/Schedule/Board/common/constant';
import { mergeListsOrder } from '../../pages/HomePage/Schedule/Board/common/helper';
import {
  AccountType,
  ContractType,
  PersonInfo,
  WorkingType,
} from '@pages/HomePage/AddPeople/models';
import axios from 'axios';
import { axiosApi } from '@base/utils/axios/api';

export interface UserFilterValue {
  id: number;
  name: string;
  leftAvatar: string;
}

interface PeopleState {
  people: PersonInfo[];
  state: String;
  error?: String | null;
}
const defaultColor = '#3451b2';

const baseUrl = 'http://localhost:4000';

const initialState: PeopleState = {
  people: [],
  state: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

export const fetchPeople = createAsyncThunk('people/fetchTeamMembers', async () => {
  try {
    const response = await axiosApi.get(`${baseUrl}/team-members`);
    return [...response.data];
  } catch (e: any) {
    return e.message;
  }
});

// const initialState: PeopleState = {
//   people: [
//     {
//       id: '1',
//       name: 'Luu Tuan Quan',
//       accountType: AccountType.admin,
//       availability: {
//         startDate: new Date().toDateString(),
//         endDate: new Date().toDateString(),
//         workingType: WorkingType.fullTime,
//         publicHoliday: 'Tet',
//         note: 'I am a person hihihi',
//       },
//       email: 'luutuanquan@gmail.com',
//       role: 'admin',
//       department: 'dep1',
//       tags: ['t1', 't2'],
//       type: ContractType.employee, // Employee, Contractor, Placeholder;
//       hourlyRate: 1000,
//       projects: ['1', '2'],
//     },
//     {
//       id: '2',
//       name: 'Huynh Minh Bao',
//       accountType: AccountType.member,
//       availability: {
//         startDate: new Date().toDateString(),
//         endDate: new Date().toDateString(),
//         workingType: WorkingType.fullTime,
//         publicHoliday: 'Summer',
//         note: 'I am a w hihihi',
//       },
//       email: 'hmb@gmail.com',
//       role: 'admin',
//       department: 'dep1',
//       tags: ['t1', 't3', 't2'],
//       type: ContractType.employee, // Employee, Contractor, Placeholder;
//       hourlyRate: 3,
//       projects: ['1'],
//     },
//     {
//       id: '3',
//       name: 'Le Minh Nhat',
//       accountType: AccountType.member,
//       availability: {
//         startDate: new Date().toDateString(),
//         endDate: new Date().toDateString(),
//         workingType: WorkingType.fullTime,
//         publicHoliday: '',
//         note: 'Nhat note',
//       },
//       email: 'lmn@gmail.com',
//       role: 'member',
//       department: 'dep2',
//       tags: ['t3', 't2'],
//       type: ContractType.placeholder, // Employee, Contractor, Placeholder;
//       hourlyRate: 1000,
//       projects: ['1', '2'],
//     },
//     {
//       id: '4',
//       name: 'Nguyen Ngoc Quang',
//       accountType: AccountType.admin,
//       availability: {
//         startDate: new Date().toDateString(),
//         endDate: new Date().toDateString(),
//         workingType: WorkingType.fullTime,
//         publicHoliday: 'Tet, Summer',
//         note: 'I am a Quang hihihi',
//       },
//       email: 'quang@gmail.com',
//       role: 'admin',
//       department: 'dep1',
//       tags: ['t1', 't2', 't3'],
//       type: ContractType.contractor, // Employee, Contractor, Placeholder;
//       hourlyRate: 10,
//       projects: ['2'],
//     },
//   ],
// };

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
      console.log(person);
      state.people = [person, ...state.people];
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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPeople.pending, (state, action) => {
        state.state = 'loading';
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.state = 'succeeded';
        const loadedTeamMembers = action.payload.map((teamMember: any) => {
          // console.log(teamMember);
          const t: PersonInfo = {
            department: teamMember.departmentId,
            accountType: AccountType[teamMember.type as keyof typeof AccountType],
            id: teamMember.id,
            tags: ['t1', 't2', 't3'],
            name: teamMember.name,
            role: teamMember.roleId,
            hourlyRate: teamMember.hourlyRate,
            email: teamMember.email,
            type: ContractType.employee,
            projects: ['2'],
            availability: {
              startDate: new Date().toDateString(),
              endDate: new Date().toDateString(),
              workingType: WorkingType.fullTime,
              publicHoliday: 'Summer',
              note: 'I am a w hihihi',
            },
          };
          return t;
        });

        state.people = loadedTeamMembers;
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllPeople = (state: any) => state.people.people;
export const getPeopleStatus = (state: any) => state.people.state;
export const getPeopleError = (state: any) => state.people.error;

export const { addPeople, updatePeople } = peopleSlice.actions;
export default peopleSlice;
