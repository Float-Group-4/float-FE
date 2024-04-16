import { MoreVert } from '@mui/icons-material';
import {
  Box,
  Typography,
  TextField,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import React, { useState } from 'react';
import { ProjectTask } from '../models';
import OptionMenu from './OptionsMenu';

import Checkbox from '@base/components/CheckBox';

interface TaskProp {
  tasks: ProjectTask[] | null;
  setTasks: (team: any | null) => void;
}

const TaskListSubBody: React.FC<TaskProp> = ({ tasks, setTasks }) => {
  const [currentName, setCurrentName] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [checkedTasks, setCheckedTasks] = useState<ProjectTask[]>([]);
  const [isManagerOnly, setIsManagerOnly] = useState(false);

  const setBillable = (index: number) => {
    if (tasks === null) return;
    if (index == null || index < 0 || index >= tasks.length) return;

    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      isBillable: !updatedTasks[index].isBillable,
    };

    setTasks(updatedTasks);
  };

  const handleSingleDelete = (index: number) => {
    if (tasks === null || index == null || index < 0 || index >= tasks.length) return;

    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);

    setTasks(updatedTasks);
  };

  const handleMultipleDelete = () => {
    setTasks((prevTasks: any[]) => {
      if (!prevTasks) return null;
      const filteredTasks = prevTasks.filter((task: ProjectTask) => !checkedTasks.includes(task));
      setCheckedTasks([]);
      return filteredTasks;
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
    if (!tasks) return;

    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return;

    const task = tasks[taskIndex];
    const isChecked = checkedTasks.some((t) => t.id === taskId);

    if (isChecked) {
      setCheckedTasks((prevCheckedTasks) => prevCheckedTasks.filter((t) => t.id !== taskId));
    } else {
      setCheckedTasks((prevCheckedTasks) => [...prevCheckedTasks, task]);
    }
  };

  const addNewTask = () => {
    if (!currentName.trim()) return;

    const newTask: ProjectTask = {
      id: tasks && tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      name: currentName,
      isBillable: true,
    };

    setTasks((prevTasks: any) => (prevTasks ? [...prevTasks, newTask] : [newTask]));
    setCurrentName('');
  };

  const addOrRemoveAll = () => {
    if (checkedTasks.length > 0) {
      setCheckedTasks([]);
    }
  };

  return (
    <>
      <Box sx={{ backgroundColor: '#F6F6F6', m: 1, p: 2, borderRadius: '5%' }}>
        <Typography sx={{ pb: 1 }}>Add a task name</Typography>
        <Box display='flex' justifyContent='space-between'>
          <TextField
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            sx={{ backgroundColor: 'white', width: 'calc(90% - 70px)' }}
          />
          <Button variant='contained' onClick={addNewTask} sx={{ whiteSpace: 'nowrap' }}>
            Add task
          </Button>
        </Box>

        <ListItem sx={{ p: 0, mt: 1 }}>
          <Checkbox
            sx={{ m: 0, p: 0 }}
            value={isManagerOnly}
            onChange={() => setIsManagerOnly(!isManagerOnly)}
          />
          <ListItemText>Only Project Managers can add to this list</ListItemText>
        </ListItem>
      </Box>

      <Box height='30vh'>
        {tasks?.length == 0 || tasks == null ? (
          <Box display='flex' alignItems='center' justifyContent='center'>
            <ListItemText
              sx={{ paddingX: 10, paddingY: 5 }}
              primary={
                <Typography align='center' fontSize={20} fontWeight={450}>
                  Project has no tasks
                </Typography>
              }
              secondary={
                <Typography paddingX={10} align='center'>
                  You can still allocate this project on the schedule, however you won’t be able to
                  assign specific tasks.
                </Typography>
              }
            />
          </Box>
        ) : (
          <>
            {checkedTasks.length > 0 ? (
              <Box display='flex' alignItems='center' paddingRight={3}>
                <ListItem>
                  <Checkbox
                    value={checkedTasks.length > 0}
                    onChange={addOrRemoveAll}
                    sx={{ m: 0, p: 0 }}
                  />
                  <ListItemText>{checkedTasks.length} selected</ListItemText>
                </ListItem>

                <ButtonGroup sx={{ ml: 'auto' }}>
                  <Button
                    disableElevation
                    variant='contained'
                    sx={{
                      backgroundColor: '#F6F6F6 !important',
                      mx: 1,
                      color: 'black',
                      '&:hover': { bgcolor: '#E1E5F3 !important', color: 'black !important' },
                    }}
                  >
                    Merge
                  </Button>
                  <Button
                    disableElevation
                    variant='contained'
                    sx={{
                      backgroundColor: '#F6F6F6 !important',
                      color: 'black',
                      '&:hover': { bgcolor: '#E1E5F3 !important', color: 'black !important' },
                    }}
                    onClick={handleMultipleDelete}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </Box>
            ) : (
              <Box display='flex' alignItems='center' paddingRight={3} paddingBottom={4}>
                <ListItem>
                  <ListItemText></ListItemText>
                </ListItem>
                <ButtonGroup></ButtonGroup>
              </Box>
            )}

            <List sx={{ m: 0, px: 2, pt: 1 }}>
              {tasks.map((task, index) => (
                <ListItem key={task.id}>
                  <Checkbox
                    value={checkedTasks.some((t) => t.id === task.id)}
                    sx={{ p: 0, my: 0, mr: 1, ml: 0 }}
                    onChange={() => addToProcessList(task.id)}
                  />
                  <ListItemText primary={task.name} />
                  {!task.isBillable && <Chip label='non-billable' variant='outlined' />}
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
