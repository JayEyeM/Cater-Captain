import React from 'react';
import NavBar from '../components/NavBar';
import { Heading, Box } from '@chakra-ui/react';
import WhatAppDoesInfo from '../components/HomepageComponents/WhatAppDoesInfo';
import { useThemeColors } from '../components/UseThemeColors';
import Footer from '../components/GeneralUtilities/Footer';

const Home: React.FC = () => {
    const { backgroundColor } = useThemeColors();

    return (
    <Box bg={backgroundColor} h="auto" w="100%" overflowY={"hidden"} overflowX={"hidden"}>
            <NavBar />
            

            <WhatAppDoesInfo />
            <Box
                w={"100%"}
                h={"100px"}>
            
            </Box>


            <Footer />

    </Box>

    );
};

export default Home;
