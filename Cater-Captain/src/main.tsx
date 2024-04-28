import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react'

import App from './App';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';

import './index.css'
import Dashboard from './pages/Dashboard';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

export const theme = extendTheme({ colors });

const rootElement = document.getElementById('root');
if (rootElement) {
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
}else {
  console.error('No root element found');
}

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

