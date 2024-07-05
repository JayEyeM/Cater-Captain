import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import NavBar from '../components/NavBar';
import LocalStorageDisplay from '../components/LocalStorageDisplay';
import { useThemeColors } from '../components/UseThemeColors';
import ShowNeedToOrderItems from '../components/DashboardComponents/showNeedToOrderItems';
import MockDataButton from '../MockData/UseMockData';
import ShowUpcomingEvents from '../components/DashboardComponents/ShowUpcomingEvents';
import AboutMe from '../components/AboutPageComponents/AboutMe';

const Dashboard: React.FC = () => {
    const { backgroundColor } = useThemeColors();

    return (
        <Box bg={backgroundColor}>
            <NavBar />
            <Box
                w={"100%"}
                mb={6}
                display={"flex"}
                justifyContent={"center"}
                flexDir={"column"}
                alignItems={"center"}
                bg={backgroundColor}
            >
                <Heading as="h1" size="lg" fontFamily={'Cinzel'}>
                    Dashboard
                </Heading>
            </Box>

            


            <Box
                w={"100%"}
                mb={6}
                display={"flex"}
                justifyContent={"center"}
                flexDir={"column"}
                alignItems={"center"}
                bg={backgroundColor}
            >
                <MockDataButton />
            </Box>

            <ShowUpcomingEvents />
            <ShowNeedToOrderItems />
            <LocalStorageDisplay />
        </Box>
    );
};

export default Dashboard;
