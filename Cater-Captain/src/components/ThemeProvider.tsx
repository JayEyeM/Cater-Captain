// ThemeProvider.tsx

import React, { useState, ReactNode } from 'react';
import { ChakraProvider, Button } from '@chakra-ui/react';

import  theme  from './theme';


type ThemeProviderProps = {
  children: ReactNode;
};
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Set default theme to dark

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  console.log('Current theme:', isDarkMode ? 'Dark Theme' : 'Light Theme');

  return (
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        {children}
        <Button onClick={toggleTheme}>Toggle Theme</Button> 
      </ChakraProvider>
    </React.StrictMode>
  );
};

export default ThemeProvider;
