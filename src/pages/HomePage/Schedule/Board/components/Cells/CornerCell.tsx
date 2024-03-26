import { PersonAddAlt, Sort } from '@mui/icons-material';
import {
  Chip,
  IconButton,
  List,
  ListItemButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  useTheme,
} from '@mui/material';
import { CALENDAR_BAR_HEIGHT, ITEM_DATE_FORMAT, STARTING_POINT } from '../../common/constant';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { TimeRangeMode } from '../../../../../../../src/types/enums';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { dayIndexToDay } from '../../common/helper';
import {
  getFirstBusinessDayInMonth,
  getFirstBusinessDayInWeek,
  getLastBusinessDayInMonth,
  getLastBusinessDayInWeek,
} from '../../../../../../../src/utilities/helper';
import { setTimeRange } from '../../../../../../../src/redux/schedule/scheduleMeasurementSlice';
import { useScheduleContext } from '@pages/HomePage/Schedule/ScheduleContext';
import { CheckOutlined, ExpandMoreOutlined } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

const timeRangeOptions = [
  { label: 'This Week', value: TimeRangeMode.thisWeek },
  { label: 'Next Week', value: TimeRangeMode.nextWeek },
  { label: 'Last Week', value: TimeRangeMode.lastWeek },
  { label: 'This Month', value: TimeRangeMode.thisMonth },
  { label: 'Next Month', value: TimeRangeMode.nextMonth },
  { label: 'Last Month', value: TimeRangeMode.lastMonth },
  { label: 'Custom', value: TimeRangeMode.custom },
];

