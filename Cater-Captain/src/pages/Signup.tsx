

import React from 'react';
import SignupComponent from '../components/AuthComponents/SignupComponent';
import { Box, Heading, Flex, Text } from '@chakra-ui/react';
import { useThemeColors } from '../components/UseThemeColors';
import SignedOutNavBar from '../components/SignedOutNavBar';
import Footer from '../components/GeneralUtilities/Footer';
import CallToAction from '../components/GeneralUtilities/CallToAction';

const Signup: React.FC = () => {
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
            <Heading as="h1" size="lg" fontFamily={'Cinzel'}>
                        Signup
                    </Heading>
                    <Text mt={4} bg={"darkred"} color={"yellow"} fontWeight={"bold"} fontSize={{base:"md", md:"lg"}} textAlign={"center"} w={{base:"100%", md:"50%"}}>
                    ***If you don't want to create an account, you can go to the login page and use the demo account credentials
                    found on the login page.***
                    </Text>
            
    
            <Box w="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                <SignupComponent />
                <Box h="50px" />
                
            </Box>
    
            
        </Flex>
        <CallToAction headerText="Start guiding your business to success!" buttonText="Log In" buttonLink="/login" />
        <Footer />
    </Box>
  );
};

export default Signup;
