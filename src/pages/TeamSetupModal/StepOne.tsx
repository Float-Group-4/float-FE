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

const StepOne = () => {
  const [intendedTeamSize, setIntendedTeamSize] = useState('');
  const [userType, setUserType] = useState('');

  const teamSizeOptions = ['1-9', '10-24', '24-49', '50+'];

  const userTypeOptions = [
    { primary: 'New to Float', secondary: 'Guide my setup' },
    { primary: 'Need an expert', secondary: 'A team member will email you' },
    {
      primary: 'Already use Float',
      secondary: "I know what i'm doing",
    },
  ];

  const handleChange1 = (event: { target: { value: SetStateAction<string> } }) => {
    setIntendedTeamSize(event.target.value);
  };

  const handleChange2 = (event: { target: { value: SetStateAction<string> } }) => {
    setUserType(event.target.value);
  };

  const [teamSizeBorder, setTeamSizeBorder] = useState(
    parseInt(localStorage.getItem('teamSize') ?? '-1'),
  );
  const [teamExperience, setTeamExperience] = useState(
    parseInt(localStorage.getItem('teamExperience') ?? '-1'),
  );

  return (
    <div>
      <Typography variant='h4' gutterBottom sx={{ marginLeft: '10px', marginTop: '10%' }}>
        Help us understand your needs
      </Typography>
      <Typography variant='body1' gutterBottom sx={{ marginLeft: '10px' }}>
        How many people are you scheduling?
      </Typography>
      <RadioGroup
        defaultValue={intendedTeamSize[0]}
        value={intendedTeamSize}
        onChange={handleChange1}
      >
        <List
          orientation='horizontal'
          sx={{
            minWidth: 240,
            '--List-gap': '0.5rem',
            '--ListItem-paddingY': '1rem',
            '--ListItem-radius': '8px',
            '--ListItemDecorator-size': '32px',
          }}
        >
          {teamSizeOptions.map((option, index) => (
            <ListItem
              onClick={() => {
                localStorage.setItem('teamSize', index.toString());
                setTeamSizeBorder(index);
              }}
              key={option}
              sx={{
                boxShadow: 'sm',
                bgcolor: teamSizeBorder == index ? '#D7DAE7;' : '#f1f3f9;',
                mr: '5px',
                my: '35px',
                borderRadius: '8px',
                border: teamSizeBorder == index ? '2px solid' : 'none',
                borderColor: '#2e5fe8',
                padding: '4px 16px 4px 18px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <ListItemText
                primary={option}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: '500',
                  },
                }}
              ></ListItemText>
              <Radio
                checked={teamSizeBorder == index}
                value={option}
                onFocus={() => {
                  localStorage.setItem('teamSize', index.toString());
                  setTeamSizeBorder(index);
                }}
                sx={{ flexDirection: 'row-reverse' }}
                slotProps={{
                  action: ({ checked }) => ({
                    sx: (theme) => ({
                      ...(checked && {
                        inset: -1,
                        border: '2px solid',
                        borderColor: theme.vars.palette.primary[500],
                      }),
                    }),
                  }),
                }}
              />
            </ListItem>
          ))}
        </List>
      </RadioGroup>
      <Typography variant='body1' gutterBottom sx={{ marginLeft: '10px' }}>
        What best describes you? We'll point you in the right direction?
      </Typography>
      <RadioGroup defaultValue={userType[0]} value={userType} onChange={handleChange2}>
        <List
          orientation='horizontal'
          sx={{
            minWidth: 240,
            '--List-gap': '0.5rem',
            '--ListItem-paddingY': '1rem',
            '--ListItem-radius': '8px',
            '--ListItemDecorator-size': '32px',
          }}
        >
          {userTypeOptions.map((option, index) => (
            <ListItem
              key={option.primary}
              onClick={() => {
                localStorage.setItem('teamExperience', index.toString());

                setTeamExperience(index);
              }}
              sx={{
                boxShadow: 'sm',
                bgcolor: teamExperience == index ? '#D7DAE7;' : '#f1f3f9;',
                mr: '5px',
                my: '35px',
                borderRadius: '8px',
                border: teamExperience == index ? '2px solid' : 'none',
                borderColor: '#2e5fe8',
                padding: '4px 16px 4px 18px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <ListItemText
                primary={option.primary}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: '500',
                  },
                }}
                secondary={
                  <Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                      color='grey'
                      fontSize='80%'
                    >
                      {option.secondary}
                    </Typography>
                  </Fragment>
                }
              />
              <Radio
                onFocus={() => setTeamExperience(index)}
                checked={teamExperience == index}
                value={option.primary}
                sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                slotProps={{
                  action: ({ checked }) => ({
                    sx: (theme) => ({
                      ...(checked && {
                        inset: -1,
                        border: '2px solid',
                        borderColor: theme.vars.palette.primary[500],
                      }),
                    }),
                  }),
                }}
              />
            </ListItem>
          ))}
        </List>
      </RadioGroup>
    </div>
  );
};

export default StepOne;
