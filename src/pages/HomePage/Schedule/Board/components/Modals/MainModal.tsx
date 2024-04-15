import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { Box, Button, Stack, Tab, Tabs, Typography, styled } from '@mui/material';
import { useImperativeHandle, useState } from 'react';
import AllocationTab from './AllocationTab';
import TimeOffTab from './TimeOffTab';
import StatusTab from './StatusTab';
import { getRangeDate } from '../../common/helper';
import { Allocation, DragInfo, Status, TimeOff } from '../../common/type';
import { useScheduleContext } from '@pages/HomePage/Schedule/ScheduleContext';
import dayjs from 'dayjs';
import { generateUUID } from '@base/utils/uuid';
import {
  setItemsById,
  setStatusItemsById,
  setTimeOffItemsById,
} from '../../../../../../redux/general/generalSlice';
import { buildRows } from '../../../../../../redux/schedule/thunk';
import { AllocationItem } from '../../../../../../types/primitive/item.interface';
import CustomMiModal from './CustomMiModal';
import { TimeOffItem } from 'src/types/primitive/timeOffItem.interface';
import { StatusItem } from 'src/types/primitive/statusItem.interface';
import axios from 'axios';
import { useSnackBar } from '@base/hooks/useSnackbar';

interface StyledTabProps {
  label: string;
}

const PillTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    borderRadius: 50,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    minWidth: 'auto',
    padding: theme.spacing(1, 2),
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
);

interface MainModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => any;
}

interface HeaderProps {
  currentIndex: number;
  handleChange: (event: React.SyntheticEvent<Element, Event>, value: any) => void;
}

