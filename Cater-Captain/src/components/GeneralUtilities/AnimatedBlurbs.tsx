import React, { useState, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useThemeColors } from "../UseThemeColors";

interface AnimatedBlurbProps {
  title: string;
  text: string;
  index: number;
  isVisible: boolean;
}

const AnimatedBlurb: React.FC<AnimatedBlurbProps> = ({
  title,
  text,
  index,
  isVisible,
}) => {
  const [animationStyle, setAnimationStyle] = useState({});

  useEffect(() => {
    if (isVisible) {
      

      setAnimationStyle({
        opacity: 1,
        transform: "translateX(0)",
        transition: "opacity 0.5s ease, transform 2s ease",
      });
    } else {
      setAnimationStyle({
        opacity: 0,
        transform: `translateX(${index % 2 === 0 ? "-50%" : "50%"})`,
        transition: "opacity 0.5s ease, transform 2s ease",
      });
    }
  }, [index, isVisible]);

  const { accent } = useThemeColors();

  return (
    <Box
      style={{
        ...animationStyle,
        position: "relative",
        left: "0",
        right: "0",
      }}
      p={4}
      mb={6}
      w={{ base: "90%", md: "70%", lg: "60%" }} 
      mx="auto" 
    >
      <Heading as="h2" color={accent} size="lg" mb={2}>
        {title}
      </Heading>
      <Text>{text}</Text>
    </Box>
  );
};

export default AnimatedBlurb;
