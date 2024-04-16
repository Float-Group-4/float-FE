import {
  Button,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
  Divider,
  Popper,
  Paper,
  ClickAwayListener,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faChevronDown, faCircle, faFlag } from '@fortawesome/free-solid-svg-icons';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import zIndex from '@mui/material/styles/zIndex';
import { SketchPicker } from 'react-color';
import { useParams } from 'react-router-dom';

interface StatusType {
  color: string;
  name: string;
  id: string;
  teamID: string;
}

const defaultColors = [
  '#f44336',
  '#0b5394',
  '#6fa8dc',
  '#8fce00',
  '#e69138',
  '#ff28ce',
  '#c90076',
  '#6a329f',
];

const StatusSetting = () => {
  const params = useParams();
  const teamID = params.teamId;
  const baseURL = import.meta.env.VITE_FRONTEND_BASE_URL;
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [data, setData] = useState<StatusType[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLElement | null>(null);
  const [editingStatus, setEditingStatus] = useState<StatusType>();
  const [colorPickerValue, setColorPickerValue] = useState<string>('');

  const colorPickerInputRef = useRef<HTMLInputElement>(null);

  const handleColorPickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    event.preventDefault;
    setColorPickerValue(newColor);
    setEditingStatus((prevStatus) => {
      if (prevStatus) {
        return { ...prevStatus, color: newColor };
      }
      return prevStatus;
    });
  };

  const colorPickerOpen = Boolean(colorPickerAnchor);
  const handleColorPickerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setColorPickerAnchor(event.currentTarget);
    if (colorPickerInputRef.current) {
      colorPickerInputRef.current.click();
    }
  };

  useEffect(() => {
    if (colorPickerInputRef.current && colorPickerAnchor) {
      colorPickerInputRef.current.click();
    }
  });

  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta}}/status-types/team/${teamID}`);
      setData(response.data);
    } catch (e) {
      console.log('error:' + e);
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredRowIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredRowIndex(null);
  };

  const handleEditClick = (status: StatusType) => {
    handleOpenDialog();
    setEditingStatus(status);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveDialog = async () => {
    try {
      const id = editingStatus?.id;
      const response = await axios.patch(`${baseURL}/status-types/${id}`, editingStatus);
      handleCloseDialog();
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  const handleEditStatusNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setEditingStatus((prevStatus) => {
      if (prevStatus) {
        return { ...prevStatus, name: newName };
      }
      return prevStatus;
    });
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const handleClickAwayColor = () => {
    setColorPickerAnchor(null);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setEditingStatus((prevStatus) => {
      if (prevStatus) {
        return { ...prevStatus, color: newColor };
      }
      return prevStatus;
    });
  };

  const handleDefaultColorClick = (colorCode: string) => {
    setEditingStatus((prevStatus) => {
      if (prevStatus) {
        return { ...prevStatus, color: colorCode };
      }
      return prevStatus;
    });
    setAnchorEl(null);
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
        {data.map((type, index) => (
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            padding={'10px 20px'}
            borderRadius={3}
            height={60}
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
              <FontAwesomeIcon icon={faFlag} style={{ color: type.color }} size='2x' />
              <Typography paddingLeft={2} fontWeight={480} fontSize={15}>
                {type.name}
              </Typography>
              {type.name == 'Custom' && (
                <Typography marginLeft={1} fontWeight={380} fontSize={15}>
                  (The color when a custom status is scheduled)
                </Typography>
              )}
            </Box>
            {hoveredRowIndex === index && (
              <IconButton onClick={() => handleEditClick(type)}>
                <EditIcon />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>
      <Dialog
        disableEnforceFocus
        open={dialogOpen}
        onClose={handleCloseDialog}
        fullWidth={true}
        maxWidth={'xs'}
        PaperProps={{ sx: { position: 'absolute', top: 50, borderRadius: 2, padding: '10px 0' } }}
      >
        <DialogTitle sx={{ fontSize: '30px' }}>Edit Status</DialogTitle>
        <DialogContent>
          <Typography>Status Name *</Typography>
          <TextField
            autoFocus
            margin='dense'
            id='statusName'
            type='text'
            fullWidth
            value={editingStatus?.name}
            onChange={handleEditStatusNameChange}
          />

          <Typography marginTop={3}>Color</Typography>
          <Box display={'flex'} alignItems={'center'}>
            <IconButton
              onClick={handleMenuClick}
              sx={{
                width: '70px',
                '&:hover': {
                  backgroundColor: '#FFF',
                },
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <FontAwesomeIcon icon={faCircle} size='2x' color={editingStatus?.color} />
              <FontAwesomeIcon icon={faChevronDown} />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'flex-start', marginLeft: '20px' }}>
          <Button variant='contained' onClick={handleSaveDialog} color='primary'>
            Save
          </Button>
          <Button variant='outlined' onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Popper anchorEl={anchorEl} open={menuOpen} sx={{ zIndex: 1500 }}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper sx={{ width: '350px', height: '300px', padding: '15px', borderRadius: '5%' }}>
            <Box marginBottom={2}>
              <Typography>HEX</Typography>
              <TextField
                id='hex'
                autoFocus
                type='text'
                fullWidth
                value={editingStatus?.color}
                onChange={handleColorChange}
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter') {
                    setAnchorEl(null);
                    ev.preventDefault();
                  }
                }}
              />
            </Box>
            <Divider sx={{ borderBottomWidth: 3 }} />
            <Box marginBottom={2} marginTop={2}>
              <Typography>Default Colors</Typography>
              <Box display={'flex'} justifyContent={'space-between'}>
                {defaultColors.map((code) => (
                  <IconButton
                    sx={{ borderRadius: '50%' }}
                    onClick={() => handleDefaultColorClick(code)}
                  >
                    <FontAwesomeIcon icon={faCircle} color={code} style={{ fontSize: '30px' }} />
                  </IconButton>
                ))}
              </Box>
            </Box>
            <Divider sx={{ borderBottomWidth: 3, marginBottom: '20px' }} />
            <Button variant='contained' fullWidth onClick={handleColorPickerClick}>
              Set Custom Color
            </Button>
            <Popper sx={{ zIndex: 1500 }} open={colorPickerOpen} anchorEl={colorPickerAnchor}>
              <ClickAwayListener onClickAway={handleClickAwayColor}>
                <Box sx={{ width: '320px', top: '-15px', left: '-160px', position: 'absolute' }}>
                  <input
                    type='color'
                    style={{ width: 0, height: 0 }}
                    ref={colorPickerInputRef}
                    value={colorPickerValue}
                    onChange={handleColorPickerChange}
                  />
                </Box>
              </ClickAwayListener>
            </Popper>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default StatusSetting;
