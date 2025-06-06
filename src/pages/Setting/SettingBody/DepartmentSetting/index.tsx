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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { generateUUID } from '@base/utils/uuid';
import { useParams } from 'react-router-dom';

interface Department {
  id: string;
  name: string;
  teamId: string;
  isSubDepart: boolean;
}

const DepartmentSetting = () => {
  const params = useParams();
  const teamId = params.teamId || '';
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [newDepartmentName, setNewDepartmentName] = useState<string>('');
  const [data, setData] = useState<Department[]>([]);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [editModeDepart, setEditModeDepart] = useState<number[]>([]);
  const [editingDepart, setEditingDepart] = useState<Department[]>([]);

  useEffect(() => {
    fetchData();
  }, [data]);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmpty(event.target.value === '');
    setNewDepartmentName(event.target.value);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredRowIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredRowIndex(null);
  };

  const isUniqueName = async (name: string): Promise<boolean> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_FRONTEND_BASE_URL}/departments/team/${teamId}`,
      );
      const fetchedData: Department[] = response.data;
      console.log(fetchedData);
      console.log(name);
      return fetchedData.every((item) => item.name !== name);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error or return false in case of failure
      return false;
    }
  };

  const handleAdd = async () => {
    try {
      if (!(await isUniqueName(newDepartmentName))) {
        setOpen(true);
        return;
      }
      var newData: Department = {
        id: generateUUID(),
        name: newDepartmentName,
        isSubDepart: true,
        teamId: teamId,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_FRONTEND_BASE_URL}/departments`,
        newData,
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteClick = async (item: Department) => {
    try {
      var itemId = item.id;
      const response = await axios.delete(
        `${import.meta.env.VITE_FRONTEND_BASE_URL}/departments/${itemId}`,
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_FRONTEND_BASE_URL}/departments`);
      const newData: Department[] = response.data;
      setData(newData);

      if (editingDepart.length == 0) setEditingDepart(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = (index: number) => {
    setEditModeDepart([...editModeDepart, index].sort());
  };

  const handleCancelClick = (index: number) => {
    const result = [...editModeDepart];
    const itemIndex = result.indexOf(index);
    if (itemIndex !== -1) {
      result.splice(itemIndex, 1);
    }
    setEditModeDepart(result);
  };

  const handleSaveClick = async (index: number, newName: string) => {
    try {
      if (!(await isUniqueName(newName))) {
        setOpen(true);
        return;
      }
      const updatedData = data ? [...data] : [];
      const departmentToUpdate = updatedData[index];
      departmentToUpdate.name = newName;

      const response = await axios.patch(
        `${import.meta.env.VITE_FRONTEND_BASE_URL}/departments/${departmentToUpdate.id}`,
        departmentToUpdate,
      );
      updatedData[index] = response.data;
      setData(updatedData);

      handleCancelClick(index);
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  return (
    <Box bgcolor='inherit' padding='20px 100px'>
      <Typography variant='h2' fontWeight={500}>
        Department
      </Typography>
      <Typography paddingY={2} variant='h5' fontWeight={400}>
        Manage the Departments you group your team into. Departments with no People can be removed.
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
        <Stack direction='row' paddingTop={1} alignItems='flex-end'>
          <FormControl>
            <Typography variant='body2' fontWeight={400}>
              Add a Department
            </Typography>
            <TextField
              value={newDepartmentName}
              fullWidth
              sx={{ pt: 1, maxWidth: '100%', minWidth: '400px' }}
              onChange={handleChange}
            />
          </FormControl>
          <Button
            variant={isEmpty ? 'text' : 'contained'}
            disabled={isEmpty}
            size='medium'
            sx={{ marginLeft: '10px', height: '41px', color: isEmpty ? 'grey' : '' }}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Stack>
        <Typography sx={{ color: 'grey' }} fontSize={12} fontWeight={300}>
          64 character max
        </Typography>
        <Box marginTop={5}>
          {data!.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650, borderSpacing: '0 40px' }} aria-label='simple table'>
                <colgroup>
                  <col width='60%' />
                  <col width='20%' />
                  <col width='15%' />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align='left'>People</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((item, index) =>
                    editModeDepart.includes(index) ? (
                      <TableRow>
                        <TableCell>
                          <TextField
                            fullWidth
                            value={editingDepart[index].name}
                            onChange={(e) =>
                              setEditingDepart({
                                ...editingDepart,
                                [index]: { ...editingDepart[index], name: e.target.value },
                              })
                            }
                          ></TextField>
                        </TableCell>
                        <TableCell>0</TableCell>
                        <TableCell align='right' component='th' scope='row'>
                          <IconButton
                            aria-label='save'
                            onClick={() => handleSaveClick(index, editingDepart[index].name)}
                          >
                            <CheckIcon />
                          </IconButton>
                          <IconButton aria-label='cancel' onClick={() => handleCancelClick(index)}>
                            <CloseIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          backgroundColor: index === hoveredRowIndex ? '#f5f5f5' : 'inherit',
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          {item?.name}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          0
                        </TableCell>
                        <TableCell align='right' component='th' scope='row'>
                          {index === hoveredRowIndex && (
                            <>
                              {/* <IconButton aria-label='add-sub'>
                              <AddIcon />
                            </IconButton> */}
                              <IconButton aria-label='edit' onClick={() => handleEditClick(index)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                aria-label='delete'
                                onClick={() => handleDeleteClick(item)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>There are no Departments</Typography>
          )}
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='error' variant='filled' sx={{ width: '100%' }}>
          This name is already existed!!!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DepartmentSetting;
