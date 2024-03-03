import {
  MIMODAL_ANCHOR_CENTER,
  MIMODAL_ANCHOR_RIGHT,
  MiModalProps,
} from '@base/components/MiModal';
import {
  useTheme,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
  DialogContent,
  TextField,
  Box,
  Tabs,
  Tab,
  Popper,
  DialogActions,
  Select,
  Button,
  Paper,
  Stack,
  ClickAwayListener,
  ButtonGroup,
  MenuItem,
  ListSubheader,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { KeyboardEvent, useState } from 'react';
import { drawerWidth, headerHeight } from '@base/config/config';
import { ArrowDropDown, Close, Edit, Delete, MoreVert as More } from '@mui/icons-material';
import OptionMenu from './OptionsMenu';
import { ArrowDropDownIcon, MobileDatePicker } from '@mui/x-date-pickers';
import { BUDGET_VALUE, ProjectInfo, ProjectMileStone, ProjectTask, ProjectTeam } from '../models';

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
              width: 'auto',
              '&:hover': { backgroundColor: 'transparent', color: 'black' },
            }}
          />
          <Tab
            label='Team'
            {...a11yProps(1)}
            sx={{
              width: 'auto',
              '&:hover': { backgroundColor: 'transparent', color: 'black' },
            }}
          />
          <Tab
            label={`Milestones ${mileStone?.length ?? 0}`}
            {...a11yProps(2)}
            sx={{
              width: 'auto',
              '&:hover': { backgroundColor: 'transparent', color: 'black' },
            }}
          />
          <Tab
            label={`Task list ${task?.length ?? 0}`}
            {...a11yProps(3)}
            sx={{
              width: 'auto',
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

interface CustomTextFieldProps {
  placeHolder: string;
  showClearIcon: boolean;
  showDropdownIcon: boolean;
  name: string;
}

const CustomTextField = (props: CustomTextFieldProps) => {
  const { placeHolder, showClearIcon, showDropdownIcon } = props;

  const handleClose = () => {};

  const onInput = (e: any) => {
    setAnchor(e.target);
    setOpen(true);
  };

  const handleChange = (e: any) => {
    setCurrentText(e.target.value.trim());
  };

  const [isOpen, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [currentText, setCurrentText] = useState('');

  return (
    <Box>
      <TextField
        value={currentText}
        placeholder={placeHolder}
        onInput={(e) => onInput(e)}
        onChange={handleChange}
        sx={{ maxWidth: '90%', minWidth: '100%' }}
        InputProps={{
          endAdornment: (
            <Stack>
              {currentText.length > 0 && (
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
              )}
              {showDropdownIcon && (
                <IconButton onClick={handleClose}>
                  <ArrowDropDown />
                </IconButton>
              )}
            </Stack>
          ),
        }}
      />
      <Popper open={isOpen} anchorEl={anchor} placement='bottom-start'>
        <ClickAwayListener onClickAway={handleClose}>
          <Paper>
            <Button onClick={handleClose} value={`Add "${currentText}"`} />
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

interface InfoProp {
  info: ProjectInfo;
  setInfo: (info: ProjectInfo) => void;
}

const InfoSubBody: React.FC<InfoProp> = ({ info, setInfo }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>('');

  const handleButtonClick = (value: string) => {
    setInfo((prevInfo: ProjectInfo) => ({
      ...prevInfo,
      type: value as string,
    }));
  };

  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;
    setInfo((prevInfo: ProjectInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const addAsChip = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tempTags = [...tags];
      tempTags.push(currentTag);
      setTags(tempTags);
      setCurrentTag('');
    }
  };

  const removeChip = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  return (
    <Box paddingX={3}>
      <Box>
        <Typography>Client</Typography>
        <CustomTextField
          placeHolder='No client'
          showDropdownIcon={true}
          showClearIcon={false}
          name='client'
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography>Color</Typography>
        <IconButton
          sx={{ borderRadius: '80%', width: 22, height: 22, backgroundColor: info?.color }}
          disableFocusRipple
          disableTouchRipple
          disableRipple
        />
        <IconButton
          sx={{ width: 22, height: 22 }}
          disableFocusRipple
          disableTouchRipple
          disableRipple
        >
          <ArrowDropDownIcon />
        </IconButton>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography>Notes</Typography>
        <TextField
          maxRows={4}
          minRows={2}
          sx={{ width: '100%' }}
          multiline
          name='note'
          value={info?.note ?? ''}
          onChange={handleValueChange}
          InputProps={{
            sx: { pt: 1 },
          }}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography>Tags</Typography>
        <TextField sx={{ width: '100%' }} name='tags' />
      </Box>

      <Stack sx={{ mt: 2 }} spacing={2} direction='row'>
        <ButtonGroup>
          <Button
            variant='text'
            sx={{
              backgroundColor: info?.type == 'billable' ? '#82BEFF' : '#F6F6F6',
              color: 'black',
              border: 0,
              '&:hover': { backgroundColor: 'initial', color: 'inherit' },
            }}
            onClick={() => handleButtonClick('billable')}
            disableFocusRipple
            disableRipple
            disableTouchRipple
          >
            Billable
          </Button>
          <Button
            variant='text'
            sx={{
              backgroundColor: info?.type == 'non-billable' ? '#82BEFF' : '#F6F6F6',
              color: 'black',
              '&:hover': { backgroundColor: '-moz-initial', color: 'inherit' },
            }}
            onClick={() => handleButtonClick('non-billable')}
            disableFocusRipple
            disableRipple
            disableTouchRipple
          >
            Non-billable
          </Button>
        </ButtonGroup>
        <Button
          onClick={() => {
            setInfo((prevInfo: ProjectInfo) => ({
              ...prevInfo,
              isTentative: !prevInfo?.isTentative,
            }));
          }}
          sx={{
            backgroundColor: info?.isTentative ? '#82BEFF' : '#F6F6F6',
            color: 'black',
            '&:hover': { backgroundColor: '-moz-initial', color: 'inherit' },
          }}
        >
          Tentative
        </Button>
      </Stack>

      <Box sx={{ mt: 2, pb: 6 }}>
        <Typography>Budget</Typography>
        <Select
          onChange={(e) => {
            setInfo((prevInfo: ProjectInfo) => ({
              ...prevInfo,
              budget: parseInt(e.target.value, 0),
            }));
          }}
          value={info?.budget}
          sx={{ width: '80%' }}
        >
          {Object.entries(BUDGET_VALUE).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

interface TeamProp {
  team: ProjectTeam[] | null;
  setTeam: (team: ProjectTeam[] | null) => void;
}

const TeamSubBody: React.FC<TeamProp> = ({ team, setTeam }) => {
  const demoData = {
    it: [{ name: 'quan', email: 'quan@gmail.com' }],
    'No department': [{ name: 'nhat', email: 'nhat@gmail.com' }],
    hr: [{ name: 'bao', email: 'bao@gmail.com' }],
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const handleClose = () => {};

  const removeMember = (indexToRemove: number) => {
    setTeam((prevTeam: any[]) => {
      if (!prevTeam) return null;
      return prevTeam.filter((_: any, index: number) => index !== indexToRemove);
    });
  };

  const addToProject = (index: number, department: string) => {
    const newTeamMember = demoData[department][index];
    setTeam((prevTeam: any) => {
      if (!prevTeam) return [{ member: newTeamMember }];
      return [...prevTeam, { member: newTeamMember }];
    });
  };

  return (
    <Box paddingX={1}>
      <Box sx={{ backgroundColor: '#F6F6F6', px: 2, py: 2, borderRadius: '5%' }}>
        <Typography>Assign a team member</Typography>
        <TextField
          sx={{ width: '100%', backgroundColor: 'white' }}
          variant='outlined'
          onClick={(e) => {
            setIsOpen(true);
            setAnchor(e.currentTarget);
          }}
          onBlur={() => {
            setIsOpen(false);
          }}
        />
        <Popper
          open={isOpen}
          anchorEl={anchor}
          placement='bottom-start'
          sx={{ zIndex: 9999, width: '24%', maxWidth: 'ml' }}
        >
          <ClickAwayListener
            onClickAway={() => {
              console.log('click away');
              setAnchor(null);
            }}
          >
            <Paper>
              <ListItem sx={{ '&:hover': { backgroundColor: '#F6F6F6' }, cursor: 'pointer' }}>
                All team members
              </ListItem>
              <List>
                {Object.entries(demoData).map(([department, projectMembers]) => (
                  <React.Fragment key={department}>
                    <ListSubheader
                      sx={{ fontWeight: '500', display: 'flex', alignItems: 'center' }}
                    >
                      {department}
                      <Typography
                        variant='body2'
                        color='primary'
                        onClick={handleClose}
                        sx={{ cursor: 'pointer', ml: 'auto' }}
                      >
                        All
                      </Typography>
                    </ListSubheader>

                    {projectMembers?.map((projectMember, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          '&:hover': { backgroundColor: '#F6F6F6' },
                          cursor: 'pointer',
                          m: 0,
                          px: 1,
                        }}
                        onClick={() => addToProject(index, department)}
                      >
                        <ListItemText
                          primary={projectMember.name}
                          secondary={projectMember.email}
                        />
                      </ListItem>
                    ))}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </Box>
      <Box
        minHeight='60%'
        height='30vh'
        display='flex'
        alignContent='center'
        justifyContent='center'
      >
        {team?.length == 0 || team == null ? (
          <Typography variant='body1' alignSelf='center' color='GrayText'>
            There are no people assigned to this project.
          </Typography>
        ) : (
          <List>
            {team?.map((projectTeam: ProjectTeam, index: number) => (
              <ListItem key={index}>
                <ListItemText primary={projectTeam.member.name} />
                <IconButton onClick={() => removeMember(index)} sx={{ ml: 'auto' }}>
                  <Close />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Box paddingX={2}>
        <Typography>Project Owner</Typography>
        <TextField
          value='name'
          variant='outlined'
          sx={{ width: '100%' }}
          InputProps={{
            endAdornment: (
              <IconButton>
                <ArrowDropDownIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
      <Stack direction='row' alignContent='center' sx={{ mt: 2, px: 2, pb: 4 }}>
        <Checkbox
          checked={isSelected}
          sx={{ m: 0, p: 0 }}
          onClick={() => {
            const val = !isSelected;
            setIsSelected(val);
          }}
        />
        <Typography sx={{ ml: 2 }}>All Project Managers have edit rights</Typography>
      </Stack>
    </Box>
  );
};

interface MileStoneProp {
  mileStone: ProjectMileStone[] | null;
  setMileStone: (milestone: ProjectMileStone[] | null) => void;
}

const MilestoneSubBody: React.FC<MileStoneProp> = ({ mileStone, setMileStone }) => {
  const today = new Date();
  const [currentName, setCurrentName] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const handleDateChange = (date: any, isStart: boolean) => {
    try {
      if (!date || typeof date !== 'object' || !date.isValid()) {
        console.error('Invalid date:', date);
        return;
      }
      if (isStart) {
        setStartDate(date);
      } else {
        if (date.isBefore(startDate)) {
          setStartDate(date);
        }
        setEndDate(date);
      }
    } catch (error) {
      console.error('Error occurred while handling date change:', error);
    }
  };

  const addNewMileStone = () => {
    if (!currentName || currentName.trim() === '') return;
    else {
      setMileStone((prevMileStones: ProjectMileStone[] | null) => {
        const newMilestone: ProjectMileStone = {
          name: currentName.trim(),
          startDate: startDate.toDateString(),
          endDate: endDate.toDateString(),
        };

        if (prevMileStones == null) {
          return [newMilestone];
        } else {
          return [...prevMileStones, newMilestone];
        }
      });
    }
  };

  const handleEdit = (index: number) => {};

  const handleDelete = (index: number) => {
    setMileStone((prevMileStones: ProjectMileStone[] | null) => {
      if (prevMileStones == null) {
        return null;
      }

      const updatedMileStones = prevMileStones.filter((_, i) => i !== index);
      return updatedMileStones;
    });
  };

  return (
    <>
      <Box sx={{ backgroundColor: '#F6F6F6', p: 2, borderRadius: 3, m: 1 }}>
        <Typography>Milestone name</Typography>
        <TextField sx={{backgroundColor: 'white'}} fullWidth onChange={(e) => setCurrentName(e.target.value)} value={currentName} />
        <Box
          display='flex'
          justifyContent='space-between'
          alignContent='flex-start'
        >
          <Box sx={{ pt: 1 }}>
            <Typography>From</Typography>
            <DatePicker
              slotProps={{
                textField: {
                  variant: 'filled',
                  focused: true,
                },
              }}
              sx={{ backgroundColor: 'white', width: '80%' }}
              value={startDate}
              onChange={(date) => handleDateChange(date, true)}
            />
          </Box>
          <Box sx={{ pt: 1, m: 0 }}>
            <Typography>To</Typography>
            <DatePicker
              slotProps={{
                textField: {
                  variant: 'filled',
                  focused: true,
                },
              }}
              sx={{ backgroundColor: 'white',width: '80%' }}
              value={endDate}
              onChange={(date) => handleDateChange(date, false)}
            />
          </Box>
          <Button sx={{ width: '30%', height: '20%', alignSelf: 'flex-end' }} onClick={addNewMileStone} variant='contained'>
            Add milestone
          </Button>
        </Box>
      </Box>
      <Box minHeight='50vh' display='flex' alignContent='center'>
        {mileStone && mileStone.length === 0 ? (
          <Typography variant='body1' alignSelf='center'>
            There are no milestones for this project.
          </Typography>
        ) : (
          <List>
            {mileStone &&
              mileStone.map((ms, index) => (
                <ListItem key={index}>
                  <ListItemText primary={ms.name} secondary={`${ms.startDate} - ${ms.endDate}`} />
                  <IconButton onClick={() => handleEdit(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)}>
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}
          </List>
        )}
      </Box>
    </>
  );
};

interface TaskProp {
  tasks: ProjectTask[] | null;
  setTasks: (team: ProjectTask[] | null) => void;
}

const TaskListSubBody: React.FC<TaskProp> = ({ tasks, setTasks }) => {
  const [currentName, setCurrentName] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const [checkedTasks, setCheckedTasks] = useState<ProjectTask[]>([]);

  console.log(tasks);

  const processItems = [
    // {
    //   id: 1,
    //   name: 'milestone 1',
    //   isBillable: true,
    // },
  ];

  const options = [
    {
      label: 'Set as Non-billable',
      color: '#EAEAE8',
      action: () => setBillable(currentIndex),
    },
    {
      label: 'Delete',
      color: '#FFC9DD',
      action: () => handleDelete(currentIndex),
    },
  ];

  const addToProcessList = (taskId: number) => {
    setCheckedTasks((prevCheckedTasks: ProjectTask) => ({
      ...prevCheckedTasks,
      id: !prevCheckedTasks[taskId],
    }));
  };

  const addNewTask = () => {
    if (currentName == null || currentName.trim() === '') return;
    else {
      setTasks((prevTasks: any) => {
        if (prevTasks === null || prevTasks.length === 0) {
          return [
            {
              id: 1,
              name: currentName,
              isBillable: true,
            },
          ];
        } else {
          const lastId = prevTasks[prevTasks.length - 1].id;
          return [...prevTasks, { id: lastId + 1, name: currentName, isBillable: true }];
        }
      });
    }
  };

  const addOrRemoveAll = () => {
    if (checkedTasks.length > 0) {
      setCheckedTasks([]);
    }
  };

  const totalSelected = Object.values(checkedTasks).filter(Boolean).length;

  const setBillable = (index: number) => {
    if (tasks === null) return;
    if (index == null || index < 0 || index >= tasks.length) return;

    const updatedTasks = [...tasks];

    updatedTasks[index] = {
      ...updatedTasks[index],
      isBillable: true,
    };

    setTasks(updatedTasks);
  };

  const handleDelete = (index: number | undefined) => {
    // if (index == null) return;
    // demoDataForTasks.slice(index, 1);
  };

  return (
    <>
      <Box sx={{ backgroundColor: '#F6F6F6', m: 1, p: 2, borderRadius: '5%' }}>
        <Typography sx={{ pb: 1 }}>Add a task name</Typography>
        <Box display='flex' justifyContent='space-between'>
          <TextField sx={{ backgroundColor: 'white', width: 'calc(90% - 60px)' }} />
          <Button variant='contained' onClick={addNewTask} sx={{ whiteSpace: 'nowrap' }}>
            Add task
          </Button>
        </Box>

        <Stack direction='row' sx={{ pt: 1 }}>
          <Checkbox sx={{ m: 0, p: 0, borderRadius: 2 }} />
          <Typography sx={{ ml: 1 }}>Only Project Managers can add to this list</Typography>
        </Stack>
      </Box>
      <Box height='50vh'>
        {tasks?.length === 0 || tasks == null ? (
          <Box display='flex' alignItems='center' justifyContent='center'>
            {/* <ListItemText primary='Project has no tasks' secondary=' You can still allocate this project on the schedule, however you won’t be able to
              assign specific tasks.'>

             </ListItemText> */}
          </Box>
        ) : (
          <>
            {checkedTasks != null && checkedTasks.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox onChange={addOrRemoveAll} />
                <Typography>{processItems.length} selected</Typography>
                <ButtonGroup sx={{ ml: 'auto' }}>
                  <Button variant='contained' sx={{ backgroundColor: '#F6F6F6' }}>
                    Merge
                  </Button>
                  <Button variant='contained' sx={{ backgroundColor: '#F6F6F6' }}>
                    Delete
                  </Button>
                </ButtonGroup>
              </div>
            )}

            <List sx={{ m: 0, px: 2, pt: 1 }}>
              {tasks &&
                tasks.map((task, index: number) => {
                  console.log(task);
                  return (
                    <ListItem key={task.id}>
                      <Checkbox
                        sx={{ p: 0, my: 0, mr: 1, ml: 0 }}
                        onChange={() => addToProcessList(task.id)}
                        checked={checkedTasks[task.id] != null ?? false}
                      />
                      <ListItemText primary={task.name} />
                      <OptionMenu
                        actionIcon={<More sx={{ height: 20, width: 20 }} />}
                        options={options}
                        onClick={() => setCurrentIndex(index)}
                      />
                    </ListItem>
                  );
                })}
            </List>
          </>
        )}
      </Box>
    </>
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
  const [InfoData, setInfoData] = useState<ProjectInfo>(defaultProjectInfo);
  const [TeamData, setTeamData] = useState<ProjectTeam[] | null>(null);
  const [MileStoneData, setMileStoneData] = useState<ProjectMileStone[] | null>(null);
  const [TaskData, setTaskData] = useState<ProjectTask[] | null>(demoForTasks);

  const {
    title = '',
    isOpen,
    size,
    fullScreen = false,
    children,
    footer,
    onClose,
    onScroll,
    anchor = MIMODAL_ANCHOR_CENTER,
    isCloseByBackdrop = false,
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
              info={InfoData}
              team={TeamData}
              mileStone={MileStoneData}
              task={TaskData}
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