interface FooterProps {
  submitTitle: string;
  submitAction: () => void;
  handleClose: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: Readonly<TabPanelProps>) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`main-tabpanel-${index}`}
      aria-labelledby={`main-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ px: 1, pt: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `main-tab-${index}`,
    'aria-controls': `main-tabpanel-${index}`,
  };
}

const Header = (props: HeaderProps) => {
  const { currentIndex, handleChange } = props;

  return (
    <Box sx={{ borderColor: 'transparent', ml: 3 }}>
      <Tabs
        TabIndicatorProps={{
          sx: {
            display: 'flex',
            justifyContent: 'center',
            height: 3,
            borderRadius: 2,
          },
        }}
        value={currentIndex}
        onChange={handleChange}
        aria-label='tabs-of-create-project'
      >
        <Tab
          label='Allocation'
          {...a11yProps(0)}
          sx={{
            fontSize: '15px',
            '&:hover': { backgroundColor: 'transparent', color: 'black' },
            minWidth: 'auto',
          }}
          wrapped
        />
        <Tab
          label='Time off'
          {...a11yProps(1)}
          sx={{
            fontSize: '15px',
            minWidth: 'auto',
            '&:hover': { backgroundColor: 'transparent', color: 'black' },
          }}
          wrapped
        />
        <Tab
          label='Status'
          {...a11yProps(2)}
          sx={{
            fontSize: '15px',
            minWidth: 'auto',
            '&:hover': { backgroundColor: 'transparent', color: 'black' },
          }}
          wrapped
        />
      </Tabs>
    </Box>
  );
};

const Footer = (props: FooterProps) => {
  const { submitTitle, submitAction, handleClose } = props;

  return (
    <Stack direction='row' spacing={1} paddingY={3}>
      <Button onClick={submitAction} variant='contained'>
        {submitTitle}
      </Button>
      <Button onClick={handleClose} sx={{ backgroundColor: '#F5F5F5', color: 'black' }}>
        Cancel
      </Button>
    </Stack>
  );
};

const MainModal = (props: MainModalProps) => {
  const { enqueueErrorBar } = useSnackBar();
  const [isOpen, setIsOpen] = useState(false);
  const usersById = useAppSelector((state) => state.general.usersById);

  const dispatch = useAppDispatch();
  const [currentTab, setCurrentTab] = useState(0);
  const { setAllocation, setStatus, setTimeOff, allocation, status, timeOff } =
    useScheduleContext();

  const itemsById = useAppSelector((state) => state.general.itemsById);
  const timeOffItemsById = useAppSelector((state) => state.general.timeOffItemsById);
  const statusItemsById = useAppSelector((state) => state.general.statusItemsById);
  const { mainModalRef } = useScheduleContext();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const defaultAllocation: Allocation = {
    assignees: [],
    hourEachDay: 8,
    startDate: dayjs(new Date()).format('YYYY-MM-DD'),
    endDate: dayjs(new Date()).format('YYYY-MM-DD'),
    id: '',
    projectId: '',
    userId: '',
    type: '',
    note: '',
  };

  const defaultStatus: Status = {
    startDate: '',
    endDate: '',
    type: '',
    assignee: '',
    name: '',
  };

  const defaultTimeOff: TimeOff = {
    startDate: '',
    endDate: '',
    hourEachDay: 8,
    id: '',
    userId: '',
    isTentative: false,
    note: '',
    name: '',
    reason: 'Paid Time Off',
    assignees: [],
  };

  useImperativeHandle(mainModalRef, () => {
    return {
      openMainModal(data) {
        const dragInfo: DragInfo = data.dragInfo;
        const user = usersById[dragInfo.userId];
        if (dragInfo) {
          const { from, to } = getRangeDate(dragInfo.smp?.dayIndex, dragInfo.emp?.dayIndex);
          const start = from.format('YYYY-MM-DD');
          const end = to.format('YYYY-MM-DD');
          defaultAllocation.startDate = start;
          defaultAllocation.endDate = end;
          defaultStatus.startDate = start;
          defaultStatus.endDate = end;
          defaultTimeOff.startDate = start;
          defaultTimeOff.endDate = end;
          defaultAllocation.assignees = { label: user.name, id: user.id };
          defaultTimeOff.assignees = { label: user.name, id: user.id };
          defaultStatus.assignee = { label: user.name, id: user.id };
          setAllocation(defaultAllocation);
          setStatus(defaultStatus);
          setTimeOff(defaultTimeOff);
          setIsOpen(true);
        }
      },
    };
  });

  const submitText =
    currentTab == 0 ? 'Create allocation' : currentTab == 1 ? 'Create time off' : 'Create status';

  const createAllocation = async () => {
    try {
      let newItem: AllocationItem = {
        id: generateUUID(),
        name: allocation?.taskId?.label || '',
        startDate: allocation?.startDate!,
        endDate: allocation?.endDate!,
        userIds: [allocation?.assignees.id],
        hour: allocation?.hourEachDay ?? 0,
        isPlaceHolder: false,
        projectId: allocation?.projectId?.id || '',
        taskId: allocation?.taskId?.id || '',
        taskType: allocation?.type!,
        note: allocation?.note,
        type: 'item',
      };
      const endpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/allocation/`;
      const data = {
        taskId: newItem.taskId || '',
        teamMemberId: newItem.userIds[0] || '',
        startDate: dayjs(newItem.startDate || '').toISOString(),
        endDate: dayjs(newItem.endDate || '').toISOString(),
        workHours: newItem.hour || 0,
        status: 0,
        description: newItem.note || '',
      };
      const response = await axios.post(endpoint, data);
      if (response?.data?.id)
        newItem = {
          ...newItem,
          id: response?.data?.id,
        };
      dispatch(
        setItemsById({
          ...itemsById,
          [`${newItem.id}`]: newItem,
        }),
      );
      dispatch(buildRows(newItem.userIds));
    } catch (err: any) {
      console.log('ERROR: ', err.message);
      enqueueErrorBar(err.message || '');
    }
  };

  const createStatus = async () => {
    try {
      let newItem: StatusItem = {
        id: generateUUID(),
        name: status ? status.name : '',
        startDate: status?.startDate!,
        endDate: status?.endDate!,
        userIds: [status?.assignee.id],
        statusTypeId: status?.type,
        hour: 0,
        isPlaceHolder: true,
        type: 'statusItem',
      };
      const endpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/status`;
      const data = {
        typeId: newItem.statusTypeId || '',
        teamMemberId: newItem.userIds[0] || '',
        startDate: dayjs(newItem.startDate || '').toISOString(),
        endDate: dayjs(newItem.endDate || '').toISOString(),
      };
      const response = await axios.post(endpoint, data);
      if (response?.data?.id)
        newItem = {
          ...newItem,
          id: response?.data?.id,
        };
      dispatch(
        setStatusItemsById({
          ...statusItemsById,
          [`${newItem.id}`]: newItem,
        }),
      );
      dispatch(buildRows(newItem.userIds));
    } catch (err: any) {
      console.log('ERROR: ', err.message);
      enqueueErrorBar(err.message || '');
    }
  };

  const createTimeOff = async () => {
    try {
      let newItem: TimeOffItem = {
        id: generateUUID(),
        name: '',
        startDate: timeOff?.startDate!,
        endDate: timeOff?.endDate!,
        userIds: [timeOff?.assignees.id],
        hour: timeOff?.hourEachDay ?? 0,
        isPlaceHolder: false,
        reason: timeOff?.reason!,
        note: allocation?.note,
        isTentative: timeOff?.isTentative!,
        type: 'timeOffItem',
      };
      const endpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/time-offs`;
      const data = {
        typeId: newItem.reason?.id || '',
        teamMemberId: newItem.userIds[0] || '',
        startDate: dayjs(newItem.startDate || '').toISOString(),
        endDate: dayjs(newItem.endDate || '').toISOString(),
      };
      const response = await axios.post(endpoint, data);
      if (response?.data?.id) {
        newItem = {
          ...newItem,
          id: response?.data?.id,
          reason: newItem.reason?.label || '',
        };
      }
      dispatch(
        setTimeOffItemsById({
          ...timeOffItemsById,
          [`${newItem.id}`]: newItem,
        }),
      );
      dispatch(buildRows(newItem.userIds));
    } catch (err: any) {
      console.log('ERROR: ', err.message);
      enqueueErrorBar(err.message || '');
    }
  };

  const handleSave = () => {
    if (currentTab == 0) {
      createAllocation();
    } else if (currentTab == 1) {
      createTimeOff();
    } else {
      createStatus();
    }
    setIsOpen(false);
    reset();
  };

  const reset = () => {
    setAllocation(null);
    setStatus(null);
    setTimeOff(null);
    setCurrentTab(0);
  };

  return (
    <CustomMiModal
      footer={
        <Footer
          submitAction={() => {
            handleSave();
          }}
          submitTitle={submitText}
          handleClose={() => {
            setIsOpen(false);
            reset();
          }}
        />
      }
      title={<Header currentIndex={currentTab} handleChange={handleChange} />}
      isOpen={isOpen}
      size={'sm'}
      onClose={() => {
        setIsOpen(false);
        reset();
      }}
    >
      <Box width='100%'>
        {currentTab == 0 && (
          <CustomTabPanel value={currentTab} index={0}>
            <AllocationTab />
          </CustomTabPanel>
        )}
        {currentTab == 1 && (
          <CustomTabPanel value={currentTab} index={1}>
            <TimeOffTab />
          </CustomTabPanel>
        )}
        {currentTab == 2 && (
          <CustomTabPanel value={currentTab} index={2}>
            <StatusTab />
          </CustomTabPanel>
        )}
      </Box>
    </CustomMiModal>
  );
};

export default MainModal;
