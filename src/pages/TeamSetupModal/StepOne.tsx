import { List, ListItem, ListItemText, Radio, RadioGroup } from '@mui/material';
import { Typography } from '@mui/material';
import { Fragment, SetStateAction, useState } from 'react';

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
      <RadioGroup defaultValue={teamSizeOptions[0]} value={teamSizeBorder} onChange={handleChange1}>
        <List  
          sx={{
            display: 'flex',
            flexDirection: 'row',
            minWidth: 240,
            '--List-gap': '0.5rem',
            '--ListItem-paddingY': '1rem',
            '--ListItem-radius': '8px',
            '--ListItemDecorator-size': '32px',
          }}
        >
          {teamSizeOptions.map((option, index) => (
            <ListItem
              key={option}
              onClick={() => {
                localStorage.setItem('teamSize', index.toString());
                setTeamSizeBorder(index);
              }}
              sx={{
                boxShadow: 'sm',
                bgcolor: teamSizeBorder === index ? '#D7DAE7;' : '#f1f3f9;',
                mr: '5px',
                my: '35px',
                borderRadius: '8px',
                border: teamSizeBorder === index ? '2px solid' : 'none',
                borderColor: '#2e5fe8',
                padding: '4px 16px 4px 18px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <ListItemText
                primary={option}
                primaryTypographyProps={{ sx: { fontWeight: '500' } }}
              />
              <Radio
                onFocus={() => {
                  localStorage.setItem('teamSize', index.toString());
                  setTeamSizeBorder(index);
                }}
                checked={teamSizeBorder === index}
                value={option}
              />
            </ListItem>
          ))}
        </List>
      </RadioGroup>
      <Typography variant='body1' gutterBottom sx={{ marginLeft: '10px' }}>
        What best describes you? We'll point you in the right direction?
      </Typography>
      <RadioGroup
        defaultValue={userTypeOptions[0].primary}
        value={teamExperience}
        onChange={handleChange2}
      >
        <List
          sx={{
            minWidth: 240,
            display: 'flex',
            flexDirection: 'row',
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
                bgcolor: teamExperience === index ? '#D7DAE7;' : '#f1f3f9;',
                mr: '5px',
                my: '35px',
                borderRadius: '8px',
                border: teamExperience === index ? '2px solid' : 'none',
                borderColor: '#2e5fe8',
                padding: '4px 16px 4px 18px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <ListItemText
                primary={option.primary}
                primaryTypographyProps={{ sx: { fontWeight: '500' } }}
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component='span'
                    variant='body2'
                    color='grey'
                    fontSize='80%'
                  >
                    {option.secondary}
                  </Typography>
                }
              />
              <Radio
                onFocus={() => setTeamExperience(index)}
                checked={teamExperience === index}
                value={option.primary}
              />
            </ListItem>
          ))}
        </List>
      </RadioGroup>
    </div>
  );
};

export default StepOne;
