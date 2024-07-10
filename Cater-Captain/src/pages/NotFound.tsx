import { Link } from "react-router-dom";
import { Box, Text, Image, Heading } from "@chakra-ui/react";
import SignedOutNavBar from "../components/SignedOutNavBar";
import { useThemeColors } from "../components/UseThemeColors";
import CustomButton from "../components/Buttons";
import Footer from "../components/GeneralUtilities/Footer";


const CaterCaptainWifeImg = "/OtherContent/a_rugged_white_female_chef (3).jpeg";
export default function NotFound() {
    const { backgroundColor, textColor, accent } = useThemeColors();
    return (
       <Box>
        <SignedOutNavBar />
            <Box bg={backgroundColor}
            color={textColor}
            w="100%"
            p={4}
            
            mx="auto"
            display="flex"
            flexDirection="column"
            alignItems="center">
                
                <Heading as="h1" size="lg" fontFamily={'Cinzel'} mb={6} color={accent}>
                   404 - Page Not Found
                </Heading>

                <Text fontSize="xl" mb={6} color={textColor} w={{ base: "95%", md: "60%"}}>
                    Sorry, we couldn't find the page you were looking for.
                    However, the Cater-Captain's wife has made this lovely bowl of soup for you to warm the soul and provide energy for
                    your journey back, away from the page of the lost.
                </Text>
                <Image src={CaterCaptainWifeImg} alt="CaterCaptainWifeImg" 
                w={{ base: "95%", md: "25%"}} 
                maxW={"400px"}
                />
                <Box w={"100%"} >
                    <Link to="/">
                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} w={"80%"} mx={"auto"}>
                        <Text fontSize="2xl" mb={6} w={"100%"} textAlign={"center"}>
                            Eat your soup, get back on course and continue to Greatness with Cater-Captain!
                        </Text>
                        <CustomButton variant="solidGreen" title="Homepage" alt="Homepage">
                            Homepage
                        </CustomButton>
                    </Box>
                        
                    </Link>
                 </Box>
                 <Footer />
            </Box>
            
       </Box>
       
    );
}