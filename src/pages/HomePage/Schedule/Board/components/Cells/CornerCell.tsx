import { CORNER_CELL_HEIGHT } from '@constants/home';
import { PersonAddAlt, Sort } from '@mui/icons-material';
import { Chip, IconButton, Stack, useTheme } from '@mui/material';
import TimeFilter from '../../../Sidebar/Toolbar/TimeFilter';
import { CALENDAR_BAR_HEIGHT } from '../../common/constant';
import { useAppSelector } from '@hooks/reduxHooks';

const CornerCell = () => {
  const theme = useTheme();
  const cornerCellWidth = useAppSelector((state) => state.scheduleMeasurement.cornerCellWidth);
  const isCollapsed = useAppSelector((state) => state.scheduleMeasurement.isCollapsed);
  return (
    <div
      className={`sticky border-b top-0 left-0  bg-white rounded-tr-2xl flex items-center group transition delay-150 z-[9999] ${
        isCollapsed ? `px-2 justify-center` : `px-2`
      }`}
      style={{
        height: `${CALENDAR_BAR_HEIGHT}px`,
        width: `${cornerCellWidth}px`,
        marginLeft: `-${cornerCellWidth - 1}px`,
        transition: 'width 0.2s',
        gap: '4px',
      }}
    >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        p={1}
        width='60px'
        borderBottom={`1px solid ${theme.palette.divider}`}
        height={CORNER_CELL_HEIGHT}
      >
        <Stack direction='row' alignItems='center' spacing={1}>
          <IconButton color='secondary' size='small' sx={{ height: 28, width: 28 }}>
            <PersonAddAlt fontSize='small' sx={{ color: theme.palette.text.primary }} />
          </IconButton>
          <IconButton
            color='secondary'
            size='small'
            sx={{ border: `1px solid ${theme.palette.secondary.main}`, height: 28, width: 28 }}
          >
            <Sort fontSize='small' sx={{ color: theme.palette.text.primary }} />
          </IconButton>
        </Stack>
        {/* <Stack direction='row' alignItems='center' spacing={1}>
          <TimeFilter />
          <Chip
            variant='light'
            size='small'
            color='secondary'
            label='128h'
            sx={{ '& .MuiChip-label ': { color: theme.palette.text.primary } }}
          />
        </Stack> */}
      </Stack>
    </div>
  );
};

export default CornerCell;
