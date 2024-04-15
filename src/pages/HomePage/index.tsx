import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ActionButton from './ActionButton';
import Schedule from './Schedule';
import { ScheduleContextWrapper } from './Schedule/ScheduleContext';
import TopBar from './TopBar';
import {
  resetData,
  setItemsById,
  setStatusItemsById,
  setStatusTypes,
  setTeamProjectTasks,
  setTeamProjects,
  setTimeOffItemsById,
  setTimeOffTypes,
  setUsersById,
} from '../../../src/redux/general/generalSlice';
import { Item } from 'src/types/primitive/item.interface';
import dayjs from 'dayjs';
import { useSnackBar } from '@base/hooks/useSnackbar';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { enqueueErrorBar } = useSnackBar();
  const itemsById = useAppSelector((state) => state.general.itemsById);
  const timeoffsById = useAppSelector((state) => state.general.timeOffItemsById);
  const statusesById = useAppSelector((state) => state.general.statusItemsById);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [teamId, setTeamId] = useState('');

  const fetchInitData = async () => {
    try {
      dispatch(resetData());
      const id = params.teamId || '';
      setTeamId(teamId);

      const allocationEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/allocation/team/${id}`;
      const teamMemberEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/team-members/team/${id}`;
      const teamProjectEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/projects/team/${id}`;
      const teamTimeoffEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/time-offs/team/${id}`;
      const teamTimeoffTypesEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/time-off-types/team/${id}`;
      const teamStatusEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/status/team/${id}`;
      const teamStatusTypesEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/status-types/team/${id}`;

      const [
        allocationResult,
        teamMemberResult,
        teamProjectResult,
        teamTimeoffResult,
        teamTimeoffTypesResult,
        teamStatusResult,
        teamStatusTypesResult,
      ]: any = await Promise.all([
        axios.get(allocationEndpoint),
        axios.get(teamMemberEndpoint),
        axios.get(teamProjectEndpoint),
        axios.get(teamTimeoffEndpoint),
        axios.get(teamTimeoffTypesEndpoint),
        axios.get(teamStatusEndpoint),
        axios.get(teamStatusTypesEndpoint),
      ]);
      console.log('TEAM ALLOCATION: ', allocationResult);
      console.log('TEAM MEMBERS: ', teamMemberResult);
      console.log('TEAM PROJECT: ', teamProjectResult);
      console.log('TEAM TIME OFFS: ', teamTimeoffResult);
      console.log('TEAM TIME OFF TYPES: ', teamTimeoffTypesResult);
      console.log('TEAM STATUSES: ', teamStatusResult);
      console.log('TEAM STATUS TYPES: ', teamStatusTypesResult);
      // Convert to view data
      const teamMemberObj = (teamMemberResult.data || []).reduce(function (acc: any, curr: any) {
        acc[curr.id] = curr;
        return acc;
      }, {});
      const projectObj = (teamProjectResult.data || []).reduce(function (acc: any, curr: any) {
        acc[curr.id] = curr;
        return acc;
      }, {});
      const allocations = (allocationResult.data || []).reduce(function (
        obj: any,
        curAllocation: {
          id: string;
          taskId: string;
          Task: {
            id: string;
            name: string;
            projectId: string;
          };
          description: string | null;
          startDate: string;
          endDate: string;
          workHours: number;
          status: number;
          teamMemberId: string;
        },
      ) {
        obj[curAllocation.id] = {
          id: curAllocation.id,
          name: curAllocation.Task && curAllocation.Task.name ? curAllocation.Task.name : '',
          startDate: dayjs(curAllocation.startDate).format('YYYY-MM-DD'),
          endDate: dayjs(curAllocation.endDate).format('YYYY-MM-DD'),
          userIds: [curAllocation.teamMemberId],
          hour: curAllocation.workHours || 0,
          isPlaceHolder: false,
          type: 'item',
        } as Item;
        return obj;
      }, {});
      const timeoffs = (teamTimeoffResult.data || []).reduce(function (
        obj: any,
        curTimeoff: {
          id: string;
          typeId: string;
          teamMemberId: string;
          startDate: string;
          endDate: string;
          Type: {
            id: string;
            teamId: string;
            name: string;
            days: number;
            balance: string;
            color: string;
          };
        },
      ) {
        obj[curTimeoff.id] = {
          id: curTimeoff.id,
          name: '',
          note: '',
          reason: curTimeoff.Type && curTimeoff.Type.name ? curTimeoff.Type.name : '',
          startDate: dayjs(curTimeoff.startDate).format('YYYY-MM-DD'),
          endDate: dayjs(curTimeoff.endDate).format('YYYY-MM-DD'),
          userIds: [curTimeoff.teamMemberId],
          hour: 8,
          isPlaceHolder: false,
          isTentative: false,
          type: 'timeOffItem',
        } as Item;
        return obj;
      }, {});
      const timeoffTypes = (teamTimeoffTypesResult.data || []).reduce(function (
        acc: any,
        curr: any,
      ) {
        acc[curr.id] = curr;
        return acc;
      }, {});
      const statuses = (teamStatusResult.data || []).reduce(function (
        obj: any,
        curStatus: {
          id: string;
          typeId: string;
          teamMemberId: string;
          startDate: string;
          endDate: string;
          Type: {
            id: string;
            teamId: string;
            name: string;
            color: string;
          };
        },
      ) {
        obj[curStatus.id] = {
          id: curStatus.id,
          name: curStatus.Type && curStatus.Type.name ? curStatus.Type.name : '',
          startDate: dayjs(curStatus.startDate).format('YYYY-MM-DD'),
          endDate: dayjs(curStatus.endDate).format('YYYY-MM-DD'),
          userIds: [curStatus.teamMemberId],
          hour: 0,
          isPlaceHolder: false,
          type: 'statusItem',
        } as Item;
        return obj;
      }, {});
      const statusTypes = (teamStatusTypesResult.data || []).reduce(function (acc: any, curr: any) {
        acc[curr.id] = curr;
        return acc;
      }, {});

      // Fetch tasks for all projects
      const projectTasksPromises: any[] = [];
      (teamProjectResult.data || []).forEach((project: any) => {
        const teamProjectTasksEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/tasks/${project.id}/tasks`;
        projectTasksPromises.push(axios.get(teamProjectTasksEndpoint));
      });
      const teamProjectTasksResponse = await Promise.all(projectTasksPromises);
      let teamProjectTasksObj = {};
      teamProjectTasksResponse.forEach((response) => {
        if (!response?.data) return;
        const projectTasks: {
          id: string;
          projectId: string;
          name: string;
        }[] = response?.data || [];
        if (projectTasks.length > 0)
          teamProjectTasksObj = {
            ...teamProjectTasksObj,
            [projectTasks[0].projectId]: projectTasks,
          };
      });

      // Set to redux
      dispatch(setUsersById(teamMemberObj));
      dispatch(setTeamProjects(projectObj));
      dispatch(setTeamProjectTasks(teamProjectTasksObj));
      dispatch(setItemsById({ ...itemsById, ...allocations }));
      dispatch(setTimeOffItemsById({ ...timeoffsById, ...timeoffs }));
      dispatch(setStatusItemsById({ ...statusesById, ...statuses }));
      dispatch(setTimeOffTypes(timeoffTypes));
      dispatch(setStatusTypes(statusTypes));
      setLoading(false);
    } catch (err: any) {
      console.log('ERROR: ', err.message);
      enqueueErrorBar(err.message || '');
    }
  };

  useEffect(() => {
    fetchInitData();
  }, [params]);
  return (
    <ScheduleContextWrapper>
      <div
        className='flex flex-col h-screen w-screen overflow-auto'
        style={{
          width: 'calc(100vw - 68px)',
        }}
      >
        {/* Top Bar */}
        <TopBar />
        {/* Schedule Board */}
        {!loading && <Schedule />}
        {/* Action Button*/}
        <ActionButton />
      </div>
    </ScheduleContextWrapper>
  );
};

export default HomePage;
