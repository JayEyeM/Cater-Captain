import React, { useState, useEffect, useRef } from "react";
import { useThemeColors } from "../UseThemeColors";
import { Box, Heading, Text } from "@chakra-ui/react";
import AnimatedBlurb from "../GeneralUtilities/AnimatedBlurbs";

const WhatAppDoesInfo: React.FC = () => {
  const { backgroundColor, secondary, textColor, primary, accent } = useThemeColors();
  
  const blurbs = [
    {
      title: "Efficient Event Planning",
      text:
        "Streamline event management with Cater-Captain's intuitive tools. From adding event details to managing inventory and specialty items, organizing your next event has never been easier.",
    },
    {
      title: "Inventory Mastery",
      text:
        "Simplify inventory management by assigning suppliers and tracking stock levels effortlessly. Cater-Captain helps you stay on top of inventory, ensuring you have what you need when you need it.",
    },
    {
      title: "Supplier Management",
      text:
        "Seamlessly integrate suppliers into your workflow. Easily manage supplier information to enhance operational efficiency.",
    },
    {
      title: "Data at Your Fingertips",
      text:
        "Gain insights with exportable data tables for events, inventory items, suppliers, and more. Cater-Captain empowers you with actionable data to make informed decisions.",
    },
    {
      title: "Employee Management",
      text:
        "Manage employee information with ease. Cater-Captain allows you to add, edit, and display details effectively, assign employees to events, and keep your team organized and connected.",
    },
    {
      title: "Event Tool Kit",
      text:
        "Each event has its own tool kit. Cater-Captain provides a range of tools to help you plan, manage, and track your next event.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(-1);
  const blurbsRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const blurbsSection = document.getElementById("blurbs-section");
      
      if (blurbsSection) {
        const blurbsSectionTop = blurbsSection.offsetTop;
        const blurbsSectionBottom = blurbsSectionTop + blurbsSection.offsetHeight;
        
        const scrollPosition = window.scrollY + windowHeight / 2;
        
        let index = -1;
        
        for (let i = 0; i < blurbs.length; i++) {
          const blurbTop = blurbsRefs.current[i]?.offsetTop || 0;
          const blurbBottom = blurbTop + (blurbsRefs.current[i]?.offsetHeight || 0);
          
          if (scrollPosition >= blurbTop && scrollPosition <= blurbBottom) {
            index = i;
            break;
          }
        }
        
        setActiveIndex(index);
      }
    };
  
    const handleResize = () => {
      // Reset activeIndex to -1 on resize to prevent premature blurb display
      setActiveIndex(-1);
    };
  
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
  
    // Cleanup event listeners
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      id="blurbs-section"
      w="100%"
      h="-130vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      bg={backgroundColor}
      py={10}
    >
      <Heading as="h1" size="lg" color={secondary} fontFamily="Cinzel" mb={6} textAlign="center"
      mt={6} >
        Learn how we help you manage your catering business.
      </Heading>
      <Text as="p" fontFamily="Cinzel"  fontSize="xl" textAlign="center" w={{ base: "90%", md: "60%" }}
      mb={6} mt={6}>
        An all-in-one solution for event, inventory, supplier and employee management.<Text as="span" color={accent}> Keep scrolling to learn more.</Text>
      </Text>

      {blurbs.map((blurb, index) => (
        <Box key={index} ref={(el) => (blurbsRefs.current[index] = el)}>
          <AnimatedBlurb
            title={blurb.title}
            text={blurb.text}
            index={index}
            isVisible={index === activeIndex}
          />
        </Box>
      ))}
    </Box>
  );
};

export default WhatAppDoesInfo;
