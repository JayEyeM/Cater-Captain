import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// import App from './App';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import './index.css';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

export const theme = extendTheme({ colors });

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            
              <Route path="/" element={<Home />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Dashboard" element={<Dashboard />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </React.StrictMode>
  );
} else {
  console.error('No root element found');
}