import {useState, useEffect} from 'react'
import * as React from 'react';
import * as todosApi from '../../apis/todosApi'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { experimentalStyled } from '@mui/material/styles'; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Item = experimentalStyled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

//=====================================================
export default function Kanban() {
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    const data = await todosApi.fetchTodos();
    setTodos(data.data)
  }
  useEffect(() => {
    fetchTodos()
  }, [])

  // open/close Dialog
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  // add todo
  const [forms, setForms] = useState({
    id:'',
    title:'',
    author:'',
    description:'',
    status:''
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
    const newTodo = {
      id: Date.now().toString(),
      title: forms.title,
      author: forms.author,
      description: forms.description,
      status: 'new',
    }
    const res = await fetch(`https://tony-json-server.herokuapp.com/api/todos`, {
      method: 'POST',
      headers: { 
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
    const data = await res.json()
    setTodos([...todos, data.data])
    setOpen(false);
  }

  // view button
  const [views, setViews] = useState(false)
  const handleClickView = () => {
    setViews(true)
  }
  const handleClose = () => {
    setViews(false)
  }
  

  return (
    <>
      <div className="group">
        <h2>Kanban Board</h2>
        <Button variant="contained" size="small" sx={{ bgcolor: 'secondary.main' }} onClick={handleClickOpen}>
          + ADD TASK
        </Button>
      </div>

      <Dialog open={open} onClose={handleClickClose}>
          <DialogTitle>Add user</DialogTitle>
          <DialogContent>
            {/* <DialogContentText></DialogContentText> */}
            <TextField margin="dense" id="" label="title" type="text" fullWidth variant="standard" name="title" value={forms.title} onChange={onChange}/>
            <TextField margin="dense" id="" label="author" type="text" fullWidth variant="standard" name="author" onChange={onChange} value={forms.author}/>
            <TextField margin="dense" id="" label="description" type="text" fullWidth variant="standard" name="description" onChange={onChange} value={forms.description}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      
      <Card elevation={1} sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{paddingLeft: "20px",paddingRight: "20px", paddingTop: "20px"}}>
          <Grid item xs={4}>
            <Paper sx={{ maxWidth: "100%"}} elevation={1}>
              <Box style={{paddingTop: "20px", paddingLeft: "20px"}} sx={{ bgcolor: 'warning.main', color: 'primary.contrastText', p: 2, borderTopRightRadius: "5px", borderTopLeftRadius: "5px"  }}>
                New
              </Box>
              {todos.map((todo) => (
                <Card elevation={3} style={{margin: "20px"}}>
                  <CardContent>
                    <div key={todo.id}>
                      <p>{todo.title}</p>
                      <Stack spacing={2} direction="row">
                        <Button variant="text">EDIT</Button>
                        <Button variant="text" onClick={handleClickView}>VIEW</Button>
                        <Button disabled>{todo.author}</Button>
                      </Stack>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper sx={{ maxWidth: "100%"}} elevation={1}>
              <Box style={{paddingTop: "20px", paddingLeft: "20px"}} 
                sx={{ bgcolor: 'secondary.main', color: 'primary.contrastText', p: 2, borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}>
                  In Process
              </Box>
              <Card elevation={3} style={{margin: "20px"}}>
                <CardContent>
                  <p>Learn React</p>
                    <Stack spacing={2} direction="row">
                      <Button variant="text">EDIT</Button>
                      <Button variant="text">VIEW</Button>
                      <Button disabled>Tony Nguyen</Button>
                    </Stack>
                </CardContent>
              </Card>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper sx={{ maxWidth: "100%" }} elevation={1}>
              <Box style={{paddingTop: "20px", paddingLeft: "20px"}} sx={{ bgcolor: 'success.main', color: 'primary.contrastText', p: 2, borderTopRightRadius: "5px", borderTopLeftRadius: "5px"  }}>
                Completed
              </Box>
              <Card elevation={3} style={{margin: "20px"}}>
                <CardContent>
                  <p>Learn React</p>
                    <Stack spacing={2} direction="row">
                      <Button variant="text">EDIT</Button>
                      <Button variant="text">VIEW</Button>
                      <Button disabled>Tony Nguyen</Button>
                    </Stack>
                </CardContent>
              </Card>
            </Paper>
          </Grid>

        </Grid>
        <Dialog
        open={views}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Disagree</Button>
          <Button onClick={handleClickClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      </Card>
    </>

  );
}