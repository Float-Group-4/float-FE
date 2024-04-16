import Logo from '@base/assets/imgs/float.svg';
import { CONTAINER_PADDING_X, HEADER_HEIGHT_NOT_AUTH } from '@base/config/constants';
import { Stack, Typography } from '@mui/material';
import { useMatch, useNavigate } from 'react-router-dom';

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const navigate = useNavigate();
  const isSignIn = useMatch('/sign-in');
  const isRecoverPassword = useMatch('recover-password');

  return (
    <Stack
      height={HEADER_HEIGHT_NOT_AUTH}
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      p={CONTAINER_PADDING_X}
    >
      <Stack direction='row' alignItems='center' spacing={2}>
        <img src={Logo} alt='React Logo' />
        {/* <Typography sx={{ fontSize: 14, fontWeight: 500 }}>New to Float?</Typography> */}
      </Stack>

      {isSignIn || isRecoverPassword ? (
        <Stack direction='row' alignItems='center' spacing={2}>
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>New to Proma?</Typography>
          <button
            onClick={() => navigate('/sign-up')}
            className='px-4 py-2 text-blue-600 font-medium bg-blue-100 rounded-lg duration-150 hover:bg-blue-600 hover:text-white active:bg-blue-700'
          >
            Try For Free
          </button>
        </Stack>
      ) : (
        <Stack direction='row' alignItems='center' spacing={2}>
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            Already have a Proma account?
          </Typography>
          <button
            onClick={() => navigate('/sign-in')}
            className='px-4 py-2 text-blue-600 font-medium bg-blue-100 rounded-lg duration-150 hover:bg-blue-600 hover:text-white active:bg-blue-700'
          >
            Sign In
          </button>
        </Stack>
      )}
    </Stack>
  );
};

export default Header;
