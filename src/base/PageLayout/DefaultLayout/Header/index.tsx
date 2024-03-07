import React, { useContext, useEffect, useState } from 'react';

import { LabelValue } from '@base/types';
import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { CONTAINER_PADDING_X, HEADER_HEIGHT } from '@base/config/constants';
import { useQueryClient } from '@tanstack/react-query';

const navItems: LabelValue[] = [
  {
    label: 'Sign in',
    value: 'sign-in',
  },
  {
    label: 'Sign-up',
    value: 'sign-up',
  },
];

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState<boolean>(false);

  const border = `1px solid ${theme.palette.divider}`;

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Stack
            height={HEADER_HEIGHT}
            direction='row'
            alignItems='center'
            justifyContent='flex-end'
            spacing={1}
            borderBottom={border}
            px={CONTAINER_PADDING_X}
          >
            {navItems.map((_item: LabelValue) => (
              <NavLink key={_item.value} to={_item.value} style={{ textDecoration: 'none' }}>
                {({ isActive, isPending }: any) => {
                  return (
                    <Typography
                      sx={{
                        textDecoration: 'none',
                        fontWeight: 500,
                        color: isActive ? theme.palette.primary.main : theme.palette.secondary.main,
                        lineHeight: '40px',
                      }}
                    >
                      {_item.label}
                    </Typography>
                  );
                }}
              </NavLink>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
