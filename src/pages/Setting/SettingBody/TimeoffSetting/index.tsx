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
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { balanceType } from './enum';

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

const timeOffList: TimeOff[] = [
  {
    id: '995e2bbf-c6b6-41b3-99ca-478b375a49b8',
    teamId: 'a12c6faa-13d4-444c-8231-ef10182f9258',
    name: 'Home',
    color: '#ff5800',
    balance: '2',
    days: 0.5,
    EffectiveDate: new Date(),
  },
];

interface TimeOff {
  id: string;
  teamId: string;
  name: string;
  color: string;
  balance: string;
  days: number;
  EffectiveDate: Date;
}

const TimeoffSetting = () => {
  const [isTimeOffApproval, setIsTimeOffApproval] = useState<boolean>(true);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  const handleChangeApproval = (event: React.MouseEvent<HTMLElement>, approval: boolean) => {
    setIsTimeOffApproval(approval);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredRowIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredRowIndex(null);
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
          <Button variant='contained' sx={{ borderRadius: 2 }}>
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
        {timeOffList.map((item, index) => (
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
                <Typography fontSize={18}>{balanceType[parseInt(item.balance)]}</Typography>
              </Grid>
              <Grid item xs={3.5}>
                <Typography fontSize={18}>{item.days}</Typography>
              </Grid>
              <Grid item xs={0.5}>
                {hoveredRowIndex === index && (
                  <IconButton>
                    <FontAwesomeIcon icon={faPen} />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TimeoffSetting;
