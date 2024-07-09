

import React from 'react';
import SignupComponent from '../components/AuthComponents/SignupComponent';
import { Box, Heading, Flex } from '@chakra-ui/react';
import { useThemeColors } from '../components/UseThemeColors';
import NavBar from '../components/NavBar';
import Footer from '../components/GeneralUtilities/Footer';
import CallToAction from '../components/GeneralUtilities/CallToAction';

const Signup: React.FC = () => {
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
            <Heading as="h1" size="lg" fontFamily={'Cinzel'}>
                        Signup
                    </Heading>
            
    
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
