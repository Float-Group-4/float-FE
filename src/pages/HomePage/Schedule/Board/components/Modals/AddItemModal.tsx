import MiModal from '@base/components/MiModal';
import {
  useTheme,
  Typography,
  TextField,
  Box,
  Tabs,
  Tab,
  Button,
  Stack,
  Breakpoint,
  FormControl,
  Autocomplete,
} from '@mui/material';
import { useScheduleContext } from '@pages/HomePage/Schedule/ScheduleContext';
import React, { useImperativeHandle, useState } from 'react';
import { Item } from '../../../../../../types/primitive/item.interface';
import { getRangeDate } from '../../common/helper';
import { DragInfo } from '../../common/type';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { generateUUID } from '@base/utils/uuid';
import { setItemsById } from '../../../../../../redux/general/generalSlice';
import { buildRows } from '../../../../../../redux/schedule/thunk';

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

  const handleSave = () => {
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
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  return (
    <MiModal
      title={<div className='text-2xl text-blue-500 '>Add New Item</div>}
      isOpen={isOpen}
      size={'xs'}
      onClose={handleOnClose}
      children={
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
      }
      footer={<ModalFooter handleSave={handleSave} handleClose={handleOnClose} />}
      isCloseByBackdrop={false}
    />
  );
};

export default AddItemModal;
