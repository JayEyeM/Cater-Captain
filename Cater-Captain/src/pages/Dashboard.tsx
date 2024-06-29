// src/pages/Dashboard.tsx
import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import NavBar from '../components/NavBar';
import LocalStorageDisplay from '../components/LocalStorageDisplay';
import { useThemeColors } from '../components/UseThemeColors';
import ShowNeedToOrderItems from '../components/DashboardComponents/showNeedToOrderItems';
import MockDataButton from '../MockData/UseMockData';

const Dashboard: React.FC = () => {
    const { backgroundColor } = useThemeColors();
  return (
    <Box bg={backgroundColor}>
      <NavBar />
      <Box w={"100%"} display={"flex"} justifyContent={"center"} flexDir={"column"} alignItems={"center"} bg={backgroundColor}>
      <Heading as="h1" size="lg" fontFamily={'Cinzel'}>
        Dashboard
      </Heading>
      </Box>
      <ShowNeedToOrderItems />
      <MockDataButton />
      <LocalStorageDisplay />
    </Box>
  );
};

export default Dashboard;
