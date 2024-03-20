import { Button, FormControl, Stack, TextField, Typography, Box } from '@mui/material';

const GeneralSetting = () => {
  return (
    <Box bgcolor='inherit'>
      <Typography variant='h2' fontWeight={500}>
        General
      </Typography>
      <Typography paddingY={2} variant='h5' fontWeight={400}>
        Set your plan, owner, and team name.
      </Typography>
      <Box
        borderRadius={3}
        border='0.1px solid #D3D3D3'
        marginTop={1}
        paddingX={4}
        paddingY={3}
        display='flex'
        flexDirection='column'
        justifyContent='space-evenly'
      >
        <Typography variant='h4' fontWeight={500}>
          Account Owner
        </Typography>
        <Typography paddingY={2} fontSize='15px'>
          The Account Owner is the only person who can manage the settings on this page, access the
          API key, and manage the account integrations. Only the Account Owner and guests with
          Billing access rights can upgrade/downgrade your plan.
        </Typography>

        <Stack direction='row' spacing={1} paddingTop={1} alignItems='flex-end'>
          <FormControl fullWidth>
            <Typography variant='body2' fontWeight={480}>
              Account Owner
            </Typography>
            <TextField fullWidth value='float-owner' sx={{ pt: 1 }} />
          </FormControl>
          <Button variant='contained' disabled={true} size='medium'>
            Transfer
          </Button>
        </Stack>
      </Box>
      <Box
        borderRadius={3}
        border='0.1px solid #D3D3D3'
        marginY={3}
        paddingX={4}
        paddingY={3}
        display='flex'
        flexDirection='column'
        justifyContent='space-evenly'
      >
        <Typography variant='h4' fontWeight={500}>
          Team name & URL
        </Typography>
        <Typography paddingY={2} fontSize='15px'>
          Update your team name and your team's unique login URL.
        </Typography>
        <Stack spacing={1} direction='row' alignItems='end'>
          <FormControl fullWidth size='medium'>
            <Typography variant='caption'>Team name</Typography>
            <TextField value='float-owner' fullWidth sx={{ pt: 1 }} disabled />
          </FormControl>
          <FormControl fullWidth size='medium'>
            <Typography variant='caption'>Team URL</Typography>
            <TextField value='float.com' fullWidth sx={{ pt: 1 }} disabled />
          </FormControl>

          <Button variant='contained' size='medium' sx={{ p: 1, backgroundColor: 'lightgrey' }}>
            Edit
          </Button>
        </Stack>
      </Box>
      <Box
        borderRadius={3}
        border='0.1px solid #D3D3D3'
        paddingX={4}
        paddingY={3}
        marginY={3}
        display='flex'
        flexDirection='column'
        justifyContent='space-evenly'
      >
        <Typography variant='h4' fontWeight={500}>
          Delete team
        </Typography>
        <Stack direction='row' spacing={3} paddingY={2} alignItems='end' margin={0}>
          <Typography fontSize='15px'>
            Deleting a Float team cannot be undone. We'll delete all of your projects, people and
            data immediately and permanently.
          </Typography>
          <Button
            variant='contained'
            sx={{
              whiteSpace: 'nowrap',
              borderRadius: 'primary',
              bgcolor: '#F57070 !important',
              fontSize: '13px',
              color: 'white',
            }}
          >
            Delete team
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default GeneralSetting;
