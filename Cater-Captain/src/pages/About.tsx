import React from "react";
import NavBar from "../components/NavBar";
import { useThemeColors } from "../components/UseThemeColors";
import { Box, Heading } from "@chakra-ui/react";
import Footer from "../components/GeneralUtilities/Footer";
import CallToAction from "../components/GeneralUtilities/CallToAction";
import AboutMe from "../components/AboutPageComponents/AboutMe";

const About: React.FC = () => {
    const { backgroundColor } = useThemeColors();

    return (
        <Box bg={backgroundColor}>
            <NavBar />
            
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
                    About Page
                </Heading>
                
                <AboutMe />
            </Box>
            <CallToAction headerText="Become a Cater-Captain and Steer Your Business Forward!" buttonText="Get Started" buttonLink="/signup" />
            <Footer />
        </Box>
    );
};

export default About;
