import React from 'react';
import NavBar from '../components/NavBar';
import { Heading, Box } from '@chakra-ui/react';

const Home: React.FC = () => {

    return (
    <Box>
            <NavBar />
            <Heading as="h1" size="lg" w="100%" ml={12} fontFamily={'Cinzel'}>Homepage</Heading>

    </Box>

    );
};

export default Home;