const CornerCell = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const cornerCellWidth = useAppSelector((state) => state.scheduleMeasurement.cornerCellWidth);
  const isCollapsed = useAppSelector((state) => state.scheduleMeasurement.isCollapsed);
  const timeRange = useAppSelector((state) => state.scheduleMeasurement.timeRange);
  const { fastForward, timeScoreRef } = useScheduleContext();
  const [rangeTitle, setRangeTitle] = useState<{ text: string; type: TimeRangeMode }>({
    text: '',
    type: TimeRangeMode.custom,
  });
  const [timeRangeAnchorEl, setTimeRangeAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTimeRangeIndex, setSelectedIndex] = useState(-1);
  const open = Boolean(timeRangeAnchorEl);
  const handleClickTimeRangeMenu = (event: React.MouseEvent<HTMLElement>) => {
    setTimeRangeAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setTimeRangeAnchorEl(null);
  };
  const handleSelectTimeRangeOption = (_e: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    console.log(index);
    timeRangeJump(timeRangeOptions[index].value);
    setTimeRangeAnchorEl(null);
  };

  //----- TIME RANGE ----------
  const timeRangeJump = (type: TimeRangeMode) => {
    const now = dayjs();
    let startOfWeek = null;
    let endOfWeek = null;
    let leftPadding = 0;
    switch (type) {
      case TimeRangeMode.thisWeek:
        startOfWeek = now.startOf('week');
        endOfWeek = now.endOf('week');
        break;
      case TimeRangeMode.nextWeek:
        startOfWeek = now.startOf('week').add(1, 'week');
        endOfWeek = now.endOf('week').add(1, 'week');
        break;
      case TimeRangeMode.lastWeek:
        startOfWeek = now.startOf('week').subtract(1, 'week');
        endOfWeek = now.endOf('week').subtract(1, 'week');
        break;
      case TimeRangeMode.thisMonth:
        startOfWeek = now.startOf('month');
        endOfWeek = now.endOf('month');
        leftPadding = 1;
        break;
      case TimeRangeMode.nextMonth:
        startOfWeek = now.startOf('month').add(1, 'month');
        endOfWeek = now.endOf('month').add(1, 'month');
        leftPadding = 1;
        break;
      case TimeRangeMode.lastMonth:
        startOfWeek = now.startOf('month').subtract(1, 'month');
        endOfWeek = now.endOf('month').subtract(1, 'month');
        leftPadding = 1;
        break;
      default:
        return;
    }
    const from = {
      weekIndex: startOfWeek.diff(STARTING_POINT, 'week'),
      dayIndex: startOfWeek.diff(STARTING_POINT, 'day'),
    };
    const to = {
      weekIndex: endOfWeek.diff(STARTING_POINT, 'week'),
      dayIndex: endOfWeek.diff(STARTING_POINT, 'day'),
    };
    dispatch(setTimeRange({ from, to }));
    fastForward(from.weekIndex);
  };

  useEffect(() => {
    if (timeRange == null) setSelectedIndex(-1);
    if (timeRange != null && selectedTimeRangeIndex == -1)
      setSelectedIndex(timeRangeOptions.length - 1);
    setRangeTitle(timeRangeTitle());
  }, [timeRange]);

  //----- TIME RANGE TITLE -------
  const timeRangeTitle = (type = 'none'): { text: string; type: TimeRangeMode } => {
    if (!timeRange) return { text: '', type: TimeRangeMode.custom };
    const { from, to } = timeRange;
    const now = dayjs();
    const start = dayIndexToDay(from.dayIndex);
    const end = dayIndexToDay(to.dayIndex);

    if (type === 'customField')
      return {
        text: `${start.format('D')} ${start.format('MMM')} - ${end.format('D')} ${end.format('MMM')}`,
        type: TimeRangeMode.custom,
      };

    if (
      getFirstBusinessDayInWeek(now.format(ITEM_DATE_FORMAT), false).isSame(start, 'day') &&
      getLastBusinessDayInWeek(now.format(ITEM_DATE_FORMAT), false).isSame(end, 'day')
    ) {
      return {
        text: 'This Week',
        type: TimeRangeMode.thisWeek,
      };
    }
    const nextWeek = now.add(1, 'week');
    if (
      getFirstBusinessDayInWeek(nextWeek.format(ITEM_DATE_FORMAT), false).isSame(start, 'day') &&
      getLastBusinessDayInWeek(nextWeek.format(ITEM_DATE_FORMAT), false).isSame(end, 'day')
    ) {
      return {
        text: 'Next Week',
        type: TimeRangeMode.nextWeek,
      };
    }

    const lastWeek = now.subtract(1, 'week');
    if (
      getFirstBusinessDayInWeek(lastWeek.format(ITEM_DATE_FORMAT), false).isSame(start, 'day') &&
      getLastBusinessDayInWeek(lastWeek.format(ITEM_DATE_FORMAT), false).isSame(end, 'day')
    ) {
      return {
        text: 'Last Week',
        type: TimeRangeMode.lastWeek,
      };
    }
    if (
      getFirstBusinessDayInMonth(now.format(ITEM_DATE_FORMAT), false).isSame(start, 'day') &&
      getLastBusinessDayInMonth(now.format(ITEM_DATE_FORMAT), false).isSame(end, 'day')
    ) {
      return {
        text: 'This Month',
        type: TimeRangeMode.thisMonth,
      };
    }

    const nextMonth = now.add(1, 'month');
    if (
      getFirstBusinessDayInMonth(nextMonth.format(ITEM_DATE_FORMAT), false).isSame(start, 'day') &&
      getLastBusinessDayInMonth(nextMonth.format(ITEM_DATE_FORMAT), false).isSame(end, 'day')
    ) {
      return {
        text: 'Next Month',
        type: TimeRangeMode.nextMonth,
      };
    }

    const lastMonth = now.subtract(1, 'month');
    if (
      getFirstBusinessDayInMonth(lastMonth.format(ITEM_DATE_FORMAT), false).isSame(start, 'day') &&
      getLastBusinessDayInMonth(lastMonth.format(ITEM_DATE_FORMAT), false).isSame(end, 'day')
    ) {
      return {
        text: 'Last Month',
        type: TimeRangeMode.lastMonth,
      };
    }

    return {
      text: `${start.format('D')} ${start.format('MMM')} - ${end.format('D')} ${end.format('MMM')}`,
      type: TimeRangeMode.custom,
    };
  };

  return (
    <div
      className={`sticky border-b top-0 left-0  bg-white rounded-tr-2xl flex justify-between items-center group transition delay-150 z-[9999] ${
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
      <Stack direction='row' alignItems='center' spacing={1}>
        <div>
          <List>
            <ListItemButton
              id='viewModeBtn'
              aria-controls='viewModeMenu'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickTimeRangeMenu}
              className={`truncate text-xs font-medium px-2 py-1 rounded-md ${open ? 'bg-blue-200' : ''}`}
              sx={{
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: grey[300],
              }}
            >
              {selectedTimeRangeIndex >= 0 ? rangeTitle.text.trim() : 'Select Dates'}
              <ExpandMoreOutlined className='ms-2' fontSize='small' />
            </ListItemButton>
          </List>
          <Menu
            id='viewModeMenu'
            MenuListProps={{
              'aria-labelledby': 'viewModeBtn',
            }}
            anchorEl={timeRangeAnchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            className='top-2'
          >
            {timeRangeOptions.map((option, index) => (
              <MenuItem
                key={option.value}
                selected={index === selectedTimeRangeIndex}
                onClick={(event) => handleSelectTimeRangeOption(event, index)}
                className={`flex justify-between min-w-36 mx-2 rounded-md ${index != timeRangeOptions.length - 1 ? 'my-1' : ''}`}
              >
                {option.label}
                {selectedTimeRangeIndex == index ? (
                  <div>
                    <CheckOutlined sx={{ fontSize: 16 }} />
                  </div>
                ) : null}
              </MenuItem>
            ))}
          </Menu>
        </div>
        {timeRange && timeScoreRef.current && (
          <Tooltip
            title={
              <div>
                <div>{`${timeScoreRef.current.scheduledTime.toFixed(2)}h scheduled`}</div>
                <div>{`${timeScoreRef.current.unscheduledTime.toFixed(2)}h unscheduled`}</div>
                <div>{`${timeScoreRef.current.totalOT.toFixed(2)}h overtime`}</div>
              </div>
            }
            arrow
            placement='right'
          >
            <Chip
              variant='light'
              size='small'
              color={timeScoreRef.current.totalOT === 0 ? 'secondary' : 'error'}
              label={`${timeScoreRef.current.scheduledTime.toFixed(0)}h`}
              sx={
                timeScoreRef.current.totalOT === 0
                  ? { '& .MuiChip-label ': { color: theme.palette.text.primary } }
                  : {}
              }
            />
          </Tooltip>
        )}
      </Stack>
    </div>
  );
};

export default CornerCell;
