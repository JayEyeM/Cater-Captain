import { Button, useColorMode } from '@chakra-ui/react';

const ToggleColorModeButton: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      {colorMode === "light" ? "Dark Mode" : "Light Mode"}
    </Button>
  );
};

export default ToggleColorModeButton;
