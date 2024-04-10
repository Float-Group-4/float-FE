import {
  Box,
  Button,
  Checkbox,
  IconButton,
  ListItemButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { Data, createData } from './CustomTableProp';
import CustomizedTables from './CustomizedTable';
import { useEffect, useState } from 'react';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import {
  Project,
  fetchProjects,
  getFetchProjectsStatus,
} from '../../../redux/project/projectSlice';
import { Edit, MarkunreadMailbox, Person } from '@mui/icons-material';

const plainOptions = ['Active', 'Archived', 'My projects'];

interface ActionGroupProps {
  selectedProject: Project[];
  setSelectedProject: (projects: Project[]) => void;
}

const ActionGroup = (props: ActionGroupProps) => {
  const { selectedProject, setSelectedProject } = props;
  return (
    <Stack>
      <Typography>{selectedProject.length} selected</Typography>
      <Button variant='contained' onClick={() => console.log('Edit project')}>
        <Edit /> Edit
      </Button>
      <Button variant='contained' onClick={() => console.log('Archive')}>
        {' '}
        <MarkunreadMailbox /> Archive{' '}
      </Button>
      <Button onClick={() => setSelectedProject([])}>Clear</Button>
    </Stack>
  );
};

function CheckboxGroup() {
  const [cb, setCb] = useState(false);
  const [filterString, setFilterString] = useState(plainOptions[0]);
  const [checkedList, setCheckedList] = useState<boolean[]>([true, false, false]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onChange = (checked: boolean, index: number) => {
    const updatedCheckedList = [...checkedList];
    updatedCheckedList[index] = checked;
    setFilterString(
      plainOptions
        .filter((_e, i) => updatedCheckedList[i])
        .join(', ')
        .toString(),
    );
    setCheckedList(updatedCheckedList);
  };

  const handleClickViewModeMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectViewMode = (index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    const updatedCheckedList = [...checkedList];
    updatedCheckedList[index] = !checkedList[index];
    setFilterString(
      plainOptions
        .filter((_e, i) => updatedCheckedList[i])
        .join(', ')
        .toString(),
    );
    setCheckedList(updatedCheckedList);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className='bg-white'>
      <div className='flex gap-2 items-center ps-4'>
        <IconButton aria-label='' onClick={() => {}} className='rounded-md hover:bg-white'>
          <CreateNewFolderOutlinedIcon sx={{ color: grey[800] }} />
        </IconButton>
        <ListItemButton
          id='addBtn'
          aria-controls='addMenu'
          aria-expanded={cb ? 'true' : undefined}
          onClick={handleClickViewModeMenu}
          className={`rounded-md flex items-center h-9 aspect-square p-0  text-black  hover:bg-white focus:outline-none focus:bg-white   text-white`}
          sx={{ border: 0, padding: 0, minWidth: 0, width: '300px' }}
        >
          <Typography
            className={` px-4 py-1 rounded-md decoration-dotted`}
            fontSize={18}
            sx={{ textDecorationStyle: 'dotted', textDecorationColor: 'blue', color: 'blue' }}
          >
            {filterString}
          </Typography>

          <ExpandMoreOutlinedIcon fontSize='small' className='ms-2 color-black' color='primary' />
        </ListItemButton>
      </div>
      <div>
        <Menu
          id='addMenu'
          MenuListProps={{
            'aria-labelledby': 'addBtn',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          className='top-2'
        >
          {plainOptions.map((value, index) => (
            <MenuItem
              key={value}
              selected={index === selectedIndex}
              onClick={() => handleSelectViewMode(index)}
              className={`flex justify-between min-w-56 rounded-md`}
            >
              <div className='flex items-center gap-8 min-h-8'>
                <Checkbox
                  onChange={(e) => onChange(e.target.checked, index)}
                  checked={checkedList[index]}
                />
                {value}
              </div>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
}


export default function ProjectView() {
  const dispatch = useAppDispatch();
  const projectList = useAppSelector((state) => state.project.project);
  const projectState = useAppSelector(getFetchProjectsStatus);

  const [selectedProject, setSelectedProject] = useState<Project[]>([]);

  useEffect(() => {
    if (projectState === 'idle') {
      dispatch(fetchProjects());
    }
  }, [projectState, dispatch]);

  return (
    <div className='bg-white flex-1 h-full px-9 py-3'>
      {selectedProject.length > 0 ? (
        <ActionGroup selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
      ) : (
        CheckboxGroup()
      )}
      {CustomizedTables(
        projectList.map((p) =>
          createData(
            p.project.id,
            p.project.id,
            p.project.name,
            (p.project.tags ?? []).join(', '),
            p.project.client ?? '',
            (p.project.budget ?? 0).toString(),
            p.milestones.length > 0 ? p.milestones[0].startDate : 'Null',
            p.milestones.length > 0 ? p.milestones[0].endDate : 'Null',
            p.project.owner ?? '',
          ),
        ),
      )}
      <Box sx={{ width: '100%' }} className='content-center flex flex-col items-center mx-0 mr-5'>
        <Stack spacing={3} direction='column' className='flex content-center align-center'>
          <div className='content-center' style={{ marginLeft: -20 }}>
            <img alt='project_tab' src='/src/base/assets/imgs/project_tab.png' width={200}></img>
          </div>
          <Button
            variant='outlined'
            className='rounded-md bg-blue-600 text-white px-6 py-1'
            sx={{ borderColor: grey[300], color: grey[800] }}
          >
            {/* <AddOutlinedIcon fontSize='small' className='' /> */}
            Import your projects
          </Button>
          <Typography className='underline text-grey text-center'>
            <a href=''>No thanks</a>{' '}
          </Typography>
        </Stack>
      </Box>
    </div>
  );
}
