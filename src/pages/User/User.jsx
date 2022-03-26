import '../../App.css';
import React,{useState,useEffect} from 'react'
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
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SvgIcon from '@mui/material/SvgIcon';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import * as usersApi from '../../apis/usersApi'




export default function User() {
  const [users, setUsers] = useState([])

  //fetch Users
  const fetchUsers = async () => {
    const data = await usersApi.fetchUsers();
    setUsers(data.data)
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  // open/close Dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  // add user
  const [forms, setForms] = useState({
    id:'',
    lastName:'',
    email:'',
    role:'',
    // action:''
  })
  function onChange(e) {
    const {name,value} = e.target
    setForms({
      ...forms,
      [name]:value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      id: Date.now().toString(),
      lastName: forms.lastName,
      email: forms.email,
      role: forms.role,
      // action: forms.action
    }
    const res = await fetch(`https://tony-json-server.herokuapp.com/api/users`, {
      method: 'POST',
      headers: { 
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    const data = await res.json()
    setUsers([...users, data.data])
    setOpen(false);
  }

  return (
    <div className='users'>
      <div className="group">
        <h2>User</h2>
        <Button variant="contained" size="small" sx={{ bgcolor: 'secondary.main' }} onClick={handleClickOpen}>
          + ADD
        </Button>
      </div>
        <Dialog open={open} onClose={handleClickClose}>
          <DialogTitle>Add user</DialogTitle>
          <DialogContent>
            {/* <DialogContentText></DialogContentText> */}
            <TextField margin="dense" id="" label="Name" type="text" fullWidth variant="standard" name="lastName" value={forms.lastName} onChange={onChange}/>
            <TextField margin="dense" id="" label="Email" type="email" fullWidth variant="standard" name="email" onChange={onChange} value={forms.email}/>
            <TextField margin="dense" id="" label="Role" type="text" fullWidth variant="standard" name="role" onChange={onChange} value={forms.role}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose}>Cancel</Button>
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
    </div>
  );
}
