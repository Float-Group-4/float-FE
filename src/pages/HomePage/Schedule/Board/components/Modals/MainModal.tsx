import MiModal from '@base/components/MiModal';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { Box, Button, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useImperativeHandle, useState } from 'react';
import AllocationTab from './AllocationTab';
import TimeOffTab from './TimeOffTab';
import StatusTab from './StatusTab';
import { getRangeDate } from '../../common/helper';
import { Allocation, DragInfo, Status, TimeOff } from '../../common/type';
import { useScheduleContext } from '@pages/HomePage/Schedule/ScheduleContext';
import dayjs from 'dayjs';
import { generateUUID } from '@base/utils/uuid';
import { setItemsById } from '../../../../../../redux/general/generalSlice';
import { buildRows } from '../../../../../../redux/schedule/thunk';
import { AllocationItem, StatusItem, TimeOffItem } from '../../../../../../types/primitive/item.interface';
import CustomMiModal from './CustomMiModal';

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
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const [currentTab, setCurrentTab] = useState(0);
  const { setAllocation, setStatus, setTimeOff, allocation, status, timeOff } =
    useScheduleContext();
  
  const itemsById = useAppSelector((state) => state.general.itemsById);
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
        if (dragInfo) {
          const { from, to } = getRangeDate(dragInfo.smp?.dayIndex, dragInfo.emp?.dayIndex);
          const start = from.format('YYYY-MM-DD');
          const end = to.format('YYYY-MM-DD');
          console.log(dragInfo.userId);
          defaultAllocation.startDate = start;
          defaultAllocation.endDate = end;
          defaultStatus.startDate = start;
          defaultStatus.endDate = end;
          defaultTimeOff.startDate = start;
          defaultTimeOff.endDate = end;
          defaultAllocation.assignees = [dragInfo.userId];
          defaultTimeOff.assignees = [dragInfo.userId];
          defaultStatus.assignee = dragInfo.userId;
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

  const handleSave = () => {
    if (currentTab == 0) {
      const newItem: AllocationItem = {
        id: generateUUID(),
        name: '',
        startDate: allocation?.startDate!,
        endDate: allocation?.endDate!,
        userIds: allocation?.assignees!,
        hour: allocation?.hourEachDay ?? 0,
        isPlaceHolder: false,
        projectId: allocation?.projectId!,
        type: allocation?.type!,
        note: allocation?.note,
      };
      dispatch(
        setItemsById({
          ...itemsById,
          [`${newItem.id}`]: newItem,
        }),
      );
      dispatch(buildRows(newItem.userIds));
    } else if (currentTab == 1) {
      const newItem: TimeOffItem = {
        id: generateUUID(),
        name: '',
        startDate: timeOff?.startDate!,
        endDate: timeOff?.endDate!,
        userIds: timeOff?.assignees!,
        hour: timeOff?.hourEachDay ?? 0,
        isPlaceHolder: false,
        reason: timeOff?.reason!,
        note: allocation?.note,
        isTentative: timeOff?.isTentative!,
      };
      dispatch(
        setItemsById({
          ...itemsById,
          [`${newItem.id}`]: newItem,
        }),
      );
      dispatch(buildRows(newItem.userIds));
    } else {
      const newItem: StatusItem = {
        id: generateUUID(),
        name: '',
        startDate: status?.startDate!,
        endDate: status?.endDate!,
        userIds: [status?.assignee!],
        hour: 0,
        isPlaceHolder: true,
      };
      dispatch(
        setItemsById({
          ...itemsById,
          [`${newItem.id}`]: newItem,
        }),
      );
      dispatch(buildRows(newItem.userIds));
    }

    setIsOpen(false);
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
            setAllocation(null);
            setStatus(null);
            setTimeOff(null);
            setIsOpen(false);
          }}
        />
      }
      title={<Header currentIndex={currentTab} handleChange={handleChange} />}
      isOpen={isOpen}
      size={'sm'}
      onClose={() => setIsOpen(false)}
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
