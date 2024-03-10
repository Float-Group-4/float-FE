import { Box } from '@mui/system';
import { Outlet } from 'react-router';

const SettingBody = () => {
  return (
    <Box
      paddingX={4}
      paddingTop={2}
      flexDirection='column'
      overflow='auto' 
      maxHeight='100vh' 
      sx={{
        '&::-webkit-scrollbar': { width: '8px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#aaa', borderRadius: '4px' },
      }}
    >
      <Outlet />
    </Box>
  );
};

export default SettingBody;
