import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  useTheme,
  Box,
} from '@mui/material';
import { Stack, IconButton, Chip } from '@mui/material';
import settingOptions from './options';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

export default function SideMenu() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>('general');

  return (
    <Box margin={2} >
      <Typography variant='h5' fontWeight='500'>
        Team Settings
      </Typography>
      <Stack
        alignItems='center'
        justifyContent='space-between'
        width='100%'
        height='100%'
        overflow='auto' 
        maxHeight='100vh'
        borderBottom={`1px solid ${theme.palette.divider}`}
        sx={{
          backgroundColor: '#F8F7F9',
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#aaa', borderRadius: '4px' },
        }}
      >
        {settingOptions.map((section, _) => (
          <List
            key={section.title}
            component='nav'
            sx={{
              backgroundColor: '#F8F7F9',
              width: '100%',
              maxWidth: 360,
              '& .MuiListItemIcon-root': {
                minWidth: 10,
                marginRight: 2,
              },
              '& .MuiButtonBase-root': {
                margin: 0,
                borderRadius: 3,
                '&$selected': {
                  color: 'black',
                  backgroundColor: '#DDE2EA',
                  '& .MuiListItemIcon-root': {
                    color: 'black',
                  },
                  '&:hover': {
                    backgroundColor: '#DDE2EA',
                    color: 'black',
                    '& .MuiListItemIcon-root': {
                      color: 'black',
                    },
                  },
                },
                '&:hover': {
                  backgroundColor: '#EDEBF0',
                  color: 'black',
                  '& .MuiListItemIcon-root': {
                    color: 'black',
                  },
                },
              },
            }}
            subheader={
              <ListSubheader
                sx={{ m: 0, p: 0, backgroundColor: '#F8F7F9' }}
                component='span'
                id='nested-list-subheader'
              >
                <Typography variant='caption' fontWeight={500}>
                  {section.title}
                </Typography>
              </ListSubheader>
            }
          >
            {section.subOptions.map((option, _) => (
              <ListItemButton
                sx={{ minHeight: 15 }}
                selected={selectedOption === option.path}
                onClick={() => {
                  navigate(option.path);
                  setSelectedOption(option.path);
                }}
                disableTouchRipple
              >
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText primary={option.label} />
              </ListItemButton>
            ))}
          </List>
        ))}
      </Stack>
    </Box>
  );
}
