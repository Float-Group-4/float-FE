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

interface CreateTeamModalProp {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateTeamModal: React.FC<CreateTeamModalProp> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const [isStepperOpen, setIsStepperOpen] = useState(false);
  const openTeamSetupModal = (e: React.MouseEvent<HTMLElement>) => {
    localStorage.setItem('teamName', teamName);
    setIsOpen(false);
    navigate('team-setup');
  };

  const [teamName, setTeamName] = useState(localStorage.getItem('teamName') ?? '');

  const handleClose: DialogProps['onClose'] = (event, reason) => {
    // if (reason && reason === "backdropClick && "escapeKeyDown"")
    //     return;
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} maxWidth='xl' onClose={handleClose}>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
        <div>
          <Typography variant='h3' sx={{ p: 3 }}>
            Pick a name for your team
          </Typography>
        </div>
        <div>
          <Typography variant='h5' sx={{ fontWeight: 300, pb: 3 }}>
            You can always change it later in team settings
          </Typography>
        </div>
        <Typography variant='body1'>Team name</Typography>
        <TextField
          onChange={(v) => setTeamName(v.target.value)}
          placeholder='E.g., Razor Angency'
          fullWidth
          value={teamName}
        />
      </DialogContent>
      <DialogActions>
        <Button variant='contained' fullWidth onClick={openTeamSetupModal}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

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
        sx={{ marginLeft: '10px', marginBottom: '8%', width: "85%"}}
        
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

interface StepThreeProps {
  members: string[];
  setMembers: (members: string[]) => void;
  check1: number;
  setCheck1: (check1: number) => void;
  setLastCheck: (check1: number) => void;
  
}
const StepThree: React.FC<StepThreeProps> = ({ members, setMembers, check1, setCheck1, setLastCheck }) => {
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

export const TeamSetup = () => {
  const steps = ['Sign Up', 'Add Project', 'Add People'];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0 && activeStep <= 2)
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isStepFinished = (step: any) => {
    //Todo
    return activeStep <= 2;
  };

  const handleFinish = () => {
    console.log(`projectName: ${localStorage.getItem('projectName')}`);
    console.log(`teamName: ${localStorage.getItem('teamName')}`);
    console.log(`teamSize: ${localStorage.getItem('teamSize')}`);
    console.log(`teamExperience: ${localStorage.getItem('teamExperience')}`);
    console.log(`teamMembers: ${localStorage.getItem('teamMembers')}`);
    setActiveStep(4);

  };

  const [projectName, setProjectName] = useState(localStorage.getItem('projectName') ?? '');
  // const [members, setMembers] = useState<string[]>(
  //   JSON.parse(localStorage.getItem('teamMembers') ?? JSON.stringify("{['', '', '']}"))
  // );
  const [members, setMembers] = useState<string[]>(["", "", ""]);
  const [check1, setCheck1] = useState(0);
  const [lastCheck, setLastCheck] = useState(check1);

  const getCurrentStepPage = () => {
    switch (activeStep) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo projectName={projectName} setProjectName={setProjectName} />;
      case 2:
        return <StepThree members={members} setMembers={setMembers} check1={check1} setCheck1={setCheck1} setLastCheck={setLastCheck}/>;
      default:
        return <StepOne />;
    }
  };

