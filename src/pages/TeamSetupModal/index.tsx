import {
  Box,
  Card,
  DialogProps,
  Grid,
  ListItemText,
  Skeleton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from '@mui/material';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
  DialogContent,
} from '@mui/material';
import { Fragment, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fontWeight } from '@mui/system';
import { Add, AddIcCallOutlined } from '@mui/icons-material';
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';

const materialTheme = materialExtendTheme();

interface TeamSetupModalProp {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const TeamSetupModal: React.FC<TeamSetupModalProp> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const [isStepperOpen, setIsStepperOpen] = useState(false);
  const openTeamSetupModal = (e: React.MouseEvent<HTMLElement>) => {
    localStorage.setItem('teamName', teamName);
    setIsOpen(false);
    navigate('team-setup');
  };

  const [teamName, setTeamName] = useState(localStorage.getItem('teamName') ?? '');

  const handleClose: DialogProps['onClose'] = (event, reason) => {
    // if (reason && reason === "backdropClick && "escapeKeyDown"")
    //     return;
    setIsOpen(false);
  };

  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <Dialog open={isOpen} maxWidth='xl' onClose={handleClose}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
            <div>
              <Typography variant='h3' sx={{ p: 3 }}>
                Pick a name for your team
              </Typography>
            </div>
            <div>
              <Typography variant='h5' sx={{ fontWeight: 300, pb: 3 }}>
                You can always change it later in team settings
              </Typography>
            </div>
            <Typography variant='body1'>Team name</Typography>
            <TextField
              onChange={(v) => setTeamName(v.target.value)}
              placeholder='E.g., Razor Angency'
              fullWidth
              value={teamName}
            />
          </DialogContent>
          <DialogActions>
            <Button variant='contained' fullWidth onClick={openTeamSetupModal}>
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
};

export default TeamSetupModal;
