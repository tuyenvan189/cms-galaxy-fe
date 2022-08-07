import './App.css';
import * as React from 'react';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { routesConfig } from './routes/routesConfig';
import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

export default function App() {
  const isLoading = useSelector(state => state.app.isLoading)

  return (
    <>
      <Backdrop 
        sx={{color: '#fff', xIndex: (theme) => 
        theme.zIndex.drawer + 1}}
        open={isLoading}
      >
        <CircularProgress color="primary"/>
      </Backdrop>

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
    </>
  );
}
  