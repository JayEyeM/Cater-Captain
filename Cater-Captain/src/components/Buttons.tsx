import React from 'react';
import { Button } from '@chakra-ui/react';


// Props for the customizable button
interface CustomButtonProps {
  children: React.ReactNode;
  variant: 'solidGreen' | 'outlineGreen' | 'solidRed' | 'outlineRed' | 'solidBlue' | 'outlineBlue';
  [key: string]: any;
}

// variant styles
const buttonStyles = {
  solidGreen: {
    bg: "#CBE6AD",
    color: "#141220",
    _hover: { bg: "green.100" },
  },
  outlineGreen: {
    variant: "outline",
    borderColor: "#CBE6AD",
    color: "#CBE6AD",
    _hover: { bg: "green.100", color: "#141220" },
  },
  solidRed: {
    bg: "#D2A4A4",
    color: "#141220",
    _hover: { bg: "red.100" },
  },
  outlineRed: {
    variant: "outline",
    borderColor: "#D2A4A4",
    color: "#D2A4A4",
    _hover: { bg: "red.50" },
  },
  solidBlue: {
    bg: "#90B4D6",
    color: "#141220",
    _hover: { bg: "blue.100" },
  },
  outlineBlue: {
    variant: "outline",
    borderColor: "#90B4D6",
    color: "#90B4D6",
    _hover: { bg: "blue.50" },
  },
};

// CustomButton component
const CustomButton: React.FC<CustomButtonProps> = ({ children, variant, ...props }) => {
  const styles = buttonStyles[variant];

  return (
    <Button
      {...styles}
      margin="5px 5px"
      borderRadius={0}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
