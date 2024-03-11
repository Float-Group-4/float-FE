import {
  Box,
  TextField,
} from '@mui/material';
import {
  Button,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  experimental_extendTheme as materialExtendTheme,
} from '@mui/material/styles';
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
    onClose();
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
