import MiModal from '@base/components/MiModal';
import {
  useTheme,
  TextField,
  Box,
  Tabs,
  Tab,
  Button,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import { Budget, ProjectInfo, ProjectMember, ProjectMileStone, ProjectTask } from './models';
import InfoSubBody from './components/CreateProjectInfoTab';
import MilestoneSubBody from './components/CreateProjectMilestoneTab';
import TeamSubBody from './components/CreateProjectTeamTab';
import TaskListSubBody from './components/CreateProjectTaskTab';
import { ProjectType } from '../../../types/enums';
import { useAppDispatch } from '@hooks/reduxHooks';
import { addProject } from '../../../redux/project/projectSlice';
import { generateUUID } from '@base/utils/uuid';


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
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ px: 1, pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `project-tab-${index}`,
    'aria-controls': `project-tabpanel-${index}`,
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
        Create project
      </Button>
      <Button onClick={handleClose} sx={{ backgroundColor: '#F5F5F5 !important', color: 'black', '&:hover' :{bgcolor: '#E1E5F3 !important', color: 'black !important'} }}>
        Cancel
      </Button>
    </Stack>
  );
};

interface ModalBodyProps {
  info: ProjectInfo;
  team: ProjectMember[] | null;
  mileStone: ProjectMileStone[] | null;
  task: ProjectTask[] | null;
  setInfo: (info: ProjectInfo) => void;
  setTeam: (team: ProjectMember[] | null) => void;
  setMileStone: (mileStone: ProjectMileStone[] | null) => void;
  setTask: (task: ProjectTask[] | null) => void;
}

const ModalBody: React.FC<ModalBodyProps> = ({
  info,
  team,
  mileStone,
  task,
  setInfo,
  setTeam,
  setMileStone,
  setTask,
}) => {
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
            label='Team'
            {...a11yProps(1)}
            sx={{
              fontSize: '15px',
              minWidth: 'auto',
              '&:hover': { backgroundColor: 'transparent', color: 'black' },
            }}
            wrapped
          />
          <Tab
            label={`Milestones ${mileStone?.length == 0 || mileStone == null ? '' : mileStone?.length}`}
            {...a11yProps(2)}
            sx={{
              fontSize: '15px',
              minWidth: 'auto',
              '&:hover': { backgroundColor: 'transparent', color: 'black' },
            }}
            wrapped
          />
          <Tab
            label={`Task list ${task?.length ?? 0}`}
            {...a11yProps(3)}
            sx={{
              fontSize: '15px',
              minWidth: 'auto',
              '&:hover': { backgroundColor: 'transparent', color: 'black' },
            }}
            wrapped
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={currentIndex} index={0}>
        <InfoSubBody info={info} setInfo={setInfo} />
      </CustomTabPanel>
      <CustomTabPanel value={currentIndex} index={1}>
        <TeamSubBody team={team} setTeam={setTeam} />
      </CustomTabPanel>
      <CustomTabPanel value={currentIndex} index={2}>
        <MilestoneSubBody mileStone={mileStone} setMileStone={setMileStone} />
      </CustomTabPanel>
      <CustomTabPanel value={currentIndex} index={3}>
        <TaskListSubBody tasks={task} setTasks={setTask} />
      </CustomTabPanel>
    </Box>
  );
};

interface CreateProjectModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  sx?: any;
}

const CreateProjectModal = (props: CreateProjectModalProps) => {

  const { sx, isOpen, setIsOpen } = props;
  const dispatch = useAppDispatch();


  const defaultColor = '#3451b2';
  const defaultProjectInfo: ProjectInfo = {
    id: "1",
    color: defaultColor,
    budget: Budget.no,
    type: ProjectType.billable,
    isTentative: false,
    note: '',
    client: '',
    name: ''
  };

  const demoForTasks: ProjectTask[] = [
    {
      id: 1,
      name: 'milestone 1',
      isBillable: true,
    },
  ];

  const [projectName, setProjectName] = useState<string>('');
  const [infoData, setInfoData] = useState<ProjectInfo>(defaultProjectInfo);
  const [teamData, setTeamData] = useState<ProjectMember[] | null>(null);
  const [mileStoneData, setMileStoneData] = useState<ProjectMileStone[] | null>(null);
  const [taskData, setTaskData] = useState<ProjectTask[] | null>(demoForTasks);

  const handleSave = () => {
    let p ={project: {...infoData, name: projectName, id: generateUUID(),}, members: teamData ?? [], milestones: mileStoneData ?? [], tasks: taskData ?? [],};
    console.log(p);
    dispatch(addProject(p));
    setIsOpen(false);
  };

  const handleOnClose = () => {
    setIsOpen(false);
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
      <MiModal
        title={
          <TextField
            id='project-title'
            name='projectTitle'
            variant='standard'
            fullWidth
            placeholder='Project name'
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            InputProps={{
              disableUnderline: true,
              sx: { fontSize: '22px' },
            }}
          />
        }
        size={'sm'}
        isOpen={isOpen}
        onClose={handleOnClose}
        footer={<ModalFooter handleSave={handleSave} handleClose={handleOnClose} />}
        isCloseByBackdrop={false}
      >
        <ModalBody
          info={infoData}
          team={teamData}
          mileStone={mileStoneData}
          task={taskData}
          setInfo={setInfoData}
          setTeam={setTeamData}
          setMileStone={setMileStoneData}
          setTask={setTaskData}
        />
      </MiModal>
    </Box>
  );
};

export default CreateProjectModal;
