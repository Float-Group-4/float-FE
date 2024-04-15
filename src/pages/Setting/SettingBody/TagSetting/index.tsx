import {
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
  Box,
  Table,
  TableContainer,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import EditIcon from '@mui/icons-material/Edit';

const statusOption = [
  {
    type: 'Home',
    flag: <FontAwesomeIcon icon={faFlag} style={{ color: '#ff5800' }} size='2x' />,
  },
  {
    type: 'Travel',
    flag: <FontAwesomeIcon icon={faFlag} style={{ color: '#a40bb2' }} size='2x' />,
  },
  {
    type: 'Custom',
    flag: <FontAwesomeIcon icon={faFlag} style={{ color: '#4182fa' }} size='2x' />,
  },
  {
    type: 'Office',
    flag: <FontAwesomeIcon icon={faFlag} style={{ color: '#00ee00' }} size='2x' />,
  },
];

const TagSetting = () => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredRowIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredRowIndex(null);
  };

  return (
    <Box bgcolor='inherit' padding='20px 100px'>
      <Typography variant='h2' fontWeight={500}>
        Statuses
      </Typography>
      <Typography paddingY={2} variant='h5' fontWeight={400}>
        Manage the status types that your team uses on the schedule.
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
        <Typography variant='body2' fontWeight={600} fontSize={26}>
          Status
        </Typography>

        <Typography sx={{ color: 'grey' }} fontSize={14} fontWeight={480} paddingLeft={3}>
          Name
        </Typography>
        {statusOption.map((option, index) => (
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            padding={'10px 20px'}
            borderRadius={3}
            bgcolor={index % 2 === 0 ? '#e7e7e7' : 'inherit'}
            margin={'5px 0'}
            key={index}
            sx={{
              '&:hover': {
                bgcolor: '#d1d1d1',
              },
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Box display='flex' alignItems='center'>
              {option.flag}
              <Typography paddingLeft={2} fontWeight={480} fontSize={15}>
                {option.type}
              </Typography>
              {option.type == 'Custom' && (
                <Typography marginLeft={1} fontWeight={380} fontSize={15}>
                  (The color when a custom status is scheduled)
                </Typography>
              )}
            </Box>
            {hoveredRowIndex === index && (
              <IconButton>
                <EditIcon />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TagSetting;
