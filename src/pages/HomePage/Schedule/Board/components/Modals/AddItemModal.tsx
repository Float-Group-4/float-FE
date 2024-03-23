import MiModal from '@base/components/MiModal';
import {
  useTheme,
  Typography,
  TextField,
  Tabs,
  Tab,
  Button,
  Stack,
  Breakpoint,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputAdornment,
} from '@mui/material';
import { useScheduleContext } from '@pages/HomePage/Schedule/ScheduleContext';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Item } from '../../../../../../types/primitive/item.interface';
import { getRangeDate } from '../../common/helper';
import { DragInfo } from '../../common/type';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { generateUUID } from '@base/utils/uuid';
import { setItemsById } from '../../../../../../redux/general/generalSlice';
import { buildRows } from '../../../../../../redux/schedule/thunk';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Bookmark } from '@mui/icons-material';

interface ModalFooterProps {
  handleSave: (e: any) => void;
  handleClose: (e: any) => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ handleSave, handleClose }) => {
  return (
    <Stack direction='row' spacing={1} paddingY={3}>
      <Button onClick={handleSave} variant='contained'>
        Create
      </Button>
      <Button onClick={handleClose} sx={{ backgroundColor: '#F5F5F5', color: 'black' }}>
        Cancel
      </Button>
    </Stack>
  );
};

interface AddItemModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  size?: Breakpoint | false;
}

