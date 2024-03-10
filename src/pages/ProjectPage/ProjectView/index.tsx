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
import { createData } from '@pages/PeoplePage/PeopleView/CustomTableProp';
import CustomizedTables from '@pages/PeoplePage/PeopleView/CustomizedTable';
import { useState } from 'react';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';

// const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Active', 'Archived', 'My projects'];

const rows = [
  createData(1, '1', 'Bảo Huỳnh Minh', 'Employee', 'IT', 'Editor', 'None', 'EB', 'Types'),
  createData(2, '2', 'M', '__', 'IT', 'Account Owner', 'None', '__', 'Types'),

];

function CheckboxGroup() {
  const [cb, setCb] = useState(false);
  const [filterString, setFilterString] = useState(plainOptions[0]);
  const [checkedList, setCheckedList] = useState([true, false, false]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [zoomModeAnchorEl, setZoomModeAnchorEl] = useState<null | HTMLElement>(null);
  // const [densityAnchorEl, setDensityAnchorEl] = useState<null | HTMLElement>(null);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onChange = (checked: boolean, index: number) => {
    console.log('checkedList', checkedList);
    checkedList[index] = checked;
    setFilterString(
      plainOptions
        .filter((e, v) => checkedList[v])
        .join(', ')
        .toString(),
    );
    setCheckedList(checkedList);
  };

  // const onShowDropdown = () => {
  //   setCb(!cb);
  // };

  const handleClickViewModeMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectViewMode = (_e: React.MouseEvent<HTMLElement>, index: number) => {
    // setSelectedIndex(index);
    // setAnchorEl(null);
    checkedList[index] = !checkedList[index];
    setFilterString(
      plainOptions
        .filter((e, v) => checkedList[v])
        .join(', ')
        .toString(),
    );
    setCheckedList(checkedList);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <div className='bg-white' >
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
          sx={{ border: 0, padding: 0, minWidth: 0 ,width: '300px'}}
        >
          <Typography className={` px-4 py-1 rounded-md decoration-dotted`} fontSize={18} sx={{textDecorationStyle: 'dotted', textDecorationColor: 'blue'}}>
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
          {plainOptions.map((value, index) => {
            return (
              <MenuItem
                key={value}
                selected={index === selectedIndex}
                onClick={(event) => handleSelectViewMode(event, index)}
                className={`flex justify-between min-w-56 rounded-md`}
              >
                <div className='flex items-center gap-8 min-h-8'>
                  <Checkbox
                    onChange={(e) => {
                      onChange(e.target.checked, index);
                    }}
                    checked={checkedList[index]}
                  />

                  {value}
                </div>
                {/* {selectedIndex == index ? (
                    <div>
                      <CheckOutlinedIcon sx={{ fontSize: 16 }} />
                    </div>
                  ) : null} */}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </div>
  );
}

export default function ProjectView() {
  return (
    <div className='bg-white flex-1 h-full px-9 py-3'>
      {CheckboxGroup()}
      {CustomizedTables(rows)}
      <Box sx={{ width: '100%' }} className='content-center flex flex-col items-center mx-0 mr-5'>
        <Stack spacing={3} direction='column' className='flex content-center align-center'>
          <div className='content-center' style={{ marginLeft: -20 }}>
            <img src='/src/base/assets/imgs/project_tab.png' width={200}></img>
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
