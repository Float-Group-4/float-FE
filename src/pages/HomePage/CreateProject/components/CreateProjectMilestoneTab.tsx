import { Edit, Delete } from '@mui/icons-material';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  FormControl,
} from '@mui/material';
import { useState } from 'react';
import { ProjectMileStone } from '../models';
import React from 'react';
import DatePicker from '@base/components/DatePicker';
import { Stack } from '@mui/system';

interface MileStoneProp {
  mileStone: ProjectMileStone[] | null;
  setMileStone: (milestone: any | null) => void;
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
        <TextField
          sx={{ backgroundColor: 'white' }}
          fullWidth
          onChange={(e) => setCurrentName(e.target.value)}
          value={currentName}
        />
        <Stack direction='row' paddingY={2} alignItems='end'>
          <FormControl >
            <Typography>From</Typography>
            <DatePicker
              inputSx={{ backgroundColor: 'white', width: '90%' }}
              value={startDate}
              onChange={(date) => handleDateChange(date, true)}
            />
          </FormControl>
          <FormControl>
            <Typography>To</Typography>
            <DatePicker
              inputSx={{ backgroundColor: 'white', width: '90%' }}
              value={startDate}
              onChange={(date) => handleDateChange(date, true)}
            />
          </FormControl>

          <Button onClick={addNewMileStone} variant='contained' size='medium' sx={{whiteSpace: 'nowrap'}}>
            Add milestone
          </Button>
        </Stack>
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
      </Box>
    </>
  );
};

export default MilestoneSubBody;
