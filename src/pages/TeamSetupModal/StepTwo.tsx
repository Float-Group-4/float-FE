import {
  TextField,
} from '@mui/material';
import {
  Typography,
} from '@mui/material';

interface StepTwoProps {
  projectName: string;
  setProjectName: (projectName: string) => void;
}
const StepTwo: React.FC<StepTwoProps> = ({ projectName, setProjectName }) => {
  return (
    <div>
      <Typography variant='h4' gutterBottom sx={{ marginLeft: '10px', marginTop: '10%' }}>
        Add your first project
      </Typography>
      <Typography variant='body1' gutterBottom sx={{ marginLeft: '10px', marginBottom: '6%' }}>
        Use this project to learn how Float works. You can add more details later.{' '}
      </Typography>
      <Typography sx={{ marginLeft: '10px' }} variant='body2'>
        Project Name
      </Typography>
      <TextField
        sx={{ marginLeft: '10px', marginBottom: '8%', width: '85%' }}
        onChange={(v) => {
          setProjectName(v.target.value);
          localStorage.setItem('projectName', projectName);
        }}
        placeholder='E.g., Razor Project'
        fullWidth
        inputProps={{ maxLength: 60 }}
        value={projectName}
      />
    </div>
  );
};

export default StepTwo;
