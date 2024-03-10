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
} from '@mui/material';
import React, { useState } from 'react';
import { ProjectInfo, ProjectMileStone, ProjectTask, ProjectTeam } from './models';
import InfoSubBody from './components/CreateProjectInfoTab';
import MilestoneSubBody from './components/CreateProjectMilestoneTab';
import TeamSubBody from './components/CreateProjectTeamTab';
import TaskListSubBody from './components/CreateProjectTaskTab';

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
          <Typography>{children}</Typography>
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
    <Stack direction='row' spacing={1} paddingY={3}>
      <Button onClick={handleSave} variant='contained'>
        Create project
      </Button>
      <Button onClick={handleClose} sx={{ backgroundColor: '#F5F5F5', color: 'black' }}>
        Cancel
      </Button>
    </Stack>
  );
};

interface ModalBodyProps {
  info: ProjectInfo;
  team: ProjectTeam[] | null;
  mileStone: ProjectMileStone[] | null;
  task: ProjectTask[] | null;
  setInfo: (info: ProjectInfo) => void;
  setTeam: (team: ProjectTeam[] | null) => void;
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
      <Box sx={{ borderColor: 'transparent', mr: 6, mt: 1 }}>
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
              '&:hover': { backgroundColor: 'transparent', color: 'black' },
            }}
            wrapped
          />
          <Tab
            label='Team'
            {...a11yProps(1)}
            sx={{
              '&:hover': { backgroundColor: 'transparent', color: 'black' },
            }}
          />
          <Tab
            label={`Milestones ${mileStone?.length ?? 0}`}
            {...a11yProps(2)}
            sx={{
              '&:hover': { backgroundColor: 'transparent', color: 'black' },
            }}
          />
          <Tab
            label={`Task list ${task?.length ?? 0}`}
            {...a11yProps(3)}
            sx={{
              '&:hover': { backgroundColor: 'transparent', color: 'black' },
            }}
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
   isOpen: boolean,
   setIsOpen: (isOpen: boolean) => void,
   size?: Breakpoint | false
}

const CreateProjectModal = (props: CreateProjectModalProps) => {
  const theme = useTheme();

  const {
    size,
    isOpen,
    setIsOpen
  } = props

  const defaultColor = '#ff0000';
  const defaultProjectInfo: ProjectInfo = {
    color: defaultColor,
    budget: 0,
    type: 'billable',
    isTentative: false,
    note: '',
    client: '',
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
  const [teamData, setTeamData] = useState<ProjectTeam[] | null>(null);
  const [mileStoneData, setMileStoneData] = useState<ProjectMileStone[] | null>(null);
  const [taskData, setTaskData] = useState<ProjectTask[] | null>(demoForTasks);

  const handleSave = () => {
    setIsOpen(false);
  };

  const handleOnClose = () => {
     setIsOpen(false)
  };

  return (
    <MiModal
      title={
        <TextField
          id='project-title'
          name='projectTitle'
          variant='standard'
          fullWidth
          placeholder='Project name'
          value={projectName}
          onChange={(e) => setProjectName(e.target.value.trim())}
          InputProps={{
            disableUnderline: true,
            sx: { fontSize: '22px' },
          }}
        />
      }
      isOpen={isOpen}
      size={size ?? 'xs'}
      onClose={handleOnClose}
      children={
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
      }
      footer={<ModalFooter handleSave={handleSave} handleClose={handleOnClose} />}
      isCloseByBackdrop={false}
    />
  );
};

export default CreateProjectModal;
