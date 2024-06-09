import { Link } from 'react-router-dom';
import './NavBar.css'; 
import { Box, Heading } from '@chakra-ui/react';
// import { OutlineLightBlueButton } from './Buttons';
// import { OutlineLightRedButton } from './Buttons';
import CustomButton from './Buttons';
import ToggleColorModeButton from './ToggleColorModeButton';
import { useThemeColors } from './UseThemeColors';






//nav bar component with logo and home button
export default function NavBar({ buttonText, buttonLink }: { buttonText: string, buttonLink: string }) {
    const { backgroundColor, primary } = useThemeColors();
    return (
        <Box id="navDiv" display="flex" flexDirection={"row"} alignItems={"center"} w={"100%"} className="nav-container" bg={backgroundColor} >
            <img src='/captainCaterLogoFinal.svg' alt='Cater-Captain Logo' width="120" />
            
            <Heading as="h1" size="3xl" w="100%" textAlign={"center"} fontFamily={'Cinzel'} color={primary} id="navTitle">Cater-Captain</Heading>
            
            <ToggleColorModeButton />
            <Link to={buttonLink}>
               
                <CustomButton variant="outlineBlue" >{buttonText}</CustomButton>
            </Link>
           
            <CustomButton variant="outlineRed" >Sign Out</CustomButton>
        </Box>
    )
}