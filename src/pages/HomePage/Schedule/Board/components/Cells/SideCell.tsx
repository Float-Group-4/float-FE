import BackgroundLetterAvatar from '@components/BackgroundLetterAvatar';
import { USER_CELL_HEIGHT } from '@constants/home';
import { useAppSelector } from '@hooks/reduxHooks';
import { Box, Chip, Stack, Tooltip, Typography, useTheme } from '@mui/material';

export const SideCell = ({ userId }: { userId: string }) => {
  const theme = useTheme();
  const userByIds = useAppSelector((state) => state.general.usersById);
  const timeRange = useAppSelector((state) => state.scheduleMeasurement.timeRange);
  const scheduledTime = useAppSelector((state) => state.scheduleMeasurement.scheduledTime);
  const user = userByIds[userId];
  const cornerCellWidth = useAppSelector((state) => state.scheduleMeasurement.cornerCellWidth);
  return (
    <div
      key={userId}
      className={`transition-transform delay-150 sticky left-0 border-r border-b border-b-[#d6d5d7] bg-white text-xs z-[20]`}
      style={{
        height: 'calc(100% - 1px)',
        width: `${cornerCellWidth}px`,
        marginLeft: `-${cornerCellWidth - 1}px`,
        transition: 'width 0.2s',
        marginTop: 1,
      }}
    >
      <Box sx={{ height: USER_CELL_HEIGHT, p: 1 }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Stack direction='row' alignItems='center' spacing={1}>
            <BackgroundLetterAvatar>{user?.name}</BackgroundLetterAvatar>
            <Typography>{user?.name}</Typography>
          </Stack>
          {timeRange && (
            <Tooltip
              title={
                <div>
                  <div>{`${scheduledTime[user.id]?.scheduledTime.toFixed(2) || 0}h/${scheduledTime[user.id]?.totalTime.toFixed(0) || 0}h capacity`}</div>
                  <div>{`${scheduledTime[user.id]?.overtime.toFixed(2) || 0}h overtime`}</div>
                </div>
              }
              arrow
              placement='right'
            >
              <Chip
                variant='light'
                size='small'
                color={scheduledTime[user.id]?.overtime === 0 ? 'secondary' : 'error'}
                label={`${scheduledTime[user.id]?.scheduledTime || 0}h`}
                sx={
                  scheduledTime[user.id]?.overtime === 0
                    ? { '& .MuiChip-label ': { color: theme.palette.text.primary } }
                    : {}
                }
              />
            </Tooltip>
          )}
        </Stack>
      </Box>
    </div>
  );
};
