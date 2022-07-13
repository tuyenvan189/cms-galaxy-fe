import '../../App.css';
import './user.scss'
import React,{useState,useRef, useEffect} from 'react'
// import { useParams } from 'react-router-dom';
// material core
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import SvgIcon from '@mui/material/SvgIcon';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import photo from "./photo.jpg"
// material icon
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// apis
import * as usersApi from '../../apis/usersApi'

export default function User() {
 
  const formDefault = {
    id:'',
    firstName:'',
    lastName:'',
    email:'',
    role:'',
    avatar:''
  }
  const [users, setUsers] = useState([])
  const [openModalAddUser, setOpenModalAddUser] = useState(false);
  const [forms, setForms] = useState({formDefault})
  const [isErrorEmail, ] = useState(false)
  // const {id} = useParams()

  // refs
  const progressRef = useRef(null)

  // fetch Users
  const fetchUsers = async () => {
    try {
      const data = await usersApi.fetchUsers();
      setUsers(data.data)
    } catch(err) {
      console.log('err:',  err)
    }
  }

  function handleLoadMore(entries) {
    console.log('handleLoadMore.........')
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
    
    // const filterEmail = users.email.filter(x => x === forms.email)
    // if (filterEmail) {
    //   setIsErrorEmail(true)
    // }

    const bodyData = {
      id: Date.now().toString(),
      firstName: forms.firstName,
      lastName: forms.lastName,
      email: forms.email,
      role: forms.role,
      avatar: "https://i.pravatar.cc/300",
    }

    
      await usersApi.addUsers(bodyData);
      setUsers([bodyData, ...users]);
      setOpenModalAddUser(false);
      setForms(formDefault);

  }

  async function deleteCard(userId) {
    try {
        const res = await usersApi.deleteUsers(userId);
        const newUsers = users.filter((item) => item.id !== userId);
        console.log('user after res', res)
        console.log('users after deleting: ', newUsers)
        setUsers(newUsers);
    } catch(err) {
        console.log('err', ReferenceError)
    }
  }

  return (
    <div className='users container'>
      <div className="group j-between">
        <h2>User Cards</h2>
      </div>
      <Button onClick={handleClickOpen} className="addButton">+ ADD USER</Button>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item spacing={3}>
            <Card sx={{ maxWidth: 345 }} className="userCard" key={user.id}>
              <CardMedia component="img" alt="image" height="140" src = {photo} />
              <Avatar alt="T" src={user.avatar} sx={{ width: 80, height: 80 }} className="avatarCard"/>
              <CardContent style={{"marginTop":"40px"}}>
                <Typography gutterBottom variant="h6" component="div" sx={{ justifyContent: 'space-between' }}>
                  {user.firstName ? user.fistName : "Harry"} {user.lastName ? user.lastName : "Tran"}
                  <Button size="small" variant="inherit" disabled="disabled">{user.role ? user.role : "DEVELOPER"}</Button>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="success">EDIT</Button>
                <Button size="small" color="success" onClick={() => deleteCard(user.id)}>DELETE</Button>
              </CardActions>
            </Card>
            
          </Grid>
        ))}
      </Grid>
      
      


        <Dialog open={openModalAddUser} onClose={handleCloseModalAddUser}>
          <DialogTitle>Add user</DialogTitle>
          <DialogContent>
            <TextField margin="dense" id="" label="First Name" type="text" fullWidth variant="standard" name="firstName" value={forms.firstName} onChange={onChange}/>
            <TextField margin="dense" id="" label="Last Name" type="text" fullWidth variant="standard" name="lastName" value={forms.lastName} onChange={onChange}/>
            <TextField margin="dense" id="" label="Email" type="email" fullWidth variant="standard" name="email" onChange={onChange} value={forms.email}/>
            {isErrorEmail && <div sx={{color: 'info.main'}}>This email is already in use.</div>}
            <TextField margin="dense" id="" label="Role" type="text" fullWidth variant="standard" name="role" onChange={onChange} value={forms.role}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModalAddUser}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>

      {/* <TableContainer component={Paper}>
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
      </TableContainer> */}

      <Box sx={{ display: 'flex', justtifyContent: 'center', marginTop: 2 }} ref={progressRef}>
        <CircularProgress />
      </Box>
    </div>
  );
}
