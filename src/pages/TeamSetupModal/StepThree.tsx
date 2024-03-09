import {
  Box,
  Card,
  DialogProps,
  Grid,
  ListItemText,
  Skeleton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from '@mui/material';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
  DialogContent,
} from '@mui/material';
import { Fragment, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fontWeight } from '@mui/system';
import { Add, AddIcCallOutlined } from '@mui/icons-material';
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';

interface StepThreeProps {
  members: string[];
  setMembers: (members: string[]) => void;
  check1: number;
  setCheck1: (check1: number) => void;
  setLastCheck: (check1: number) => void;
}
const StepThree: React.FC<StepThreeProps> = ({
  members,
  setMembers,
  check1,
  setCheck1,
  setLastCheck,
}) => {
  console.log(members);

  return (
    <div>
      <Typography variant='h4' gutterBottom sx={{ marginLeft: '10px', marginTop: '10%' }}>
        Add your team
      </Typography>
      <Typography variant='body1' gutterBottom sx={{ marginLeft: '10px', marginBottom: '2%' }}>
        Include anyone you'd like to schedule. You can invate them to log in later.
      </Typography>
      <Typography sx={{ marginLeft: '10px', marginBottom: '2%' }} variant='body2'>
        Teammates
      </Typography>
      <List style={{ height: '230px', overflow: 'scroll' }}>
        {members.map((name, index) => (
          <TextField
            key={index}
            sx={{ marginLeft: '10px', marginBottom: '1%', width: '98%' }}
            onChange={(v) => {
              members[index] = v.target.value;
              setLastCheck(check1);
              if (members[index].length > 0) setCheck1(Math.min(check1 + 1, 3));
              else setCheck1(Math.max(0, check1 - 1));
              localStorage.setItem('teamMembers', JSON.stringify(members));
              console.log(members);
            }}
            placeholder='E.g., Razor'
            fullWidth
            inputProps={{ maxLength: 60 }}
            defaultValue={members[index]}
          ></TextField>
        ))}

        <Button
          startIcon={<Add />}
          color='primary'
          variant='text'
          sx={{ mr: 1, bgcolor: 'white', justifyContent: 'flex-start', ml: '1%' }}
          onClick={() => {
            setMembers([...members, '']);
          }}
        >
          Add another
        </Button>
      </List>
    </div>
  );
};

export default StepThree;
