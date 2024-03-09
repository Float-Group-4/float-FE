import { Edit, Delete } from "@mui/icons-material";
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { ProjectMileStone } from "../../models";

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
        <TextField
          sx={{ backgroundColor: 'white' }}
          fullWidth
          onChange={(e) => setCurrentName(e.target.value)}
          value={currentName}
        />
        <Box display='flex' justifyContent='space-between' alignContent='flex-start'>
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
              sx={{ backgroundColor: 'white', width: '80%' }}
              value={endDate}
              onChange={(date) => handleDateChange(date, false)}
            />
          </Box>
          <Button
            sx={{ width: '30%', height: '20%', alignSelf: 'flex-end' }}
            onClick={addNewMileStone}
            variant='contained'
          >
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

export default MilestoneSubBody;