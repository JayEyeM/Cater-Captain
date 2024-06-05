import { useColorMode, IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ToggleColorModeButton: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton bg={"141220"} aria-label="Toggle Color Mode" icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode}>
      {colorMode === "light" ? "Dark Mode" : "Light Mode"}
    </IconButton>
  );
};

export default ToggleColorModeButton;
