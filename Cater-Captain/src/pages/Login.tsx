

import React from 'react';
import LoginComponent from '../components/AuthComponents/LoginComponent';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';
import { useThemeColors } from '../components/UseThemeColors';
import NavBar from '../components/NavBar';
import Footer from '../components/GeneralUtilities/Footer';

const Login: React.FC = () => {
    const { backgroundColor, accent, primary, textColor } = useThemeColors();
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
                    Login
                </Heading>
                <Text color={accent} fontWeight={"bold"} fontSize={{base:"md", md:"lg"}}>
                Demo account credentials: 
                <Text color={primary} fontSize={{base:"md", md:"lg"}}> 
                    Email: <Text as={"span"} color={textColor} fontWeight={"bold"}>demo@catercaptain.com</Text>
                </Text>
                <Text color={primary} fontSize={{base:"md", md:"lg"}}> 
                    Password: <Text as={"span"} color={textColor} fontWeight={"bold"}>democatercaptain</Text>
                </Text>
            </Text>
            <Text mt={4} bg={"darkred"} color={"yellow"} fontWeight={"bold"} fontSize={{base:"md", md:"lg"}} textAlign={"center"} w={{base:"100%", md:"50%"}}>
                    *** For demo purposes, once you log in, you can click the
                    "Use Mock Data" button on the Dashboard page to load the app with mock data.
                    The project currently uses local storage. ***
                    </Text>
        

        <Box w="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <LoginComponent />
            <Box h="50px" />
            
        </Box>

        
    </Flex>
    <Footer />
</Box>
  );
};

export default Login;
