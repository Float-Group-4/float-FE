import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BudgetValue, ProjectType, RowDisplayType, UserFilterType } from '../../types/enums';
import { INITIAL_WEEK_INDEX } from '../../pages/HomePage/Schedule/Board/common/constant';
import { mergeListsOrder } from '../../pages/HomePage/Schedule/Board/common/helper';
import {
  ProjectInfo,
  ProjectMileStone,
  ProjectTask,
  ProjectTeam,
} from '@pages/HomePage/CreateProject/models';
import { axiosApi } from '@base/utils/axios/api';

export interface UserFilterValue {
  id: number;
  name: string;
  leftAvatar: string;
}

interface ProjectState {
  project: Project[];
  state: string;
  error?: string | null;
}
const defaultColor = '#3451b2';

export interface Project {
  project: ProjectInfo;
  members: ProjectTeam[];
  milestones: ProjectMileStone[];
  tasks: ProjectTask[];
}

const baseUrl = 'http://localhost:4000';

const initialState: ProjectState = {
  project: [],
  state: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

export const fetchProjects = createAsyncThunk('project/fetchProjects', async () => {
  try {
    const response = await axiosApi.get(`${baseUrl}/projects`);
    return [...response.data];
  } catch (e: any) {
    return e.message;
  }
});

// const initialState: ProjectState = {
//   project: [
//     {
//       project: {
//         id: '1',
//         name: 'Project 1',
//         color: defaultColor,
//         budget: 100,
//         type: ProjectType.billable,
//         isTentative: false,
//         note: 'First Project',
//         client: 'Quang',
//         tags: ['hi', 'hii'],
//         owner: "Lam",
//       },
//       members: [
//         {
//           member: {
//             id: '2',
//             name: 'Huynh Minh Bao',
//             email: 'huynhminhbao@gmail.com',
//           },
//         },
//         {
//           member: {
//             id: '1',
//             name: 'Luu Tuan Quan',
//             email: 'luutuanquan@gmail.com',
//           },
//         },
//         {
//           member: {
//             id: '3',
//             name: 'Le Minh Nhat',
//             email: 'leminhnhat@gmail.com',
//           },
//         },
//       ],
//       milestones: [
//         {
//           name: 'Milestone 1',
//           startDate: '21/2/2024',
//           endDate: '29/2/2024',
//         },
//         {
//           name: 'Milestone 2',
//           startDate: '21/3/2024',
//           endDate: '29/3/2024',
//         },
//       ],
//       tasks: [
//         {
//           id: 1,
//           name: 'Task 1',
//           isBillable: true,
//         },
//         {
//           id: 2,
//           name: 'Task 2',
//           isBillable: true,
//         },
//         {
//           id: 3,
//           name: 'Task 3',
//           isBillable: true,
//         },
//       ],
//     },
//     {
//       project: {
//         id: '2',
//         name: 'Project 2 from Redux',
//         color: defaultColor,
//         budget: 0,
//         type: ProjectType.nonBillable,
//         isTentative: false,
//         note: 'Second Project',
//         client: 'Bao',
//         tags: ['hi', 'hiis'],
//       },
//       members: [
//         {
//           member: {
//             id: '4',
//             name: 'Nguyen Ngoc Quang',
//             email: 'quang@gmail.com',
//           },
//         },
//         {
//           member: {
//             id: '1',
//             name: 'Luu Tuan Quan',
//             email: 'luutuanquan@gmail.com',
//           },
//         },
//         {
//           member: {
//             id: '3',
//             name: 'Le Minh Nhat',
//             email: 'leminhnhat@gmail.com',
//           },
//         },
//       ],
//       milestones: [
//         {
//           name: 'Milestone 1',
//           startDate: '12/3/2024',
//           endDate: '12/4/2024',
//         },
//         {
//           name: 'Milestone 2',
//           startDate: '09/09/2024',
//           endDate: '29/10/2024',
//         },
//       ],
//       tasks: [
//         {
//           id: 4,
//           name: 'Task 1',
//           isBillable: true,
//         },
//         {
//           id: 5,
//           name: 'Task 2',
//           isBillable: true,
//         },
//         {
//           id: 6,
//           name: 'Task 3',
//           isBillable: true,
//         },
//       ],
//     },
//   ],
// };

const projectSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addProject: (
      state,
      action: PayloadAction<{
        project: ProjectInfo;
        members: ProjectTeam[];
        milestones: ProjectMileStone[];
        tasks: ProjectTask[];
      }>,
    ) => {
      const { project, members, milestones, tasks } = action.payload;
      console.log(action.payload);
      state.project = [{ project, members, milestones, tasks }, ...state.project];
      console.log(state.project);
    },
    updateProject: (
      state,
      action: PayloadAction<{
        project: ProjectInfo;
        members: ProjectTeam[];
        milestones: ProjectMileStone[];
        tasks: ProjectTask[];
      }>,
    ) => {
      const { project, members, milestones, tasks } = action.payload;
      var i = state.project.findIndex((e) => {
        e.project.id == project.id;
      });

      if (i != -1) {
        state.project[i].project = project;
        state.project[i].members = members;
        state.project[i].milestones = milestones;
        state.project[i].tasks = tasks;
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
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        state.state = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.state = 'succeeded';
        const loadedProjects = action.payload.map((project: any) => {
          // console.log(project);
          const p: Project = {
             members: project.members ?? [],
             milestones: project.milestones ?? [],
             tasks: project.task ?? [],
             project: {
               id: project.id,
               name: project.name,
               client: project.client,
               budget: project.budget,
               type: ProjectType.billable,
               owner: project.projectOwnerId,
               isTentative: false
             },
          };
          return p;
        });

        state.project = loadedProjects;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.error.message;
      });
  },
});

export const getFetchProjectsStatus = (state: any) => state.project.state;

export const { addProject, updateProject } = projectSlice.actions;
export default projectSlice;
