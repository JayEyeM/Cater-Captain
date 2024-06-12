import { useNavigate } from 'react-router-dom';
import './NavBar.css'; 
import { Box, Heading, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';


import ToggleColorModeButton from './ToggleColorModeButton';
import { useThemeColors } from './UseThemeColors';
import { HamburgerIcon } from '@chakra-ui/icons';







//nav bar component with logo and home button
export default function NavBar() {
    const { backgroundColor, primary } = useThemeColors();

    const navigate = useNavigate();

    const handleNavigation = (link: string) => {
        navigate(link);
    };

    return (
        <Box id="navDiv" display="flex" flexDirection={"row"} alignItems={"center"} w={"100%"} className="nav-container" bg={backgroundColor} >
            <img src='/captainCaterLogoFinal.svg' alt='Cater-Captain Logo' width="120" />
            
            <Heading as="h1" size="3xl" w="100%" textAlign={"center"} fontFamily={'Cinzel'} color={primary} id="navTitle">Cater-Captain</Heading>
            
            <ToggleColorModeButton />
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                />
                <MenuList>
                    <MenuItem onClick={() => handleNavigation('/')}>
                        Home
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigation('/Dashboard')}>
                        Dashboard
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigation('/ManageEvents')}>
                        Manage Events
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigation('/sign-out')}>
                        Sign Out
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
}