import React from 'react';

import SignedOutNavBar from '../components/SignedOutNavBar';
import {  Box, Flex } from '@chakra-ui/react';
import WhatAppDoesInfo from '../components/HomepageComponents/WhatAppDoesInfo';
import { useThemeColors } from '../components/UseThemeColors';
import Footer from '../components/GeneralUtilities/Footer';
import CallToAction from '../components/GeneralUtilities/CallToAction';

const Home: React.FC = () => {
    const { backgroundColor } = useThemeColors();

    return (
        <Box bg={backgroundColor} w="100%" overflowX="hidden">
            <SignedOutNavBar />
            <Flex
                w="100%"
                direction="column"
                alignItems="center"
                bg={backgroundColor}
                px={{ base: 4, md: 8 }}
                py={4}
            >
                <Box w={{ base: '100%', md: '50%' }}
                h={{ base: '180px', md: '300px' }}
                mb={10}
                boxShadow={"0px 0px 3px 3px black"}
                mt={10}
                display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                <iframe title='Cater-Captain Video' src="https://drive.google.com/file/d/13AtwecIE_S3RR3Y0i6hyqcF0W1l8eAWS/preview" width="100%" height={"100%"}  allowFullScreen ></iframe>
                </Box>
                <Box w="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <CallToAction
                        headerText='Ready to be a Cater-Captain?'
                        buttonText='Get Started'
                        buttonLink='/signup'
                    />
                    <WhatAppDoesInfo />
                    <Box h="auto" w={"50%"}>
                    <CallToAction
                        headerText='Now that you know what Cater-Captain is and how it can help you, let us get started on our journey together!'
                        buttonText='Sign Up Now'
                        buttonLink='/signup'
                    />
                    </Box>
                </Box>

                <Footer />
            </Flex>
        </Box>
    );
};

export default Home;
