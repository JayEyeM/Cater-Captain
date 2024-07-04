import React from 'react';
import NavBar from '../components/NavBar';
import { Heading, Box } from '@chakra-ui/react';
import WhatAppDoesInfo from '../components/HomepageComponents/WhatAppDoesInfo';
import { useThemeColors } from '../components/UseThemeColors';
import Footer from '../components/GeneralUtilities/Footer';
import CallToAction from '../components/GeneralUtilities/CallToAction';

const Home: React.FC = () => {
    const { backgroundColor } = useThemeColors();

    return (
    <Box bg={backgroundColor} h="auto" w="100%" overflowY={"hidden"} overflowX={"hidden"}>
            <NavBar />
            

            <CallToAction 
            headerText='Ready to be a Cater-Captain?'
            buttonText='Get Started'
            buttonLink='/signup'
            />
            <WhatAppDoesInfo />
            <Box
                w={"100%"}
                h={"50px"}>
            
            </Box>
            <CallToAction 
            headerText='Now that you know what Cater-Captain is and how it can help you, let’s get started on your journey!'
            buttonText='Sign Up Now'
            buttonLink='/signup'
            />

            <Footer />

    </Box>

    );
};

export default Home;
