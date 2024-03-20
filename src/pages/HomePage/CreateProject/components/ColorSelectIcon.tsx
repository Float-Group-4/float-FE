import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Popover,
  Grid,
  TextField,
  FormControl,
  Divider,
} from '@mui/material';
import { ArrowDropDown, Circle } from '@mui/icons-material';

interface ColorSelectPopoverProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorSelectPopover: React.FC<ColorSelectPopoverProps> = ({
  selectedColor,
  onSelectColor,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const colors: string[] = [
    '#3451b2',
    '#d23197',
    '#ecadd4',
    '#793aaf',
    '#d3b4ed',
    '#067a6f',
    '#69d9c1',
    '#0b752e',
  ];

  return (
    <Box>
      <IconButton onClick={handleOpenPopover}>
        <Circle sx={{ color: selectedColor, fontSize: 30 }} />
      </IconButton>
      <IconButton
        sx={{ width: 22, height: 22 }}
        disableFocusRipple
        disableTouchRipple
        disableRipple
      >
        <ArrowDropDown />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={2}>
          <FormControl fullWidth>
            <Typography>HEX #</Typography>
            <TextField value={selectedColor} focused/>
          </FormControl>
          <Divider sx={{ height: 10 }} />
          <Typography>Default color</Typography>
          <Grid container>
            {colors.map((color, _) => (
              <Grid item key={color} direction='row'>
                <IconButton
                  onClick={() => {
                    onSelectColor(color);
                    handleClosePopover();
                  }}
                >
                  <Circle sx={{ color: color }} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Popover>
    </Box>
  );
};

export default ColorSelectPopover;
