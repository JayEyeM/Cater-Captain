import React from "react";
import { useThemeColors } from "../components/UseThemeColors";
import { Box, Heading } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import EmployeeCards from "../components/EmployeeComponents/EmployeeCards";

const EmployeeManagement: React.FC = () => {
  const { backgroundColor } = useThemeColors();
  return (
    <Box>
      <NavBar />
      <Box w={"100%"} display={"flex"} justifyContent={"center"} flexDir={"column"} alignItems={"center"} bg={backgroundColor}>
        <Heading as="h1" size="lg" fontFamily={'Cinzel'}>
          Employee Management
        </Heading>
      </Box>
      <Box w={"100%"} display={"flex"} justifyContent={"center"} flexDir={"column"} alignItems={"center"} bg={backgroundColor}>
      <EmployeeCards />

      </Box>
    </Box>
  );
};

export default EmployeeManagement;
