import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Stack, Typography, useTheme } from '@mui/material';

import Logo from '@base/assets/imgs/float.svg';
import { CONTAINER_PADDING_X, HEADER_HEIGHT_NOT_AUTH } from '@base/config/constants';
import { useSnackBar } from '@base/hooks/useSnackbar';
import { getWriteForm } from '@base/utils/getWriteForm';
import { indigo } from '@mui/material/colors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WriteFields from './WriteFields';
import writeConfig from './config';
import * as keyNames from './config/keyNames';
import { LOCAL_STORAGE_KEY_ACCESS_TOKEN } from '@configs/localStorage';

interface CreateTeamProps {}

const CreateTeam = (props: CreateTeamProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const layoutFields: string[] = [keyNames.KEY_NAME_TEAMNAME];
  const [userInfo, setUserInfo] = useState<any>({});

  const getUserInfo = async () => {
    try {
      // Get UserId
      const token = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
      if (!token) return enqueueErrorBar('Token not found');
      const userInfoEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/auth/user-info`;
      const userInfoRes = await axios.get(userInfoEndpoint, {
        params: {
          token: token,
        },
      });
      const userInfo = userInfoRes.data;
      setUserInfo(userInfo);
    } catch (err: any) {
      console.log('ERROR: ', err.message);
      enqueueErrorBar(err.message || '');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const { fields, defaultValues, getParams } = getWriteForm(layoutFields, writeConfig);

  //react-hook
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange',
  });

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    try {
      // Get UserId

      const userId = userInfo.id;
      const userName = userInfo.name;

      //   Create new team
      const createTeamEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/team`;
      const resultCreateTeam = await axios.post(createTeamEndpoint, formData);
      const teamId = resultCreateTeam.data.id;
      //   Create team member for owner
      const createOwnerTeamMemberEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/team-members`;
      const teamOwnerData = {
        teamId: teamId,
        userId: userId,
        name: userName,
        type: 'Owner',
        hourlyRate: 8,
        access: '',
        email: '',
      };
      const resultOwnerTeamMember = await axios.post(createOwnerTeamMemberEndpoint, teamOwnerData);
      const ownerTeamMemberId = resultOwnerTeamMember.data.id;
      //   Update Ownder Team Member ID To Created Team
      const addTeamOwnerEndpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/team/${teamId}`;
      const updateTeamOwnerResult = await axios.patch(addTeamOwnerEndpoint, {
        teamOwnerId: ownerTeamMemberId,
      });
      enqueueSuccessBar('Create team successfully');
      navigate(`/team/${teamId}/tutorial`);
    } catch (err: any) {
      console.log('ERROR: ', err.message);
      enqueueErrorBar(err.message || '');
    }
  };

  const border = `1px solid ${theme.palette.divider}`;

  return (
    <>
      <Stack>
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

          <Stack direction='row' alignItems='center' spacing={2}>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              {`Signing up as ${userInfo.name || ''}`}
            </Typography>
            <button
              onClick={() => navigate('/sign-in')}
              className='px-4 py-2 text-blue-600 font-medium bg-blue-100 rounded-lg duration-150 hover:bg-blue-600 hover:text-white active:bg-blue-700'
            >
              Start Over
            </button>
          </Stack>
        </Stack>
        <Stack
          height={`calc(100vh - ${HEADER_HEIGHT_NOT_AUTH}px)`}
          width='100%'
          margin='auto'
          px={CONTAINER_PADDING_X}
        >
          <Box
            sx={{
              boxShadow: '0 6px 30px #0000001f',
              border,
              borderRadius: 4,
              width: 464,
              margin: 'auto',
              p: 4,
              background: 'white',
            }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: 700, textAlign: 'center', mb: 2 }}>
              Pick a name for your team
            </Typography>
            <Typography
              sx={{ fontSize: 16, fontWeight: 400, textAlign: 'center', mb: 2 }}
              className='text-gray-500'
            >
              You can always change it later in team settings
            </Typography>
            <form>
              <Suspense fallback={<></>}>
                <WriteFields
                  fields={fields}
                  watch={watch}
                  setValue={setValue}
                  control={control}
                  errors={errors}
                />
                <Button
                  size='large'
                  variant='contained'
                  onClick={() => {
                    handleSubmit((data) => onSubmit(data), onError)();
                  }}
                  sx={{
                    width: '100%',
                    fontWeight: 500,
                    backgroundColor: indigo[600],
                    borderRadius: 2,
                  }}
                  className='text-lg mt-4'
                >
                  Continue
                </Button>
              </Suspense>
            </form>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default CreateTeam;
