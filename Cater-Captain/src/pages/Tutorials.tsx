import React from "react";
import SignedOutNavBar from "../components/SignedOutNavBar";
import { useThemeColors } from "../components/UseThemeColors";
import { Box, Heading } from "@chakra-ui/react";
import Footer from "../components/GeneralUtilities/Footer";

import DisplayTutorialVideos from "../components/TutorialPageComponents/DisplayTutorialVideos";

const Tutorials: React.FC = () => {
    const { backgroundColor } = useThemeColors();

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
                    Tutorials
                </Heading>
                
                <DisplayTutorialVideos />
            </Box>
            
            
            <Footer />
        </Box>
    );
};

export default Tutorials;
