import React from 'react'
import './AppBar.scss'
import '../../index.css'
import avatar from './assets/img.JPG'

// material core
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import LanguageIcon from '@mui/icons-material/Language';
import Badge from '@mui/material/Badge';

// configs
import { SETTING } from '../../configs'

const drawerWidth = SETTING.DRAWER_WIDTH;

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AppBar({open, handleDrawerOpen}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElL, setAnchorElL] = React.useState(null);
  const [anchorElN, setAnchorElN] = React.useState(null);
  const [badge, setBadge] = React.useState(1);



  const  handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuLanguage = (event) => {
    setAnchorElL(event.currentTarget);
  };
  const handleCloseLanguage = () => {
    setAnchorElL(null);
  };
  const handleMenuN = (event) => {
    setAnchorElN(event.currentTarget);
  };
  const handleCloseN = () => {
    setAnchorElN(null);
  };

  const badgeRemove = (event) => {
    setBadge(null)
  }

  function handleLogout() {
    
  }
    return (
      <AppBarStyled position="fixed" open={open} className='appbar'>
        <Toolbar className='j-between'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <div style={{width:'50%'}} className='search-bar j-between'>
            <SearchIcon/>
            <input placeholder='Search...'/>
          </div>

          <div className='j-between'>
            <div className='ava-icon'>
              <IconButton
                className='icon-button'
                size="large"
                
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuLanguage}
              >
                <LanguageIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElL}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElL)}
                onClose={handleCloseLanguage}
                style={{top:'30px', right:'30px'}}
              >
                <MenuItem onClick={handleCloseLanguage}>English</MenuItem>
                <MenuItem onClick={handleCloseLanguage}>French</MenuItem>
                <MenuItem onClick={handleCloseLanguage}>Vietnamese</MenuItem>
                <MenuItem onClick={handleCloseLanguage}>Chinese</MenuItem>
              </Menu>
            </div>

            <div className='ava-icon'>
              <IconButton
                className='icon-button'
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuN}
                style={{padding:'auto -20px'}}
              >
                <Badge badgeContent={badge} color="error" onClick={badgeRemove}>
                  <CircleNotificationsIcon />
                </Badge>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElN}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElN)}
                onClose={handleCloseN}
                style={{top:'30px', right:'30px'}}
              >
                <MenuItem onClick={handleCloseN}>You have a new notification.</MenuItem>
              </Menu>
            </div>

            <div className='ava-icon'>
              <IconButton
                className='icon-button'
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{top:'30px', right:'30px'}}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>

            <div className='avatar'><img src={avatar} alt='' href='/'/></div>
          </div>
        </Toolbar>
      </AppBarStyled>
    )
}