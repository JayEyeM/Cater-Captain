import React from 'react';

import {  Box, Flex, Heading, Text } from '@chakra-ui/react';

import { useThemeColors } from '../UseThemeColors';

import CallToAction from '../GeneralUtilities/CallToAction';


const DisplayTutorialVideos: React.FC = () => {
    const { backgroundColor, secondary } = useThemeColors();


    return (
        <Box bg={backgroundColor} w="100%" overflowX="hidden">
            <Text fontSize={"2xl"} color={secondary} w="80%" m={"auto"} mt={10} textAlign="center"  > To get the full Cater-Captain learning experience, 
            headphones on and volume up. Go on a journey of discovery. </Text>
            
            <Flex
                w="100%"
                direction="column"
                alignItems="center"
                bg={backgroundColor}
                px={{ base: 4, md: 8 }}
                py={4}
            >
                
                    
               
                <Box w={{ base: '100%', md: '50%' }}
                h={{ base: '280px', md: '400px' }}
                mb={10}
                boxShadow={"0px 0px 3px 3px black"}
                mt={10}
                display="flex" justifyContent="center" flexDirection="column" alignItems="center"
                >
                    <Heading as="h1" color={secondary} size="lg"> Event Management </Heading>
                   <iframe title='Cater-Captain Video' src="https://drive.google.com/file/d/1QyqCF3e0AX5KGb4aAFtgofohmk8JCAL2/preview" width="100%" height={"100%"}  allowFullScreen></iframe>
                </Box>

                               
                <Box w={{ base: '100%', md: '50%' }}
                h={{ base: '280px', md: '400px' }}
                mb={10}
                boxShadow={"0px 0px 3px 3px black"}
                mt={10}
                display="flex" justifyContent="center" flexDirection="column" alignItems="center"
                >
                    <Heading as="h1" color={secondary} size="lg"> Inventory </Heading>
                   <iframe title='Cater-Captain Video' src="https://drive.google.com/file/d/1v9qI--TVlPnO9KZ3WuaF74YnKKVlzPFF/preview" width="100%" height={"100%"}  allowFullScreen></iframe>
                </Box>

                <Box w={{ base: '100%', md: '50%' }}
                h={{ base: '280', md: '400px' }}
                mb={10}
                boxShadow={"0px 0px 3px 3px black"}
                mt={10}
                display="flex" justifyContent="center" flexDirection="column" alignItems="center"
                >
                    <Heading as="h1" color={secondary} size="lg"> Employees & Suppliers </Heading>
                   <iframe title='Cater-Captain Video' src="https://drive.google.com/file/d/19Qi_8p-PC8LoxnpsZdJKNFGpxFuAqE2w/preview" width="100%" height={"100%"}  allowFullScreen></iframe>
                </Box>



                <Box w={{ base: '100%', md: '50%' }}
                h={{ base: '280px', md: '400px' }}
                mb={10}
                boxShadow={"0px 0px 3px 3px black"}
                mt={10}
                display="flex" justifyContent="center" flexDirection="column" alignItems="center"
                >
                    <Heading as="h1" color={secondary} size="lg"> Dashboard </Heading>
                   <iframe title='Cater-Captain Video' src="https://drive.google.com/file/d/1P2AxG4E_OpLNxlgB-CYYNxKvscgkwSFg/preview" width="100%" height={"100%"}  allowFullScreen></iframe>
                </Box>


                <Box w="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                    <CallToAction
                        headerText='You watched the videos and are now a Cater-Captain pro! Time to...'
                        buttonText='Join The Crew!'
                        buttonLink='/signup'
                    />
                </Box>
                
            </Flex>
        </Box>
    );
};

export default DisplayTutorialVideos;
