import { Grid } from '@mui/material';
import SideMenu from './SideMenu';
import SettingBody from './SettingBody';

const SettingsPage = () => {
  return (
    <Grid container sx={{ height: '100%' }}>
      <Grid
        item
        xs={3}
        sx={{
          backgroundColor: '#F8F7F9',
        }}
      >
        <SideMenu />
      </Grid>
      <Grid
        item
        sx={{
          flex: 1,
          backgroundColor: 'white'
        }}
      >
        <SettingBody />
      </Grid>
    </Grid>
  );
};

export default SettingsPage;
