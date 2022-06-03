import '../../App.css';
import React,{useState,useRef, useEffect} from 'react'

// material core
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SvgIcon from '@mui/material/SvgIcon';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// material icon
import ModeEditIcon from '@mui/icons-material/ModeEdit';

// apis
import * as usersApi from '../../apis/usersApi'


export default function User() {
  // initial
  const formDefault = {
    id:'',
    lastName:'',
    email:'',
    role:'',
  }
  const [users, setUsers] = useState([])
  const [openModalAddUser, setOpenModalAddUser] = useState(false);
  const [forms, setForms] = useState({formDefault})

  // refs
  const progressRef = useRef(null)

  //fetch Users
  const fetchUsers = async () => {
      try {
        const data = await usersApi.fetchUsers();
        setUsers(data.data)
      } catch(err) {
        console.log('err:',  err)
      }
  }
  console.log('usersssss', users)

  function handleLoadMore(entries) {
    console.log('handleLoadMore')
    const entry = entries[0]
    if (!entry.isIntersecting) return;

    fetchUsers();
  }

  useEffect(() => {
    if (!progressRef) return;
    let observerRefValue = null
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 1.0
    }
    const observer = new IntersectionObserver(handleLoadMore, options)
    observer.observe(progressRef.current)
    observerRefValue = progressRef.current
    
    return () => {
      if (observerRefValue) {
        observer.observe(observerRefValue)
      }
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // open/close Dialog
  const handleClickOpen = () => {
    setOpenModalAddUser(true);
  };
  const handleCloseModalAddUser = () => {
    setOpenModalAddUser(false);
  };

  // add user
  function onChange(e) {
    const {name,value} = e.target
    setForms({
      ...forms,
      [name]:value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const bodyData = {
      lastName: forms.lastName,
      email: forms.email,
      role: forms.role,
    }
    try {
      await usersApi.addUsers(bodyData);
      setUsers([bodyData, ...users]);
      setOpenModalAddUser(false);
      setForms(formDefault);
    } catch(err) {
      console.log('err', ReferenceError)
    }
  }

  return (
    <div className='users container'>
      <div className="group">
        <h2>User</h2>
        <Button variant="contained" size="small" sx={{ bgcolor: 'secondary.main' }} onClick={handleClickOpen}>
          + ADD
        </Button>
      </div>
        <Dialog open={openModalAddUser} onClose={handleCloseModalAddUser}>
          <DialogTitle>Add user</DialogTitle>
          <DialogContent>
            {/* <DialogContentText></DialogContentText> */}
            <TextField margin="dense" id="" label="Name" type="text" fullWidth variant="standard" name="lastName" value={forms.lastName} onChange={onChange}/>
            <TextField margin="dense" id="" label="Email" type="email" fullWidth variant="standard" name="email" onChange={onChange} value={forms.email}/>
            <TextField margin="dense" id="" label="Role" type="text" fullWidth variant="standard" name="role" onChange={onChange} value={forms.role}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModalAddUser}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell><SvgIcon component={ModeEditIcon} inheritViewBox sx={{ color: 'primary.main' }} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justtifyContent: 'center', marginTop: 2 }} ref={progressRef}>
        <CircularProgress />
      </Box>
    </div>
  );
}
