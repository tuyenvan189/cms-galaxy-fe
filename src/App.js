import './App.css';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import AppBar from './components/AppBar';
import NarBar from './components/NarBar/NarBar';
import Dashboard from './pages/Dashboard'
import Product from './pages/Product'
import Kanban from './pages/Kanban';
import User from './pages/User';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { routesConfig } from './pages/routes/routesConfig';

export default function MiniDrawer() {
  // const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar 
          open={open}
          handleDrawerOpen={handleDrawerOpen}  
        />
        <NarBar 
          open={open}
          handleDrawerClose={handleDrawerClose}/>
        
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          
          <Routes>
            {routesConfig.map((route, index) => {
              const Component = route.element;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Component/>}
                />
              )
            })}
          </Routes>
            
        </Box>
      </Box>
    </BrowserRouter>
  );
}
