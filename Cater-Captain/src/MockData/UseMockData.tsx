import React from 'react';
import CustomButton from '../components/Buttons';
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
    <CustomButton variant='solidGreen' title='Load Mock Data into the app for testing. Click, then refresh page to view data.' alt='Load Mock Data into the app for testing. Click, then refresh page to view data.' onClick={storeData}>
      Use Mock Data
    </CustomButton>

  );
};

export default MockDataButton;
