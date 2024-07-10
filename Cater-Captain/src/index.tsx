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
import About from './pages/About';
import PrivateRoute from './components/AuthComponents/PrivateRoute';
import { AuthProvider } from './components/AuthComponents/AuthContext';
import SignOut from './pages/Signout';
import Tutorials from './pages/Tutorials';

import './index.css';

const App: React.FC = () => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/signout" element={<SignOut />}/>

            <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
            <Route path="/ManageEvents" element={<PrivateRoute element={ManageEvents} />} />
            <Route path="/inventory" element={<PrivateRoute element={Inventory} />} />
            <Route path="/EmployeeManagement" element={<PrivateRoute element={EmployeeManagement} />} />
            <Route path="/SupplierManagement" element={<PrivateRoute element={SupplierManagement} />} />
            
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
};

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
} else {
  console.error('No root element found');
}