const AddItemModal = (props: AddItemModalProps) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const size = 'sm';
  const { addItemModalRef } = useScheduleContext();
  const usersByIds = useAppSelector((state) => state.general.usersById);
  const itemsById = useAppSelector((state) => state.general.itemsById);
  useImperativeHandle(addItemModalRef, () => {
    return {
      openAddItemModal(data) {
        const dragInfo: DragInfo = data.dragInfo;
        if (dragInfo) {
          const { from, to } = getRangeDate(dragInfo.smp?.dayIndex, dragInfo.emp?.dayIndex);
          setStartDate(from.format('YYYY-MM-DD'));
          setEndDate(to.format('YYYY-MM-DD'));
          setUserIds([dragInfo.userId]);
        }
        setIsOpen(true);
      },
    };
  });

  const [itemName, setItemName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [userIds, setUserIds] = useState<string[]>([]);
  const [hour, setHour] = useState<string>('8');
  const [tabIndex, setTabIndex] = useState<string>('1');
  const [timeOff, setTimeOff] = useState<string>('Paid Time Off');
  const [note, setNote] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [statusColor, setStatusColor] = useState<string>('blue');

  const timeOffTypes = [
    'Annual Leave',
    'Compassionate Leave',
    'Paid Time Off',
    'Parental Leave',
    'Public Holiday',
    'Sick Leave',
    'Unpaid Time Off',
  ];

  const handleSave = () => {
    switch (tabIndex) {
      case '1':
        const newItem: Item = {
          id: generateUUID(),
          name: itemName,
          startDate: startDate,
          endDate: endDate,
          userIds: userIds,
          hour: parseInt(hour) || 0,
          isPlaceHolder: false,
        };
        dispatch(
          setItemsById({
            ...itemsById,
            [`${newItem.id}`]: newItem,
          }),
        );
        dispatch(buildRows(userIds));
        setIsOpen(false);
        break;
      case '2':
        break;
      case '3':
        break;
      default:
        break;
    }
  };

  const handleOnClose = () => {
    setIsOpen(false);
    setTabIndex('1');
    setStatus('');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  };

  const handleTimeOffChange = (event: SelectChangeEvent) => {
    setTimeOff(event.target.value);
  };

  useEffect(() => handleStatus(), [status]);

  const handleStatus = () => {
    switch (status) {
      case 'Home':
        setStatusColor('red');
        break;
      case 'Travel':
        setStatusColor('green');
        break;
      case 'Office':
        setStatusColor('aqua');
        break;
      default:
        setStatusColor('blue');
    }
  };

  const HandleStatusBtnClick = (newStatus: string) => {
    setStatus(newStatus);
  };

  return (
    <MiModal
      isOpen={isOpen}
      size={'xs'}
      onClose={handleOnClose}
      children={
        <TabContext value={tabIndex}>
          <TabList onChange={handleTabChange}>
            <Tab label='Allocation' value='1' />
            <Tab label='Time off' value='2' />
            <Tab label='Status' value='3' />
          </TabList>
          {/* Allocation */}
          <TabPanel value='1'>
            <div className='p-4'>
              <FormControl fullWidth className={'mb-4'}>
                <Typography className={'mb-2'}>Item Name:</Typography>
                <TextField
                  sx={{ width: '100%' }}
                  name='itemName'
                  placeholder='Name...'
                  value={itemName}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setItemName(value);
                  }}
                />
              </FormControl>
              <FormControl fullWidth className={'mb-4'}>
                <Typography className={'mb-2'}>Start Date:</Typography>
                <TextField
                  sx={{ width: '100%' }}
                  name='startDate'
                  value={startDate}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setStartDate(value);
                  }}
                />
              </FormControl>
              <FormControl fullWidth className={'mb-4'}>
                <Typography className={'mb-2'}>End Date:</Typography>
                <TextField
                  sx={{ width: '100%' }}
                  name='endDate'
                  value={endDate}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setEndDate(value);
                  }}
                />
              </FormControl>
              <FormControl fullWidth className={'mb-4'}>
                <Typography className={'mb-2'}>User:</Typography>
                <TextField
                  disabled
                  sx={{ width: '100%' }}
                  name='user'
                  value={usersByIds[userIds[0]]?.name}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setUserIds([value]);
                  }}
                />
              </FormControl>
              <FormControl fullWidth className={'mb-4'}>
                <Typography className={'mb-2'}>Hour:</Typography>
                <TextField
                  sx={{ width: '100%' }}
                  name='hour'
                  value={hour}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setHour(value);
                  }}
                />
              </FormControl>
            </div>
          </TabPanel>

          {/* Time off */}
          <TabPanel value='2'>
            <div className='p-4'>
              <FormControl fullWidth className={'mb-4'}>
                <Typography className={'mb-2'}>Start Date:</Typography>
                <TextField
                  sx={{ width: '100%' }}
                  name='startDate'
                  value={startDate}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setStartDate(value);
                  }}
                />
              </FormControl>
              <FormControl fullWidth className={'mb-4'}>
                <Typography className={'mb-2'}>End Date:</Typography>
                <TextField
                  sx={{ width: '100%' }}
                  name='endDate'
                  value={endDate}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setEndDate(value);
                  }}
                />
              </FormControl>
              <FormControl fullWidth className={'mb-4'}>
                <Typography className={'mb-2'}>Time off</Typography>
                <Select
                  value={timeOff}
                  onChange={handleTimeOffChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {timeOffTypes.map((value, index) => (
                    <MenuItem value={value} key={index}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth className={'mb-4'}>
                <Typography className={'mb-2'}>Notes</Typography>
                <TextField
                  sx={{ width: '100%' }}
                  name='note'
                  placeholder=''
                  value={note}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setNote(value);
                  }}
                  multiline
                  rows={4}
                />
              </FormControl>
              <FormControl fullWidth className={'mb-4'}>
                <Typography className={'mb-2'}>User:</Typography>
                <TextField
                  disabled
                  sx={{ width: '100%' }}
                  name='user'
                  value={usersByIds[userIds[0]]?.name}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setUserIds([value]);
                  }}
                />
              </FormControl>
            </div>
          </TabPanel>

          {/* Status */}
          <TabPanel value='3'>
            <div className='p-4'>
              <FormControl fullWidth className={'mb-4'}>
                <Typography className={'mb-2'}>Start Date:</Typography>
                <TextField
                  sx={{ width: '100%' }}
                  name='startDate'
                  value={startDate}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setStartDate(value);
                  }}
                />
              </FormControl>
              <FormControl fullWidth className={'mb-4'}>
                <Typography className={'mb-2'}>End Date:</Typography>
                <TextField
                  sx={{ width: '100%' }}
                  name='endDate'
                  value={endDate}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setEndDate(value);
                  }}
                />
              </FormControl>
              <FormControl fullWidth className={'mb-4'}>
                <Typography className={'mb-2'}>Set a status</Typography>
                <TextField
                  sx={{ width: '100%' }}
                  placeholder='Custom status'
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Bookmark sx={{ color: statusColor }} />
                      </InputAdornment>
                    ),
                  }}
                />
                {!status ? (
                  <div>
                    <Button
                      fullWidth
                      className={'bg-slate-100 text-black mt-1'}
                      startIcon={
                        <Bookmark
                          sx={{
                            color: 'red',
                            transform: 'scale(1.8)',
                            width: '30px',
                            margin: '0 9px',
                          }}
                        />
                      }
                      sx={{ justifyContent: 'start' }}
                      onClick={() => {
                        HandleStatusBtnClick('Home');
                      }}
                    >
                      Home
                    </Button>
                    <Button
                      fullWidth
                      className={'bg-slate-100 text-black mt-1'}
                      startIcon={
                        <Bookmark
                          sx={{
                            color: 'green',
                            transform: 'scale(1.8)',
                            width: '30px',
                            margin: '0 9px',
                          }}
                        />
                      }
                      sx={{ justifyContent: 'start' }}
                      onClick={() => {
                        HandleStatusBtnClick('Travel');
                      }}
                    >
                      Travel
                    </Button>
                    <Button
                      fullWidth
                      className={'bg-slate-100 text-black mt-1'}
                      startIcon={
                        <Bookmark
                          sx={{
                            color: 'aqua',
                            transform: 'scale(1.8)',
                            width: '30px',
                            margin: '0 9px',
                          }}
                        />
                      }
                      sx={{ justifyContent: 'start' }}
                      onClick={() => {
                        HandleStatusBtnClick('Office');
                      }}
                    >
                      Office
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </FormControl>
              <FormControl fullWidth className={'mb-4'}>
                <Typography className={'mb-2'}>Assigned to</Typography>
                <TextField
                  disabled
                  sx={{ width: '100%' }}
                  name='user'
                  value={usersByIds[userIds[0]]?.name}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setUserIds([value]);
                  }}
                />
              </FormControl>
            </div>
          </TabPanel>
        </TabContext>
      }
      footer={<ModalFooter handleSave={handleSave} handleClose={handleOnClose} />}
      isCloseByBackdrop={false}
    />
  );
};

export default AddItemModal;
