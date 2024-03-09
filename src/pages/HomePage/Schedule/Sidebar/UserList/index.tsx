import { Box, Chip, Divider, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { dummyData } from './dummyData';
import { USER_CELL_HEIGHT } from '@constants/home';
import BackgroundLetterAvatar from '@components/BackgroundLetterAvatar';

interface UserListProps {}

const UserList = (props: UserListProps) => {
  const theme = useTheme();
  return (
    <Stack divider={<Divider />}>
      {dummyData.map((user, i) => {
        return (
          <Box sx={{ height: USER_CELL_HEIGHT, p: 1 }}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <Stack direction='row' alignItems='center' spacing={1}>
                <BackgroundLetterAvatar>{user?.name}</BackgroundLetterAvatar>
                <Typography>{user?.name}</Typography>
              </Stack>
              <Chip
                variant='light'
                size='small'
                color='secondary'
                label={`${user?.workHour}h`}
                sx={{ '& .MuiChip-label ': { color: theme.palette.text.primary } }}
              />
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
};

export default UserList;
