import React from "react";
import { Box, Text, Link, Divider } from "@chakra-ui/react";
import { useThemeColors } from "../UseThemeColors";


const Footer: React.FC = () => {
    const { backgroundColor, textColor, primary, secondary } = useThemeColors();
    return (
        <Box
            bg={backgroundColor}
            color={textColor}
            w="100%"
            h="200px"
            p={4}
            mt={10}
            display="flex"
            justifyContent="center"
            alignItems="center"
            
        >
            <Box w="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <Divider mb={8} borderWidth={2} borderColor={primary} />
            <Text
        fontSize="md"
        textAlign="center"
    >
        © 2024 JayEye. <Text as={Link} color={secondary} href="https://github.com/JayEyeM" target="_blank" rel="noopener noreferrer">(https://github.com/JayEyeM).</Text>  All rights reserved.
    </Text>
            </Box>
    
        </Box>
    );
};

export default Footer;