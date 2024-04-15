import { axiosApi } from '@base/utils/axios/api';
import {
  ProjectInfo,
  ProjectMileStone,
  ProjectTask,
  ProjectTeam,
} from '@pages/HomePage/CreateProject/models';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HttpStatusCode } from 'axios';
import { ProjectType } from '../../types/enums';
import { useParams } from 'react-router-dom';

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

const baseUrl = import.meta.env.VITE_FRONTEND_BASE_URL;

const initialState: ProjectState = {
  project: [],
  state: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

interface ProjectApi {
  name: string;
  client?: string;
  projectOwnerId: string;
  budget?: string;
  createTime?: string;
  teamId: string;
}

export const fetchProjects = createAsyncThunk('project/fetchProjects', async (teamId: String) => {
  try {
    let id = teamId ?? 'ad53cc61-a3dd-469f-98aa-ace14809239d';

    const response = await axiosApi.get(`${baseUrl}/projects/team/${id}`);
    return [...response.data];
  } catch (e: any) {
    return e.message;
  }
});

export const postNewProject = createAsyncThunk(
  'project/postProject',
  async (projectData: {
    project: ProjectInfo;
    members: ProjectTeam[];
    milestones: ProjectMileStone[];
    tasks: ProjectTask[];
  }) => {
    try {
      const data: ProjectApi = {
        budget: projectData.project.budget?.toString() ?? '0',
        createTime: new Date().toISOString(),
        name: projectData.project.name,
        client: projectData.project.client,
        teamId: projectData.project.teamId,
        projectOwnerId: projectData.project.owner,
      };
    } catch (e) {
      console.log(e);
    }
  },
);

export const updateSingleProject = createAsyncThunk(
  'project/updateSingleProject',
  async (projectData: Project) => {
    try {
      const data: ProjectApi = {
        budget: projectData.project.budget?.toString() ?? '0',
        name: projectData.project.name ?? 'test',
        client: projectData.project.client ?? 'test',
        teamId: projectData.project.teamId,
        projectOwnerId: projectData.project.owner,
      };
      const response = await axiosApi.patch(`${baseUrl}/projects/${projectData.project.id}`, data);
      if (
        response.status == HttpStatusCode.Accepted ||
        response.status == HttpStatusCode.Ok ||
        response.status == HttpStatusCode.Created
      ) {
        return projectData;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  },
);

// const sample: ProjectState = {
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
//         owner: 'Lam',
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
//         owner: 'ksmkmkd',
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
      state.project = [{ project, members, milestones, tasks }, ...state.project];
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
      let i = state.project.findIndex((e) => {
        e.project.id == project.id;
      });

      if (i != -1) {
        state.project[i].project = project;
        state.project[i].members = members;
        state.project[i].milestones = milestones;
        state.project[i].tasks = tasks;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        state.state = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.state = 'succeeded';
        const loadedProjects = action.payload.map((project: any) => {
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
              teamId: project.teamId,
              isTentative: false,
            },
          };
          return p;
        });

        state.project = loadedProjects;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.error.message;
      })
      .addCase(postNewProject.pending, (state, _) => {
        state.state = 'loading';
      })
      .addCase(postNewProject.fulfilled, (state, action) => {
        state.state = 'succeeded';
        const newProject = action.payload;
        if (newProject != null) {
          state.project.push(newProject);
        }
      })
      .addCase(postNewProject.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateSingleProject.pending, (state, _) => {
        state.state = 'loading';
      })
      .addCase(updateSingleProject.fulfilled, (state, action) => {
        state.state = 'succeeded';
        const updateProject = action.payload;
        const index = state.project.findIndex((p) => p.project.id === updateProject?.project.id);
        if (index !== -1) {
          state.project[index] = updateProject!;
        }
      })
      .addCase(updateSingleProject.rejected, (state, action) => {
        state.state = 'failed';
        state.error = action.error.message;
      });
  },
});

export const getFetchProjectsStatus = (state: any) => state.project.state;

export const { addProject, updateProject } = projectSlice.actions;
export default projectSlice;
