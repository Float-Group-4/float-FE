import { useSnackBar } from '@base/hooks/useSnackbar';
import { AddOutlined, KeyboardArrowDown, SettingsOutlined } from '@mui/icons-material';
import {
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  MenuList,
  Popover,
  Typography,
  useTheme,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { Team } from '@pages/ChooseTeamPage';
import TeamSetupModal from '@pages/TeamSetupModal';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

interface SettingButtonProps {}

const SettingButton = (props: SettingButtonProps) => {
  const theme = useTheme();
  const params = useParams();
  const teamId = params.teamId;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [openCreateTeam, setOpenCreateTeam] = useState<boolean>(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const { enqueueErrorBar } = useSnackBar();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const fetchTeams = async () => {
    // Get UserId
    const userId = '84803dd9-a9f7-4d00-9580-bb0c07043700';
    // Fetch Init Team Data
    try {
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
      const activeTeams: any[] = result.filter((team) => !team.archived);
      setTeams(activeTeams);
    } catch (err: any) {
      console.log('ERROR: ', err.message);
      enqueueErrorBar(err.message || '');
    }
  };

  useEffect(() => {
    if (!open) return;
    fetchTeams();
  }, [open]);

  return (
    <>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        className='hover:bg-blue-200 rounded-md'
      >
        <SettingsOutlined sx={{ color: grey[800] }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuList sx={{ px: 1 }}>
          <MenuItem onClick={() => navigate('/admin/general')}>
            <ListItemIcon>
              <SettingsOutlined fontSize='small' />
            </ListItemIcon>
            <Typography variant='inherit' noWrap>
              Team Setting
            </Typography>
          </MenuItem>
          <Divider />
          {teams.map((team: any) => {
            return (
              <a href={`/team/${team.id}/home`}>
                <MenuItem selected={team.id == teamId}>
                  <Typography variant='inherit' noWrap>
                    {team.name}
                  </Typography>
                </MenuItem>
              </a>
            );
          })}
          <Divider />
          <MenuItem onClick={() => setOpenCreateTeam(true)}>
            <ListItemIcon>
              <AddOutlined fontSize='small' />
            </ListItemIcon>
            <Typography variant='inherit' noWrap>
              Create new team
            </Typography>
          </MenuItem>
        </MenuList>
      </Popover>

      {openCreateTeam && (
        <TeamSetupModal
          isOpen={openCreateTeam}
          onClose={() => {
            setOpenCreateTeam(false);
          }}
        />
      )}
    </>
  );
};

export default SettingButton;
