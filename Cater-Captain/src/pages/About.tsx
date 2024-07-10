import React from "react";
import SignedOutNavBar from "../components/SignedOutNavBar";
import { useThemeColors } from "../components/UseThemeColors";
import { Box, Heading, Text } from "@chakra-ui/react";
import Footer from "../components/GeneralUtilities/Footer";
import CallToAction from "../components/GeneralUtilities/CallToAction";
import AboutMe from "../components/AboutPageComponents/AboutMe";

const About: React.FC = () => {
    const { backgroundColor, accent, secondary } = useThemeColors();

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
                    About Page
                </Heading>
                
                <AboutMe />
            </Box>
            <Box w={"80%"} mx={"auto"} outline={"2px solid"} outlineColor={accent} display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
            <Text as={"h1"} fontSize="3xl" fontFamily="Cinzel" color={accent} mt={10} mb={0} textAlign={"center"}>
                Uh oh! There are duplicates of the same button below.
            </Text>
            <Text fontSize="2xl"  color={accent} mt={0} mb={0} textAlign={"center"}>
                One may be an easy path to success, while the other a bit more difficult.
            </Text>
            <Text fontWeight={"bold"} fontSize="xl" color={secondary} mt={0} mb={6} textAlign={"center"}>
                Test your luck. The easy path may not always be the most fulfilling 
            </Text>
            <CallToAction headerText="Become a Cater-Captain and Steer Your Business Forward!" buttonText="Get Started" buttonLink="/signup" />
            <CallToAction headerText="Become a Cater-Captain and Steer Your Business Forward!" buttonText="Get Started" buttonLink="/*" />
            </Box>
            <Footer />
        </Box>
    );
};

export default About;
