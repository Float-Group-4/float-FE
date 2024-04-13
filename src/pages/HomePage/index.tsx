import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ActionButton from './ActionButton';
import Schedule from './Schedule';
import { ScheduleContextWrapper } from './Schedule/ScheduleContext';
import TopBar from './TopBar';
import { setUsersById } from '../../../src/redux/general/generalSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const usersById = useAppSelector((state) => state.general.usersById);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [teamId, setTeamId] = useState('');

  const fetchInit = async () => {
    const id = params.teamId || '';
    setTeamId(teamId);
    console.log('Render Home Page');
    console.log('Fetch');
    const allocationEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/allocation/team/${id}`;
    const teamMemberEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/team-members/team/${id}`;
    const allocationResult = await axios.get(allocationEndpoint);
    const teamMemberResult = await axios.get(teamMemberEndpoint);
    console.log('TEAM ALLOCATION: ', allocationResult);
    console.log('TEAM MEMBERS: ', teamMemberResult, usersById);
    const teamMemberObj = (teamMemberResult.data || []).reduce(function (acc: any, curr: any) {
      acc[curr.id] = curr;
      return acc;
    }, {});
    dispatch(setUsersById(teamMemberObj));
    console.log(teamMemberObj);
    setLoading(false);
  };
  useEffect(() => {
    fetchInit();
  }, []);
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
