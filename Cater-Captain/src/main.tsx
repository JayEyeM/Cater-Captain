import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';

import './index.css'
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/Signup',
    element: <Signup />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/Dashboard',
    element: <Dashboard />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
