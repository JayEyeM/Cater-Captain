import React from "react";
import SignedOutNavBar from "../components/SignedOutNavBar";
import { useThemeColors } from "../components/UseThemeColors";
import { Box, Heading, Text, Image } from "@chakra-ui/react";
import Footer from "../components/GeneralUtilities/Footer";
import CallToAction from "../components/GeneralUtilities/CallToAction";


const SignOut: React.FC = () => {
    const { backgroundColor } = useThemeColors();
    const signOutImg = "/OtherContent/chefOnBoatSaluting.jpeg";

    return (
        <Box bg={backgroundColor}>
            <SignedOutNavBar />
            
            <Box
                w={"100%"}
                mb={6}
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
                alignItems={"center"}
                bg={backgroundColor}
            >
                <Heading as="h1" size="lg" fontFamily="Cinzel">
                    Signed out.
                </Heading>
                <Image mt={10} src={signOutImg} alt="CaterCaptainImg" w={{ base: "80%", md: "40%" }} />
                <Text fontSize="lg" textAlign={"center"} fontFamily="Cinzel" w={{ base: "80%", md: "40%" }} mt={5} mb={40}>
                    Thank you for using Cater-Captain. See you soon!
                </Text>
                
                
            </Box>
            <CallToAction headerText="Become a Cater-Captain and Steer Your Business Forward!" buttonText="Get Started" buttonLink="/signup" />
            <Footer />
        </Box>
    );
};

export default SignOut;
