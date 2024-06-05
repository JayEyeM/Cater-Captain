import { Link } from 'react-router-dom';
import './NavBar.css'; 
import { Box } from '@chakra-ui/react';
// import { OutlineLightBlueButton } from './Buttons';
// import { OutlineLightRedButton } from './Buttons';
import CustomButton from './Buttons';
import ToggleColorModeButton from './ToggleColorModeButton';
import { useThemeColors } from './UseThemeColors';






//nav bar component with logo and home button
export default function NavBar({ buttonText, buttonLink }: { buttonText: string, buttonLink: string }) {
    const { backgroundColor, } = useThemeColors();
    return (
        <Box id="navDiv" className="nav-container" bg={backgroundColor} >
            <img src='./src/assets/captainCaterLogoFinal.svg' alt='Cater-Captain Logo' width="120" />
            <h1 id="navTitle">Cater-Captain</h1>
            
            <ToggleColorModeButton />
            <Link to={buttonLink}>
                {/* <OutlineLightBlueButton>
                    {buttonText}
                </OutlineLightBlueButton> */}
                <CustomButton variant="outlineBlue" >{buttonText}</CustomButton>
            </Link>
            {/* <OutlineLightRedButton>
                Sign Out 
            </OutlineLightRedButton> */}
            <CustomButton variant="outlineRed" >Sign Out</CustomButton>
        </Box>
    )
}