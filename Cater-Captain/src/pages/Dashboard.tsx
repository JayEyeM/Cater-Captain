import { Box, Heading } from "@chakra-ui/react";
import NavBar from "../components/NavBar";


const Dashboard: React.FC = () => {
    return (
        <Box>
            <NavBar />
            <Heading as="h1" size="lg" w="100%" ml={12} fontFamily={'Cinzel'}>Dashboard</Heading>
        </Box>
    );
};

export default Dashboard;