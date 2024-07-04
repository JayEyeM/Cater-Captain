import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useThemeColors } from "../UseThemeColors";
import CustomButton from "../Buttons";
import { Link } from "react-router-dom";

interface CallToActionProps {
    headerText: string;
    buttonText: string;
    buttonLink: string;
}

const CallToAction: React.FC<CallToActionProps> = ({ headerText, buttonText, buttonLink }) => {
    const { backgroundColor, textColor, primary } = useThemeColors();
    
    return (
        <Box
            bg={backgroundColor}
            color={textColor}
            w="100%"
            h="100px"
            p={4}
            mt={6}
            mb={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
            
        >
            <Text
                fontSize="xl"
                fontFamily="Cinzel"
                textAlign="center"
            >
                <Text fontSize="xl" fontWeight={"bold"} mb={2} color={textColor} >{headerText}</Text>
                
                <Link to={buttonLink}>
                    <CustomButton variant='solidGreen' title={buttonText} alt={buttonText}>
                        {buttonText}
                    </CustomButton>
                </Link>
            </Text>
        </Box>
    );  
};

export default CallToAction;
