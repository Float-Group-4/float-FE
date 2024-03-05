import { MoreVert } from '@mui/icons-material';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Checkbox,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import { ProjectTask } from '../../models';
import OptionMenu from '../OptionsMenu';

interface TaskProp {
  tasks: ProjectTask[] | null;
  setTasks: (team: ProjectTask[] | null) => void;
}

const TaskListSubBody: React.FC<TaskProp> = ({ tasks, setTasks }) => {
  const [currentName, setCurrentName] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [checkedTasks, setCheckedTasks] = useState<{ [key: number]: ProjectTask }>({});

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

  const handleSingleDelete = (index: number) => {
    setTasks((prevTasks: ProjectTask[]) => {
      const updatedCheckedTasks = [...prevTasks];
      updatedCheckedTasks.splice(index, 1);
      return updatedCheckedTasks;
    });
  };

  const handleMultipleDelete = () => {
    setTasks((prevTasks: ProjectTask[]) => {
      const tempCheckedTasks = [...checkedTasks];
      const tempTasks = [...prevTasks];

      const filterList = tempTasks.filter(item => !tempCheckedTasks.includes(item));

      setCheckedTasks({});

      return filterList;
    });
  };

  const options = [
    {
      label: 'Set as Non-billable',
      color: '#EAEAE8',
      action: () => setBillable(currentIndex),
    },
    {
      label: 'Delete',
      color: '#FFC9DD',
      action: () => handleSingleDelete(currentIndex),
    },
  ];

  const addToProcessList = (taskId: number) => {
    setCheckedTasks(prevCheckedTasks => {
      const taskExists = !!prevCheckedTasks[taskId];
      const updatedCheckedTasks = { ...prevCheckedTasks };

      if (taskExists) {
        delete updatedCheckedTasks[taskId];
      } else {
        updatedCheckedTasks[taskId] = {
          id: taskId,
          name: currentName,
          isBillable: true,
        };
        setCurrentName('');
      }

      return updatedCheckedTasks;
    });
  };

  const addNewTask = () => {
    if (!currentName.trim()) return;

    setTasks(prevTasks => {
      const newTask: ProjectTask = {
        id: prevTasks && prevTasks.length > 0 ? prevTasks[prevTasks.length - 1].id + 1 : 1,
        name: currentName,
        isBillable: true,
      };

      return prevTasks ? [...prevTasks, newTask] : [newTask];
    });
  };

  const addOrRemoveAll = () => {
    if (Object.keys(checkedTasks).length > 0) {
      setCheckedTasks([]);
    }
  };

  const totalSelected = Object.values(checkedTasks).length;

  return (
    <>
      <Box sx={{ backgroundColor: '#F6F6F6', m: 1, p: 2, borderRadius: '5%' }}>
        <Typography sx={{ pb: 1 }}>Add a task name</Typography>
        <Box display='flex' justifyContent='space-between'>
          <TextField
            value={currentName}
            onChange={e => setCurrentName(e.target.value)}
            sx={{ backgroundColor: 'white', width: 'calc(90% - 60px)' }}
          />
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
            <ListItemText
              primary='Project has no tasks'
              secondary=' You can still allocate this project on the schedule, however you won’t be able to
                assign specific tasks.'
            ></ListItemText>
          </Box>
        ) : (
          <>
            {totalSelected > 0 && (
              <Box display='flex' alignItems='center'>
                <Checkbox onChange={addOrRemoveAll} />
                <Typography>{totalSelected} selected</Typography>
                <ButtonGroup sx={{ ml: 'auto' }}>
                  <Button variant='contained' sx={{ backgroundColor: '#F6F6F6' }}>
                    Merge
                  </Button>
                  <Button variant='contained' sx={{ backgroundColor: '#F6F6F6' }} onClick={handleMultipleDelete}>
                    Delete
                  </Button>
                </ButtonGroup>
              </Box>
            )}

            <List sx={{ m: 0, px: 2, pt: 1 }}>
              {tasks.map((task, index) => (
                <ListItem key={task.id}>
                  <Checkbox
                    sx={{ p: 0, my: 0, mr: 1, ml: 0 }}
                    onChange={() => addToProcessList(task.id)}
                    checked={!!checkedTasks[task.id]}
                  />
                  <ListItemText primary={task.name} />
                  {!task.isBillable && <Chip label="non-billable" variant="outlined" />}
                  <OptionMenu
                    actionIcon={<MoreVert sx={{ height: 20, width: 20 }} />}
                    options={options}
                    onClick={() => setCurrentIndex(index)}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </>
  );
};

export default TaskListSubBody;