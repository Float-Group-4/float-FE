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
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const TeamSetup = () => {
  const steps = ['Sign Up', 'Add Project', 'Add People'];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0 && activeStep <= 2) setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
  const [members, setMembers] = useState<string[]>(['', '', '']);
  const [check1, setCheck1] = useState(0);
  const [lastCheck, setLastCheck] = useState(check1);

  const getCurrentStepPage = () => {
    switch (activeStep) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo projectName={projectName} setProjectName={setProjectName} />;
      case 2:
        return (
          <StepThree
            members={members}
            setMembers={setMembers}
            check1={check1}
            setCheck1={setCheck1}
            setLastCheck={setLastCheck}
          />
        );
      default:
        return <StepOne />;
    }
  };

  return (
    <div>
      {activeStep <= 2 ? (
        <Grid container direction={'row'} justifyContent={'space-between'} sx={{ marginTop: '3%' }}>
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
              <Box
                ml={'5%'}
                width={{ xs: '0', lg: 'auto' }}
                position='fixed'
                zIndex={-2}
                mt={'-3%'}
              >
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
              <Card elevation={8} sx={{ padding: '5%', mt: '20%' }}>
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
                <Box sx={{ mt: '0%' }} width={{ xs: '0', lg: 'auto' }}>
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
              <Box
                position='sticky'
                zIndex={-3}
                ml={'18%'}
                mt={'-35%'}
                width={{ xs: '0', lg: 'auto' }}
              >
                <img
                  height={'4000%'}
                  width={'100%'}
                  src='/src/base/assets/imgs/create-team-3-1.svg'
                  alt='create-team-3-1'
                ></img>
                <img
                  style={{ position: 'absolute', top: 323, left: -68 }}
                  height={'562%'}
                  src={`/src/base/assets/imgs/create-team-${lastCheck > check1 && lastCheck == 1 ? 'check2.gif' : check1 == 1 && lastCheck < 1 ? 'check1.gif' : check1 < 1 ? 'null' : '3-2.png'}`}
                  alt=''
                ></img>
                <img
                  style={{ position: 'absolute', top: 252, left: 104 }}
                  height={'560%'}
                  src={`/src/base/assets/imgs/create-team-${lastCheck > check1 && lastCheck == 2 ? 'check2.gif' : check1 == 2 && lastCheck < 2 ? 'check1.gif' : check1 < 2 ? 'null' : '3-2.png'}`}
                  alt=''
                ></img>
                <img
                  style={{ position: 'absolute', top: 451, left: 102 }}
                  height={'560%'}
                  src={`/src/base/assets/imgs/create-team-${lastCheck > check1 && lastCheck == 3 ? 'check2.gif' : check1 == 3 && lastCheck < 3 ? 'check1.gif' : check1 < 3 ? 'null' : '3-2.png'}`}
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
        </Grid>
      ) : (
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

export default TeamSetup;
