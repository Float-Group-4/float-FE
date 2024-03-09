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

interface StepTwoProps {
  projectName: string;
  setProjectName: (projectName: string) => void;
}
const StepTwo: React.FC<StepTwoProps> = ({ projectName, setProjectName }) => {
  return (
    <div>
      <Typography variant='h4' gutterBottom sx={{ marginLeft: '10px', marginTop: '10%' }}>
        Add your first project
      </Typography>
      <Typography variant='body1' gutterBottom sx={{ marginLeft: '10px', marginBottom: '6%' }}>
        Use this project to learn how Float works. You can add more details later.{' '}
      </Typography>
      <Typography sx={{ marginLeft: '10px' }} variant='body2'>
        Project Name
      </Typography>
      <TextField
        sx={{ marginLeft: '10px', marginBottom: '8%', width: '85%' }}
        onChange={(v) => {
          setProjectName(v.target.value);
          localStorage.setItem('projectName', projectName);
        }}
        placeholder='E.g., Razor Project'
        fullWidth
        inputProps={{ maxLength: 60 }}
        value={projectName}
      />
    </div>
  );
};

export default StepTwo;
