import { Grid, useTheme } from '@mui/material';
import Board from './Board';
import Sidebar from './Sidebar';

export default function Schedule() {
  const theme = useTheme();
  return (
    <Grid container sx={{ background: '#f3f2f5', height: '100%' }}>
      <Grid
        item
        sx={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          overflow: 'hidden',
          background: theme.palette.background.paper,
          height: '100%',
          boxShadow: 'rgba(0, 0, 0, 0.02) 0px 0px 4px, rgba(9, 30, 66, 0.07) 4px 0px 6px',
          width: 260,
        }}
      >
        <Sidebar />
      </Grid>
      <Grid item sx={{ flex: 1 }}>
        <Board />
      </Grid>
    </Grid>
  );
}
