import React from 'react';
import NavBar from '../components/NavBar';
import { Heading, Box, Flex } from '@chakra-ui/react';
import WhatAppDoesInfo from '../components/HomepageComponents/WhatAppDoesInfo';
import { useThemeColors } from '../components/UseThemeColors';
import Footer from '../components/GeneralUtilities/Footer';
import CallToAction from '../components/GeneralUtilities/CallToAction';

const Home: React.FC = () => {
    const { backgroundColor } = useThemeColors();

    return (
        <Box bg={backgroundColor} w="100%" overflowX="hidden">
            <NavBar />
            <Flex
                w="100%"
                direction="column"
                alignItems="center"
                bg={backgroundColor}
                px={{ base: 4, md: 8 }}
                py={4}
            >
                

                <Box w="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <CallToAction
                        headerText='Ready to be a Cater-Captain?'
                        buttonText='Get Started'
                        buttonLink='/signup'
                    />
                    <WhatAppDoesInfo />
                    <Box h="50px" />
                    <CallToAction
                        headerText='Now that you know what Cater-Captain is and how it can help you, let us get started on our journey together!'
                        buttonText='Sign Up Now'
                        buttonLink='/signup'
                    />
                </Box>

                <Footer />
            </Flex>
        </Box>
    );
};

export default Home;
