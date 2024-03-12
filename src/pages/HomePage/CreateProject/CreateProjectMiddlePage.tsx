import Checkbox from '@base/components/CheckBox';
import MiModal from '@base/components/MiModal';
import { ContentCopy, CreateNewFolder } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import CreateProjectModal from '.';

interface MiddlePageProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateProjectMiddlePage = (props: MiddlePageProps) => {
  const { isOpen, setIsOpen } = props;
  const [startFromBlank, setStartFromBlank] = useState(false);

  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isCreateNewProjectTemplateOpen, setIsCreateNewProjectTemplateOpen] = useState(false);

  const handleCreateProjectClick = () => {
    setIsCreateProjectOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <MiModal isOpen={isOpen} size='sm' onClose={() => setIsOpen(false)}>
        <Grid container width='100ch' height='90vh'>
          <Grid item direction='column' xs={6}>
            <Box
              paddingX={6}
              paddingTop={2}
              display='flex'
              flexDirection='column'
              justifyContent='space-between'
              alignContent='center'
            >
              <Typography variant='h4' fontWeight='500' alignSelf='center' sx={{ py: 2 }}>
                New blank project
              </Typography>

              <Button
                variant='text'
                sx={{
                  border: '2px dotted #7AB8FF',
                  borderRadius: '40',
                  paddingY: '40px',
                  paddingX: '10px',
                  marginTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignContent: 'center',
                  '&:hover': { bgcolor: '#fff !important', borderColor: '#000 important' },
                }}
                onClick={handleCreateProjectClick}
              >
                <CreateNewFolder />
                <Typography paddingTop={2} fontSize='16px'>
                  New project
                </Typography>
              </Button>

              <Checkbox
                sx={{ pt: 1 }}
                value={startFromBlank}
                label='Always start from a blank project'
                onChange={() => {
                  const value = startFromBlank;
                  setStartFromBlank(!value);
                }}
              />
            </Box>

            <img src='/src/base/assets/imgs/create-project-middle-page.png' alt='new-project' />
          </Grid>

          <Grid item direction='column' bgcolor='#F8F7F9' xs={6}>
            <Box
              paddingX={6}
              paddingTop={2}
              display='flex'
              flexDirection='column'
              justifyContent='space-between'
              alignContent='center'
            >
              <Typography variant='h4' fontWeight='500' alignSelf='center' sx={{py: 2}}>
                Use a template
              </Typography>

              <Button
                variant='text'
                sx={{
                  border: '2px dotted #7AB8FF',
                  paddingY: '40px',
                  alignContent: 'center',
                  justifyContent: 'center',
                  marginTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': { bgcolor: '#F8F7F9 !important', borderColor: '#000 important' },
                }}
                onClick={() => {
                  setIsCreateNewProjectTemplateOpen(true);
                  setIsOpen(false);
                }}
              >
                <ContentCopy/>
                <Typography paddingTop={2} fontSize='16px'>
                  New template
                </Typography>
              </Button>

              <Typography
                fontWeight='500'
                variant='body2'
                alignSelf='center'
                paddingTop={2}
                fontSize='14px'
              >
                Create your team's first template
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </MiModal>

      {isCreateProjectOpen && (
        <CreateProjectModal isOpen={isCreateProjectOpen} setIsOpen={setIsCreateProjectOpen} />
      )}

      {isCreateNewProjectTemplateOpen && <Box />}
    </>
  );
};

export default CreateProjectMiddlePage;
