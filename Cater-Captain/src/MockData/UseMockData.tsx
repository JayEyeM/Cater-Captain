import React from 'react';
import { Button } from '@chakra-ui/react';
import { inventoryItems, suppliers, employees, events } from './MockData';




// Function to store data in localStorage
const storeData = () => {
  localStorage.setItem('inventoryItems', JSON.stringify(inventoryItems));
  localStorage.setItem('suppliers', JSON.stringify(suppliers));
  localStorage.setItem('employees', JSON.stringify(employees));
  localStorage.setItem('events', JSON.stringify(events));

  alert('Mock data has been loaded successfully.');
};

const MockDataButton: React.FC = () => {
  return (
    <Button colorScheme="blue" onClick={storeData}>
      Use Mock Data
    </Button>
  );
};

export default MockDataButton;
