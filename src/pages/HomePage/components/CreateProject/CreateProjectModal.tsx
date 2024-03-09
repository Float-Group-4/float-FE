import {
  MIMODAL_ANCHOR_CENTER,
  MIMODAL_ANCHOR_RIGHT,
  MiModalProps,
} from '@base/components/MiModal';
import {
  useTheme,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  TextField,
  Box,
  Tabs,
  Tab,
  DialogActions,
  Button,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import { drawerWidth, headerHeight } from '@base/config/config';
import { ProjectInfo, ProjectMileStone, ProjectTask, ProjectTeam } from '../models';
import InfoSubBody from './CreateProjectInfoTab';
import MilestoneSubBody from './CreateProjectMilestoneTab';
import TeamSubBody from './CreateProjectTeamTab';
import TaskListSubBody from './CreateProjectTaskTab';

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

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

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

const CreateProjectModal = (props: MiModalProps) => {
  const theme = useTheme();

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

  const {
    isOpen,
    size,
    fullScreen = false,
    onClose,
    onScroll,
    anchor = MIMODAL_ANCHOR_CENTER,
    disablePortal = false,
  } = props;

  //state
  const [miState, setMiState] = useState({
    isShrink: false,
    isMinimize: false,
    isFullScreen: fullScreen,
    anchor: anchor,
  });

  const handleOnClose = (e: any) => {
    onClose && onClose(e);
  };

  let isMobile = false;

  return (
    <Dialog
      disablePortal={disablePortal}
      maxWidth={size}
      fullScreen={miState.isFullScreen || isMobile || miState.anchor === MIMODAL_ANCHOR_RIGHT}
      keepMounted
      onClose={handleOnClose}
      open={isOpen}
      sx={
        miState.isMinimize
          ? {
              width: 700,
              top: 'auto',
              left: 'auto',
              bottom: 0,
              transform: 'none',
              pointerEvents: 'all',
            }
          : {
              '& .MuiDialog-paper': {
                p: 0,
                overflowY: 'hidden',
                ...(isMobile
                  ? {
                      mx: 0,
                      width: '100%',
                      maxHeight: '100%',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }
                  : {}),
                ...(miState.anchor === MIMODAL_ANCHOR_RIGHT && {
                  mx: 0,
                  width: 'auto',
                  maxWidth: 1000,
                  minWidth: drawerWidth,
                  maxHeight: '100%',
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }),
              },
              '& .MuiDialog-container': {
                justifyContent: miState.anchor === MIMODAL_ANCHOR_RIGHT ? 'flex-end' : 'center',
              },
              top: 0,
              '.MuiBackdrop-root': { bgcolor: 'rgba(15,21,32,.5)' },
            }
      }
      hideBackdrop={miState.isMinimize}
    >
      <DialogTitle
        sx={{
          mx: 1,
          mt: 1,
          // bgcolor: miState.anchor === MIMODAL_ANCHOR_RIGHT ? 'primary.main' : theme.palette.header,
          height: headerHeight - 10,
        }}
      >
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
      </DialogTitle>
      {!miState.isMinimize && (
        <>
          <DialogContent
            onScroll={onScroll}
            sx={{ p: 0, bgcolor: theme.palette.background.paper }}
            className='dialog-content-print scroll-box'
            id='write-grapes'
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
          </DialogContent>
          <DialogActions
            sx={{
              p: 1,
              ml: 3,
              bgcolor: theme.palette.background.paper,
              justifyContent: 'flex-start',
            }}
          >
            <ModalFooter handleSave={handleOnClose} handleClose={handleOnClose} />
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default CreateProjectModal;
function styled(arg0: (props: StyledTabsProps) => import("react/jsx-runtime").JSX.Element) {
  throw new Error('Function not implemented.');
}

