import { useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import CustomButton from './Buttons';
import { useThemeColors } from './UseThemeColors';


const ToggleColorModeButton: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { backgroundColor, primary } = useThemeColors();
  return (
    
    <CustomButton variant='outlineGreen' title={colorMode === "light" ? "Dark Mode" : "Light Mode"}
    alt={colorMode === "light" ? "Dark Mode" : "Light Mode"} onClick={toggleColorMode}
    _hover={{ bg: primary, color: backgroundColor }}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </CustomButton>
  );
};

export default ToggleColorModeButton;
