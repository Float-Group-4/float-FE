import MiModal from '@base/components/MiModal';
import { Typography, TextField, Box, Tabs, Tab, Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import { ProjectInfo, ProjectMileStone, ProjectTask, ProjectTeam } from './models';
import InfoSubBody from './components/CreateProjectInfoTab';
import MilestoneSubBody from './components/CreateProjectMilestoneTab';
import TeamSubBody from './components/CreateProjectTeamTab';
import TaskListSubBody from './components/CreateProjectTaskTab';
import { ProjectType } from '../../../types/enums';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import {
  Project,
  postNewProject,
  updateProject,
  updateSingleProject,
} from '../../../redux/project/projectSlice';
import { generateUUID } from '@base/utils/uuid';
import { useParams } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_FRONTEND_BASE_URL;
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
  isUpdate: boolean;
  handleSave: (e: any) => void;
  handleClose: (e: any) => void;
  handleUpdate: (e: any) => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  handleSave,
  handleClose,
  handleUpdate,
  isUpdate,
}) => {
  return (
    <Stack
      direction='row'
      spacing={1}
      paddingY={3}
      alignItems={'left'}
      justifyItems={'left'}
      sx={{ flexGrow: 1 }}
    >
      {!isUpdate ? (
        <Button onClick={handleSave} variant='contained'>
          Create project
        </Button>
      ) : (
        <Button onClick={handleUpdate} variant='contained'>
          Update project
        </Button>
      )}

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
  info: ProjectInfo;
  team: ProjectTeam[];
  mileStone: ProjectMileStone[];
  task: ProjectTask[];
  setInfo: (info: ProjectInfo) => void;
  setTeam: (team: ProjectTeam[]) => void;
  setMileStone: (mileStone: ProjectMileStone[]) => void;
  setTask: (task: ProjectTask[]) => void;
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
  data?: Project;
  sx?: any;
}

const CreateProjectModal = (props: CreateProjectModalProps) => {
  const { sx, isOpen, setIsOpen, data } = props;
  const dispatch = useAppDispatch();

  let isUpdate = data != null;

  const defaultColor = '#3451b2';

  const name = data?.project.name ?? '';

  const params = useParams();
  const teamId = params.teamId;

  let defaultProjectInfo: ProjectInfo;

  if (data != null) {
    defaultProjectInfo = data.project;
  } else {
    defaultProjectInfo = {
      id: '1',
      color: defaultColor,
      budget: 0,
      type: ProjectType.billable,
      isTentative: false,
      note: '',
      client: '',
      name: '',
      owner: '5859846f-d30d-4cae-b52c-c922d7203f27',
      teamId: '15790e68-9afa-4c4b-9f3d-e7460ffb1e74',
    };
  }

  let demoForTasks: ProjectTask[];

  if (data != null) {
    if (data.tasks != null) {
      demoForTasks = data.tasks;
    } else {
      demoForTasks = [];
    }
  } else {
    demoForTasks = [
      // {
      //   id: 1,
      //   name: 'milestone 1',
      //   isBillable: true,
      // },
    ];
  }

  let defaultTeamData: ProjectTeam[];

  if (data != null) {
    if (data.members != null) {
      defaultTeamData = data.members;
    } else {
      defaultTeamData = [];
    }
  } else {
    defaultTeamData = [];
  }

  let defaultMileStone: ProjectMileStone[] = [];
  if (data != null) {
    if (data.milestones != null) {
      defaultMileStone = data.milestones;
    }
  }

  const [projectName, setProjectName] = useState<string>(name);
  const [infoData, setInfoData] = useState<ProjectInfo>(defaultProjectInfo);
  const [teamData, setTeamData] = useState<ProjectTeam[]>(defaultTeamData);
  const [mileStoneData, setMileStoneData] = useState<ProjectMileStone[]>(defaultMileStone);
  const [taskData, setTaskData] = useState<ProjectTask[]>(demoForTasks);

  const handleSave = () => {
    let p = {
      project: { ...infoData, name: projectName, id: generateUUID() },
      members: teamData ?? [],
      milestones: mileStoneData ?? [],
      tasks: taskData ?? [],
    };
    console.log(p);
    // dispatch(addProject(p));
    p.project.owner = '5859846f-d30d-4cae-b52c-c922d7203f27';
    p.project.teamId = '15790e68-9afa-4c4b-9f3d-e7460ffb1e74';
    dispatch(postNewProject(p));

    setIsOpen(false);
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const handleUpdate = () => {
    let p = {
      project: { ...infoData, name: projectName },
      members: teamData ?? [],
      milestones: mileStoneData ?? [],
      tasks: taskData ?? [],
    };
    console.log(infoData.id);
    p.project.owner = '9d080daa-3929-4601-83a3-93a7aa86d372';
    p.project.teamId = 'ad53cc61-a3dd-469f-98aa-ace14809239d';
    dispatch(updateSingleProject(p));
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
        footer={
          <ModalFooter
            isUpdate={isUpdate}
            handleSave={handleSave}
            handleClose={handleOnClose}
            handleUpdate={handleUpdate}
          />
        }
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
