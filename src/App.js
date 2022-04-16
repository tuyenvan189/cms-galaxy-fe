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
import { routesConfig } from './routes/routesConfig';

export default function MiniDrawer() {


  return (
    <BrowserRouter>       
          <Routes>
            {routesConfig.map((route, index) => {
              const Component = route.element;
              const Layout = route.layout || React.Fragment 
              const Guard = route.guard || React.Fragment

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Guard>
                      <Layout>
                        <Component/>
                      </Layout>
                    </Guard>
                  }
                />
              )
            })}
          </Routes>
    </BrowserRouter>
  );
}
