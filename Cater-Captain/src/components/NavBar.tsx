import { useNavigate } from 'react-router-dom';
import './NavBar.css'; 
import { Box, Heading, Menu, MenuButton, MenuList, MenuItem, Image } from '@chakra-ui/react';


import ToggleColorModeButton from './ToggleColorModeButton';
import { useThemeColors } from './UseThemeColors';
import { HamburgerIcon } from '@chakra-ui/icons';
import CustomButton from './Buttons';







//nav bar component with logo and home button
export default function NavBar() {
    const { backgroundColor, primary } = useThemeColors();

    const navigate = useNavigate();

    const handleNavigation = (link: string) => {
        navigate(link);
    };

    return (
        <Box id="navDiv" display="flex" flexDirection={"row"} alignItems={"center"} w={"100%"} pl={12} pr={12} pt={2}  className="nav-container" bg={backgroundColor} >
            <Image src='/captainCaterLogoFinal.svg' alt='Cater-Captain Logo' w={{base:"50px", md:"100px"}} />
            
            <Heading as="h1" size={{base:"lg", md:"3xl"}} w="100%" textAlign={"center"} fontFamily={'Cinzel'} color={primary} id="navTitle">Cater-Captain</Heading>
            
            <ToggleColorModeButton />
            <Menu>
                <CustomButton 
                as={MenuButton}
                variant="outlineGreen" 
                title="Menu"
                alt="Menu"
                _hover={{ bg: primary, color: backgroundColor }}
                
                >
                    <HamburgerIcon w={5} h={5} mx="auto" />
                    
                </CustomButton>


                {/* <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon w={5} h={5}  />}
                    variant="outline"
                    color={primary}
                    borderColor={primary}
                    _hover={{ bg: primary, color: backgroundColor }}
                    borderRadius={0}
                /> */}
                <MenuList bg={backgroundColor} outline={"2px solid"} p={2} outlineColor={primary} borderRadius={0}>
                    <MenuItem bg={backgroundColor} borderRadius={0} onClick={() => handleNavigation('/')}>
                        Home
                    </MenuItem>
                    <MenuItem bg={backgroundColor} borderRadius={0} onClick={() => handleNavigation('/Dashboard')}>
                        Dashboard
                    </MenuItem>
                    <MenuItem bg={backgroundColor} borderRadius={0} onClick={() => handleNavigation('/ManageEvents')}>
                        Event Management
                    </MenuItem>
                    <MenuItem bg={backgroundColor} borderRadius={0} onClick={() => handleNavigation('/Inventory')}>
                        Inventory
                    </MenuItem>
                    <MenuItem bg={backgroundColor} borderRadius={0} onClick={() => handleNavigation('/EmployeeManagement')}>
                        Employee Management
                    </MenuItem>
                    <MenuItem bg={backgroundColor} borderRadius={0} onClick={() => handleNavigation('/SupplierManagement')}>
                        Supplier Management
                    </MenuItem>
                    <MenuItem bg={backgroundColor} borderRadius={0} onClick={() => handleNavigation('/sign-out')}>
                        Sign Out
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
}