import { faCircle, faFlag, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
  Box,
  Table,
  TableContainer,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Snackbar,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  styled,
  toggleButtonGroupClasses,
  Grid,
  Dialog,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { balanceType } from './enum';
import { TimeOffTypeSetting } from './types/type.interface';
import EditTimeOffDialog from './components/editTimeOffDialog';
import dayjs, { Dayjs } from 'dayjs';
import AddTimeOffDialog from './components/addTimeOffDialog';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]: {
    marginLeft: -1,
    borderLeft: '1px solid transparent',
  },
}));

const TimeoffSetting = () => {
  const teamId = '87cbe9dc-1b26-4519-a546-30563a9687d4';
  const baseURL = 'http://localhost:4000';
  const [isTimeOffApproval, setIsTimeOffApproval] = useState<boolean>(true);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [data, setData] = useState<TimeOffTypeSetting[]>([]);
  const [editingData, setEditingData] = useState<TimeOffTypeSetting>({
    id: '',
    teamId: '',
    name: '',
    color: '',
    balance: '',
    days: 0,
    EffectiveDate: dayjs(),
  });
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/time-off-types/team/${teamId}`);
        setData(response.data);
      } catch (e) {
        console.log('error: ' + e);
      }
    };

    fetchData();
  }, [data]);

  const handleChangeApproval = (event: React.MouseEvent<HTMLElement>, approval: boolean) => {
    setIsTimeOffApproval(approval);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredRowIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredRowIndex(null);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleOpenEditDialog = (item: TimeOffTypeSetting) => {
    setOpenEditDialog(true);
    setEditingData(item);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSaveEditDialog = async (data: TimeOffTypeSetting) => {
    try {
      const id = data.id;
      const response = await axios.patch(`${baseURL}/time-off-types/${id}`, data);
    } catch (error) {
      console.log('error');
    }
  };

  const handleDelete = async (data: TimeOffTypeSetting) => {
    try {
      const id = data.id;
      const response = await axios.delete(`${baseURL}/time-off-types/${id}`);
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <Box bgcolor='inherit' padding='20px 100px'>
      <Typography variant='h2' fontWeight={500}>
        Time off
      </Typography>
      <Typography paddingY={2} variant='h5' fontWeight={400}>
        Set the types of time off that can be assigned and the holidays that you'd like to block out
        in the schedule.
      </Typography>
      <Box
        borderRadius={3}
        border='0.1px solid #D3D3D3'
        marginTop={1}
        paddingX={4}
        paddingY={3}
        display='flex'
        flexDirection='column'
        justifyContent='space-evenly'
      >
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='body2' fontWeight={600} fontSize={26}>
            Time off approvals
          </Typography>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              border: (theme) => `2px solid ${theme.palette.divider}`,
              flexWrap: 'wrap',
            }}
          >
            <StyledToggleButtonGroup
              exclusive
              size='small'
              value={isTimeOffApproval}
              onChange={handleChangeApproval}
            >
              <ToggleButton value={true}>On</ToggleButton>
              <ToggleButton value={false}>Off</ToggleButton>
            </StyledToggleButtonGroup>
          </Paper>
        </Box>
        <Typography sx={{ color: 'black' }} fontSize={14} fontWeight={400}>
          Require your team to get manager approval for time off requests.
        </Typography>
      </Box>
      <Box
        borderRadius={3}
        border='0.1px solid #D3D3D3'
        marginTop={1}
        paddingX={4}
        paddingY={3}
        display='flex'
        flexDirection='column'
        justifyContent='space-evenly'
      >
        <Box marginBottom={3} display='flex' justifyContent='space-between'>
          <Typography variant='body2' fontWeight={600} fontSize={26}>
            Time off types
          </Typography>
          <Button variant='contained' sx={{ borderRadius: 2 }} onClick={handleOpenAddDialog}>
            Add
          </Button>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={4.1}>
            <Typography fontWeight={'bold'} paddingLeft={2}>
              Time off
            </Typography>
          </Grid>
          <Grid item xs={3.8}>
            <Typography fontWeight={'bold'}>Balance</Typography>
          </Grid>
          <Grid item xs={3.1}>
            <Typography fontWeight={'bold'}>Days</Typography>
          </Grid>
          <Grid item xs={0.9}></Grid>
        </Grid>
        {data.map((item, index) => (
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            padding={'10px 20px'}
            borderRadius={3}
            height={60}
            bgcolor={index % 2 === 0 ? '#e7e7e7' : 'inherit'}
            margin={'5px 0'}
            key={index}
            sx={{
              '&:hover': {
                bgcolor: '#d1d1d1',
              },
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Grid container spacing={1} alignItems={'center'}>
              <Grid item xs={4} display={'flex'} alignItems={'center'}>
                <FontAwesomeIcon icon={faCircle} size='2x' color={item.color} />
                <Typography marginLeft={2} fontSize={18}>
                  {item.name}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography fontSize={18}>{item.balance}</Typography>
              </Grid>
              <Grid item xs={3.5}>
                <Typography fontSize={18}>
                  {item.balance === 'Unlimited' ? '' : item.days}
                </Typography>
              </Grid>
              <Grid item xs={0.5}>
                {hoveredRowIndex === index && (
                  <IconButton>
                    <FontAwesomeIcon icon={faPen} onClick={() => handleOpenEditDialog(item)} />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
      <EditTimeOffDialog
        data={editingData}
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        onEdit={handleSaveEditDialog}
        onDelete={handleDelete}
      />
      <AddTimeOffDialog teamId={teamId} open={openAddDialog} onClose={handleCloseAddDialog} />
    </Box>
  );
};

export default TimeoffSetting;
