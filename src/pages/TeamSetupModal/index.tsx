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
import MiModal from '@base/components/MiModal';

const materialTheme = materialExtendTheme();

interface TeamSetupModalProp {
  isOpen: boolean;
  onClose: () => void;
}

const TeamSetupModal = (props: TeamSetupModalProp) => {
  const { isOpen, onClose } = props;
  const navigate = useNavigate();

  const [isStepperOpen, setIsStepperOpen] = useState(false);
  const openTeamSetupModal = (e: React.MouseEvent<HTMLElement>) => {
    localStorage.setItem('teamName', teamName);
    navigate('team-setup');
  };

  const [teamName, setTeamName] = useState(localStorage.getItem('teamName') ?? '');

  const Footer = (
    <Button variant='contained' onClick={openTeamSetupModal}>
      Continue
    </Button>
  );

  return (
    <MiModal title='Create team' isOpen={isOpen} onClose={onClose} size='xs' footer={Footer}>
      <Box p={2}>
        <Typography sx={{ textAlign: 'center', fontSize: 24, fontWeight: 700 }}>
          Pick a name for your team
        </Typography>

        <Typography sx={{ textAlign: 'center', fontWeight: 400, fontSize: 16, my: 2.5 }}>
          You can always change it later in team settings
        </Typography>

        <Typography variant='body1'>Team name</Typography>
        <TextField
          onChange={(v) => setTeamName(v.target.value)}
          placeholder='E.g., Razor Angency'
          fullWidth
          value={teamName}
        />
      </Box>
    </MiModal>
  );
};

export default TeamSetupModal;
