import { useSnackBar } from '@base/hooks/useSnackbar';
import { LOCAL_STORAGE_KEY_ACCESS_TOKEN } from '@configs/localStorage';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface Team {
  id: string;
  name: string;
  totalProject: number;
  totalPeople: number;
  archived: boolean;
}

export default function ChooseTeamPage() {
  const navigate = useNavigate();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const [activeTeams, setActiveTeams] = useState<Team[]>([]);
  const [inactiveTeams, setInactiveTeams] = useState<Team[]>([]);

  const fetchTeams = async () => {
    try {
      // Get UserId
      const token = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
      if (!token) return enqueueErrorBar('Token not found');
      const userInfoEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/auth/user-info`;
      const userInfoRes = await axios.get(userInfoEndpoint, {
        params: {
          token: token,
        },
      });
      const userInfo = userInfoRes.data;
      const userId = userInfo.id;
      // Fetch Init Team Data
      const endpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/team/user/${userId}`;
      const res = await axios.get(endpoint);
      const teams = res.data;
      const result = await Promise.all(
        teams.map(async (team: any) => {
          const fetchTeamMemberEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/team-members/team/${team.id}`;
          const fetchTeamProjectEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/projects/team/${team.id}`;
          const teamMemberRes = await axios.get(fetchTeamMemberEndpoint);
          const teamProjectRes = await axios.get(fetchTeamProjectEndpoint);
          return {
            ...team,
            totalPeople: teamMemberRes.data.length,
            totalProject: teamProjectRes.data.length,
          };
        }),
      );
      const activeTeams = result.filter((team) => !team.archived);
      const inactiveTeams = result.filter((team) => team.archived);
      setActiveTeams(activeTeams);
      setInactiveTeams(inactiveTeams);
    } catch (err: any) {
      console.log('ERROR: ', err.message);
      enqueueErrorBar(err.message || '');
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleClickTeam = (team: Team) => {
    navigate(`/team/${team.id}/home`);
  };

  return (
    <div>
      <nav className='flex-1 flex w-full relative items-center pt-2 px-4'>
        <div className='flex justify-between'>
          <div onClick={() => navigate('/')}>
            <img
              src='https://www.floatui.com/logo.svg'
              width={120}
              height={50}
              alt='Float UI logo'
            />
          </div>
        </div>
        <ul className={`flex-1 gap-8 justify-end mt-12 md:text-md md:font-medium md:flex md:mt-0`}>
          <div className='flex gap-4 justify-between items-center'>
            <li className='order-2 py-5 md:py-0'>
              <div
                onClick={() => navigate('/')}
                className=' gap-2py-2 px-5 rounded-lg font-medium text-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white duration-150 block md:py-3 md:inline'
              >
                <span>
                  <LogoutIcon fontSize='small' className='me-2' />
                </span>
                Sign Out
              </div>
            </li>
          </div>
        </ul>
      </nav>
      {/* Your Team Section */}
      <section className='p-8'>
        <h2 className='text-2xl font-semibold mb-4'>Your Team:</h2>
        <div className='flex flex-wrap gap-4'>
          {activeTeams.map((team) => {
            return (
              <div
                key={team.id}
                className={`relative h-52 grow-0 shrink-0 bg-white py-12 rounded-lg shadow-sm border-2 border-gray-100 ${team.archived && 'text-gray-400'} hover:cursor-pointer hover:shadow-md hover:border-gray-200 hover:text-blue-600 flex flex-col justify-center items-center`}
                style={{
                  flexBasis: 'calc(33.33333% - 1rem)',
                }}
                onClick={(e) => {
                  handleClickTeam(team);
                }}
              >
                <p className='text-xl font-medium'>{team.name}</p>
                <p className='my-2'>{`${team.totalProject} Project / ${team.totalPeople} People`}</p>
                {team.archived && (
                  <div className='absolute top-4 left-4'>
                    <LockOutlinedIcon />
                  </div>
                )}
              </div>
            );
          })}
          <div
            className='h-52 text-blue-600 border-dashed grow-0 shrink-0 bg-white py-12 rounded-lg shadow-sm border-2 border-blue-600 
            hover:cursor-pointer hover:shadow-md hover:border-blue-500-200 flex flex-col justify-center items-center'
            style={{
              flexBasis: 'calc(33.33333% - 1rem)',
            }}
            onClick={() => {
              navigate('/create-team');
            }}
          >
            <GroupAddOutlinedIcon className='text-6xl m-2' />
            <p className='text-xl font-medium'>Create new team</p>
          </div>
        </div>
      </section>
      {/* Inactive Team Section */}
      <section className='p-8'>
        <h2 className='text-2xl font-semibold mb-4'>Inactive Team:</h2>
        <div className='flex flex-wrap gap-4'>
          {inactiveTeams.map((team) => {
            return (
              <div
                key={team.id}
                className={`relative h-52 grow-0 shrink-0 bg-white py-12 rounded-lg shadow-sm border-2 border-gray-100 ${team.archived && 'text-gray-400'} hover:cursor-pointer hover:shadow-md hover:border-gray-200 hover:text-blue-600 flex flex-col justify-center items-center`}
                style={{
                  flexBasis: 'calc(33.33333% - 1rem)',
                }}
              >
                <p className='text-xl font-medium'>{team.name}</p>
                {team.archived && (
                  <>
                    <p className='my-2'>Your free trial has ended</p>
                    <p className='text-gray-600 font-medium'>Upgrade to a paid plan</p>
                    <div className='absolute top-4 left-4'>
                      <LockOutlinedIcon />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
