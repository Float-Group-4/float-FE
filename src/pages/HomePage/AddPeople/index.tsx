import MiModal from '@base/components/MiModal';
import { useTheme, Typography, TextField, Box, Tabs, Tab, Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import InfoSubBody from './components/InfoTab';
import AccessSubBody from './components/AccessTab';
import AvailSubBody from './components/AvailabilityTab';
import ProjectSubBody from './components/ProjectTab';
import { PersonInfo, Availability, WorkingType, ContractType, AccountType } from './models';
import MiModalModified from './components/MiModalModified';
import { useAppDispatch } from '@hooks/reduxHooks';
import { addPeople } from '../../../redux/people/peopleSlice';
import { generateUUID } from '@base/utils/uuid';
import ManageSubBody from './components/ManageTab';

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
      id={`person-tabpanel-${index}`}
      aria-labelledby={`person-tab-${index}`}
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
    id: `person-tab-${index}`,
    'aria-controls': `person-tabpanel-${index}`,
  };
}
interface ModalFooterProps {
  handleSave: (e: any) => void;
  handleClose: (e: any) => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ handleSave, handleClose }) => {
  return (
    <Stack direction='row' spacing={1} paddingY={3} alignItems={'left'} justifyItems={'left'}>
      <Button onClick={handleSave} variant='contained'>
        Add person
      </Button>
      <Button
        onClick={handleClose}
        sx={{
          backgroundColor: '#F5F5F5 !important',
          color: 'black',
          '&:hover': { bgcolor: '#E1E5F3 !important', color: 'black !important' },
        }}
      >
        Cancel
      </Button>
    </Stack>
  );
};

interface ModalBodyProps {
  info: PersonInfo;
  setInfo: (info: PersonInfo) => void;
}

const ModalBody: React.FC<ModalBodyProps> = ({ info, setInfo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentIndex(newValue); // Update currentIndex state when tab is changed
  };

  return (
    <Box sx={{ width: '100%' }}>
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
            label='Info'
            {...a11yProps(0)}
            sx={{
              fontSize: '15px',
              '&:hover': { backgroundColor: 'transparent', color: 'black' },
              minWidth: 'auto',
            }}
            wrapped
          />
          <Tab
            label='Access'
            {...a11yProps(1)}
            sx={{
              fontSize: '15px',
              minWidth: 'auto',
              '&:hover': { backgroundColor: 'transparent', color: 'black' },
            }}
            wrapped
          />
          <Tab
            label='Availability'
            {...a11yProps(2)}
            sx={{
              fontSize: '15px',
              minWidth: 'auto',
              '&:hover': { backgroundColor: 'transparent', color: 'black' },
            }}
            wrapped
          />
          <Tab
            label={`Projects ${info.projects?.length == 0 ? '' : info.projects?.length}`}
            {...a11yProps(3)}
            sx={{
              fontSize: '15px',
              minWidth: 'auto',
              '&:hover': { backgroundColor: 'transparent', color: 'black' },
            }}
            wrapped
          />
          {info?.accountType == AccountType.admin && (
            <Tab
              label={`Manages`}
              {...a11yProps(4)}
              sx={{
                fontSize: '15px',
                minWidth: 'auto',
                '&:hover': { backgroundColor: 'transparent', color: 'black' },
              }}
              wrapped
            />
          )}
        </Tabs>
      </Box>
      <CustomTabPanel value={currentIndex} index={0}>
        <InfoSubBody info={info} setInfo={setInfo} />
      </CustomTabPanel>
      <CustomTabPanel value={currentIndex} index={1}>
        <AccessSubBody info={info} setInfo={setInfo} />
      </CustomTabPanel>
      <CustomTabPanel value={currentIndex} index={2}>
        <AvailSubBody info={info} setInfo={setInfo} />
      </CustomTabPanel>
      <CustomTabPanel value={currentIndex} index={3}>
        <ProjectSubBody info={info} setInfo={setInfo} />
      </CustomTabPanel>
      {info?.accountType == AccountType.admin && (
        <CustomTabPanel value={currentIndex} index={4}>
          <ManageSubBody info={info} setInfo={setInfo} />
        </CustomTabPanel>
      )}
    </Box>
  );
};

interface AddPeopleModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  sx?: any;
}

const AddPeopleModal = (props: AddPeopleModalProps) => {
  const theme = useTheme();

  const { sx, isOpen, setIsOpen } = props;

  const avail: Availability = {
    startDate: new Date().toDateString(),
    workingType: WorkingType.partTime,
  };
  const sampleData: PersonInfo = {
    id: '1',
    availability: avail,
    type: ContractType.employee,
    name: '',
    accountType: AccountType.none,
    manages: [],
    projects: [],
    email: '',
    role: '',
    department: '',
    tags: [],
  };

  const dispatch = useAppDispatch();

  const [personInfoData, setPersonInfoData] = useState<PersonInfo>(sampleData);

  const handleSave = () => {
    dispatch(addPeople({ person: { ...personInfoData, id: generateUUID() } }));
    setIsOpen(false);
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const setValue = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setPersonInfoData({
      ...personInfoData,
      name: value,
    });
  };

  return (
    <Box
      flexDirection='column'
      overflow='auto'
      maxHeight='100vh'
      sx={{
        ...sx,
        '&::-webkit-scrollbar': { width: '8px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#aaa', borderRadius: '4px' },
      }}
    >
      <MiModalModified
        title={
          <Box display='flex' flexDirection='column'>
            <TextField
              id='person-name'
              name='personName'
              variant='standard'
              fullWidth
              placeholder='Person name'
              value={personInfoData.name}
              onChange={setValue}
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: '22px' },
              }}
            />
            <TextField
              id='project-title'
              name='projectTitle'
              variant='standard'
              size='small'
              placeholder='Email'
              inputProps={{ style: { fontSize: '15px' } }}
              value={personInfoData.name}
              onChange={setValue}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Box>
        }
        size={'sm'}
        isOpen={isOpen}
        onClose={handleOnClose}
        footer={<ModalFooter handleSave={handleSave} handleClose={handleOnClose} />}
        isCloseByBackdrop={false}
      >
        <ModalBody info={personInfoData} setInfo={setPersonInfoData} />
      </MiModalModified>
    </Box>
  );
};

export default AddPeopleModal;