  return (
    <div>
      {activeStep <= 2 ? 
      (<Grid container direction={'row'} justifyContent={'space-between'} sx={{ marginTop: '3%' }}>
        <Grid item xs={12} lg={5}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box>
            {getCurrentStepPage()}
            {activeStep === steps.length ? (
              <div>
                <Button onClick={handleFinish}>Finish</Button>
              </div>
            ) : (
              <div>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    pt: 2,
                    mt: activeStep == 1 ? '18%' : '0',
                    position: 'sticky',
                  }}
                >
                  <Button
                    color='inherit'
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                </Box>
                <Button
                  variant='contained'
                  onClick={handleNext}
                  disabled={!isStepFinished(activeStep)}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            )}
          </Box>
        </Grid>
        <Grid
          item
          container
          md={0}
          lg={4}
          direction={'column'}
          alignSelf={'right'}
          display={'flex'}
          sx={{ marginRight: '15%' }}
        >
          {/* {activeStep == 0 ? (<Typography variant='h6' sx={{ marginBottom: '6%' }} alignSelf={'center'}>
            Welcome to Float team: {localStorage.getItem('teamName')}
          </Typography>
          ) : (
            <div>
              <Typography variant='h6' alignSelf={'left'}>
          Project Name: {projectName}
        </Typography>
        <Typography color={"grey"} sx={{ marginBottom: '6%' }} alignSelf={'left'}>
          Tasks
        </Typography>
            </div>
          
        )} */}
          {activeStep == 1 && (
            <Box ml={'5%'} width={{xs: "0", lg: "auto"}} position='fixed' zIndex={-2} mt={"-3%"}>
              <img
                height={'50%'}
                width={'100%'}
                src='/src/base/assets/imgs/create-team-2.png'
                alt='create-team-2'
              ></img>
            </Box>
          )}
         

          {activeStep == 0 ? (
            <Stack>
              <Typography variant='h6' sx={{ marginBottom: '6%' }} alignSelf={'center'}>
                Welcome to Float team: {localStorage.getItem('teamName')}
              </Typography>
              <img
                height={'80%'}
                width={'100%'}
                src='/src/base/assets/imgs/create-team-1.png'
                alt='create-team-1'
              ></img>
            </Stack>
          ) : activeStep == 1 ? (
            <Card elevation={8} sx={{ padding: '5%', mt: '20%'}}>
              <div>
                <div
                  style={{
                    textWrap: 'pretty',
                    textOverflow: 'ellipsis',
                    overflow: 'scroll',
                    width: '38rem',
                  }}
                >
                  <Typography variant='h6' alignSelf={'left'}>
                    Project Name: {projectName}
                  </Typography>
                </div>
                <Typography color={'grey'} sx={{ marginBottom: '6%' }} alignSelf={'left'}>
                  Tasks
                </Typography>
              </div>
              <Box sx={{ mt: '0%' }}  width={{xs: "0", lg: "auto"}} >
                <Skeleton variant='text' sx={{ fontSize: '1rem', width: '600px', my: '1%' }} />
                <Skeleton
                  variant='text'
                  animation='wave'
                  sx={{ fontSize: '1rem', width: '600px', my: '1%' }}
                />
                <Skeleton variant='text' sx={{ fontSize: '1rem', width: '600px', my: '1%' }} />
                <Skeleton
                  variant='text'
                  animation='wave'
                  sx={{ fontSize: '1rem', width: '600px', my: '1%' }}
                />
                <Skeleton variant='text' sx={{ fontSize: '1rem', width: '600px', my: '1%' }} />
                <Skeleton
                  variant='text'
                  animation='wave'
                  sx={{ fontSize: '1rem', width: '600px', my: '1%' }}
                />
                <Skeleton variant='text' sx={{ fontSize: '1rem', width: '600px', my: '1%' }} />
                <Skeleton
                  variant='text'
                  animation='wave'
                  sx={{ fontSize: '1rem', width: '600px', my: '1%' }}
                />
                <Skeleton variant='text' sx={{ fontSize: '1rem', width: '600px', my: '1%' }} />
                <Skeleton
                  variant='text'
                  animation='wave'
                  sx={{ fontSize: '1rem', width: '600px', my: '1%' }}
                />
              </Box>
            </Card>
          ) : (
            <Box position='sticky' zIndex={-3} ml={"18%"} mt={"-35%"} width={{xs: "0", lg: "auto"}}>
              <img
                height={'4000%'}
                width={'100%'}
                src='/src/base/assets/imgs/create-team-3-1.svg'
                alt='create-team-3-1'
                
              ></img>
                <img
                style={{ position: 'absolute', top: 323, left: -68 }}
                height={"562%"}
                src={`/src/base/assets/imgs/create-team-${(lastCheck > check1  && lastCheck == 1) ? "check2.gif" : (check1 == 1 && lastCheck < 1) ? "check1.gif" : check1 < 1 ? "null" : "3-2.png"}`}
                alt=''
              ></img>
              <img
                style={{ position: 'absolute', top: 252, left: 104 }}
                height={"560%"}
                src={`/src/base/assets/imgs/create-team-${(lastCheck > check1  && lastCheck == 2) ? "check2.gif" : (check1 == 2 && lastCheck < 2) ? "check1.gif" : check1 < 2 ? "null" : "3-2.png"}`}
                alt=''
              ></img>
              <img
                style={{ position: 'absolute', top: 451, left: 102 }}
                height={"560%"}
                src={`/src/base/assets/imgs/create-team-${(lastCheck > check1 && lastCheck == 3) ? "check2.gif" : (check1 == 3 && lastCheck < 3) ? "check1.gif" : check1 < 3 ? "null" : "3-2.png"}`}
                alt=''
              ></img>
              
              
            </Box>
          )}
           {activeStep == 1 && (
            <Box mt={'-150px'} position='sticky' zIndex={-1}>
              <img
                height={'1000%'}
                width={'100%'}
                src='/src/base/assets/imgs/create-team-2-1.svg'
                alt='create-team-2-1'
              ></img>
            </Box>
          )}
        </Grid>
      </Grid>) : 
      (
        <img
        height={'100%'}
        width={'100%'}
        src='/src/base/assets/imgs/create-team-4.png'
        alt='create-team-4'
      ></img>
      )}
    </div>
  );
};

export default CreateTeamModal;
