import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useThemeColors } from "../UseThemeColors";


const Footer: React.FC = () => {
    const { backgroundColor, textColor, primary, secondary, accent } = useThemeColors();
    return (
        <Box
            bg={backgroundColor}
            color={textColor}
            w="100%"
            h="auto"
            p={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            outline={"2px solid "}
            outlineColor={primary}
        >
            <Text
                fontSize="sm"
                fontFamily="Cinzel"
                textAlign="center"
            >
                © 2024 CaterCaptain. All rights reserved.
            </Text>
        </Box>
    );
};

export default Footer;