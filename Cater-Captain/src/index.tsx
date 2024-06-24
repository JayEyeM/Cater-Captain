// index.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './components/theme';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManageEvents from './pages/ManageEvents';
import Inventory from './pages/Inventory';
import EmployeeManagement from './pages/EmployeeManagement';
import SupplierManagement from './pages/SupplierManagement';
import './index.css';
import { InventoryProvider } from './components/InventoryComponents/InventoryContext';

const App: React.FC = () => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
      <InventoryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/ManageEvents" element={<ManageEvents />} />
              <Route path="/Inventory" element={<Inventory />} />
              <Route path="/EmployeeManagement" element={<EmployeeManagement />} />
              <Route path="/SupplierManagement" element={<SupplierManagement />} />
           
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        </InventoryProvider>
      </ChakraProvider>
    </>
  );
};

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('No root element found');
}
