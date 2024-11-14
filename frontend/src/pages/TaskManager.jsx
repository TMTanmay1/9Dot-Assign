import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  TextField,
  Typography,
  Box,
  Modal,
  Fade,
  Backdrop,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  InputAdornment, 
  Snackbar,
  Alert,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';


const EditTaskModal = ({ open, onClose, onSubmit, initialData }) => {
    
    const [TaskName, setTaskName] = useState('');
    const [TaskFee, setTaskFee] = useState('');
    const [description, setDescription] = useState('');
    const [TaskDuration, setTaskDuration] = useState('');
  
    useEffect(() => {
      if (initialData) {
        setTaskName(initialData.title || '');
        setTaskFee(new Date(initialData.dueDate).toLocaleDateString('en-CA') || '');
        setTaskDuration(initialData.status || '');
        setDescription(initialData.description || '');
      }
    }, [initialData]);
  
    const handleSubmit = () => {
      if (TaskName) {
        onSubmit({
          _id: initialData._id, 
          title: TaskName,
          dueDate: TaskFee,
          status: TaskDuration,
          description: description,
        });
        // Reset all fields
        setTaskName('');
        setTaskFee('');
        setTaskDuration('');
        setDescription('');
        onClose();
      }
    };
  
    return (
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box
            maxWidth="sm"
            sx={{
              bgcolor: 'background.paper',
              p: 4,
              borderRadius: 2,
              mt: '10%',
              mx: 'auto',
              position: 'relative',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Edit Task
            </Typography>
  
            <TextField
              fullWidth
              variant="outlined"
              label="Task"
              value={TaskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
  
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Due Date"
                  type="date"
                  value={TaskFee}
                  onChange={(e) => setTaskFee(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" required sx={{ mb: 2 }}>
                  <InputLabel>Select Status</InputLabel>
                  <Select
                    label="status"
                    value={TaskDuration}
                    onChange={(e) => setTaskDuration(e.target.value)}
                    required
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
  
            <TextField
              fullWidth
              required
              variant="outlined"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
  
            <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <Button variant="outlined" onClick={onClose}>
                  Discard
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    );
  };
  
const AddTaskModal = ({ open, onClose, onSubmit}) => {
  const [TaskName, setTaskName] = useState('');
  const [TaskFee, setTaskFee] = useState('');
  const [description, setDescription] = useState('');
  const [TaskDuration, setTaskDuration] = useState('');

  const handleSubmit = () => {
    if (TaskName) {
      onSubmit({
        title: TaskName,
        dueDate: TaskFee,
        status: TaskDuration,
        description: description,
      });
      
      setTaskName('');
      setTaskFee('');
      setTaskDuration('');
      setDescription('');
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          maxWidth="sm"
          sx={{
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            mt: '10%',
            mx: 'auto',
            position: 'relative',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Task
          </Typography>

      
          <TextField
            fullWidth
            variant="outlined"
            label="Task"
            value={TaskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Due Date"
                type="date"
                value={TaskFee}
                onChange={(e) => setTaskFee(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
            </Grid>
            
            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" required sx={{ mb: 2 }}>
                <InputLabel>Select Status</InputLabel>
                <Select
                label="status"
                value={TaskDuration}
                onChange={(e) => setTaskDuration(e.target.value)}
                required
                >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                </Select>
            </FormControl>
            </Grid>

          </Grid>
         

          
          <TextField
            fullWidth
            required
            variant="outlined"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />

          
          <Grid container spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Button variant="outlined" onClick={onClose}>
                Discard
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

const TaskManager = () => {
  const Token = localStorage.getItem('authToken');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [Tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (editedTask) => {
    try {
      await axios.put(
        `http://localhost:3000/api/tasks/${editedTask._id}`,
        {
          title: editedTask.title,
          dueDate: editedTask.dueDate,
          status: editedTask.status,
          description: editedTask.description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      
      const updatedTasks = Tasks.map(Task => 
        Task._id === editedTask._id ? editedTask : Task
      );
      setTasks(updatedTasks);

      setEditModalOpen(false);
      setSnackbarMessage('Task updated successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error updating task:', error);
      setSnackbarMessage('Failed to update task.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/tasks`, {
            headers: {
                Authorization: `Bearer ${Token}`,
            }
        }
        );
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching Tasks:', error);
      }
    };

    fetchTasks();

  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/tasks`,{
            headers: {
                Authorization: `Bearer ${Token}`,
            }
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching Tasks:', error);
      }
    };

    fetchTasks();
  }, [snackbarOpen]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddTask = async (Task) => {
    console.log(Task);
    
    try {
      await axios.post(
        `http://localhost:3000/api/tasks`,
        {
            title: Task.title,
            dueDate: Task.dueDate,
            status: Task.status,
            description: Task.description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      setModalOpen(false);
      setSnackbarMessage('Task added successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error adding task:', error);
      setSnackbarMessage('Failed to add task.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleDeleteTask = async (TaskId) => {
    console.log('TaskId:', TaskId);
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${TaskId}`,{
        headers: {
            Authorization: `Bearer ${Token}`,
        }
      });

      setSnackbarMessage('Taks deleted successfully!');
      setSnackbarSeverity('success');

      const updatedTasks = Tasks.filter((Task) => Task._id !== TaskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
      setSnackbarMessage('Failed to delete task.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  }



//   const filteredTasks = Tasks.filter((Task) =>
//     Task.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

const filteredTasks = Tasks.filter((Task) => {
    const matchesSearch = Task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || Task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" component="div">
              Task Manager
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} container justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px' }}
              onClick={() => setModalOpen(true)}
              fullWidth={!(window.innerWidth > 600)}
            >
              + Add Task
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* <TextField
        fullWidth
        variant="outlined"
        placeholder="Search Task...."
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      /> */}

<Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search Task...."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Filter by Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant="subtitle1" gutterBottom>
        Total Task: {filteredTasks.length}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Task</TableCell>
              <TableCell align='center'>Description</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Duration</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
<TableBody>
  {filteredTasks.length > 0 ? (
    filteredTasks
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((Task) => (
        <TableRow key={Task._id}>
          <TableCell align='center'>{Task.title}</TableCell>
          <TableCell align='center'>{Task.description}</TableCell>
          <TableCell align='center'>{Task.status}</TableCell>
          <TableCell align='center'>
  {new Date(Task.dueDate).toLocaleDateString('en-CA')}
</TableCell>

          <TableCell align='center'>
            <IconButton onClick={() => handleEditClick(Task)}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => handleDeleteTask(Task._id)}>
              <DeleteIcon color="secondary" />
            </IconButton>
          </TableCell>
        </TableRow>
      ))
  ) : (
    <TableRow>
      <TableCell colSpan={5} align='center'>
        No Task found.
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredTasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

<EditTaskModal
      open={editModalOpen}
      onClose={() => {
        setEditModalOpen(false);
        setSelectedTask(null);
      }}
      onSubmit={handleEditSubmit}
      initialData={selectedTask}
    />

      <AddTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddTask}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TaskManager;
