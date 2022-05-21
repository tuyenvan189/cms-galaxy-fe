import './App.css';
import * as React from 'react';

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
  