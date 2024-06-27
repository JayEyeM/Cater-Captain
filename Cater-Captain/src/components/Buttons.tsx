import React from 'react';
import { Button, Tooltip } from '@chakra-ui/react';
import { useThemeColors } from './UseThemeColors';

// Props for the customizable button
interface CustomButtonProps {
  children: React.ReactNode;
  variant: 'solidGreen' | 'outlineGreen' | 'solidRed' | 'outlineRed' | 'solidBlue' | 'outlineBlue';
  [key: string]: any;
  title: string;
}



// CustomButton component
const CustomButton: React.FC<CustomButtonProps> = ({ children, variant, title, ...props }) => {
 

  const { bBackgroundColor, bTextColor } = useThemeColors();

// variant styles
const buttonStyles = {
  solidGreen: {
    bg: bBackgroundColor,
    color: bTextColor,
    _hover: { boxShadow: " 0 0 2px 2px #ADADAD" },
    
  },
  outlineGreen: {
    variant: "outline",
    borderColor: bBackgroundColor,
    color: bBackgroundColor,
    _hover: { boxShadow: "inset 0 0 2px 2px #ADADAD" },
  },
  solidRed: {
    bg: "#D2A4A4",
    color: "#141220",
    _hover: { boxShadow: " 0 0 2px 2px #ADADAD" },
  },
  outlineRed: {
    variant: "outline",
    borderColor: "#D2A4A4",
    color: "#D2A4A4",
    _hover: { boxShadow: "inset 0 0 2px 2px #ADADAD"},
  },
  solidBlue: {
    bg: "#90B4D6",
    color: "#141220",
    _hover: { boxShadow: " 0 0 2px 2px #ADADAD"},
  },
  outlineBlue: {
    variant: "outline",
    borderColor: "#90B4D6",
    color: "#90B4D6",
    _hover: { boxShadow: "inset 0 0 2px 2px #ADADAD"},
  },
};

const styles = buttonStyles[variant];

  return (
    <Tooltip label={title} hasArrow placement='top' bg={bBackgroundColor} fontFamily={"Cinzel"} fontSize={"16px"} fontWeight={"bold"}>
    <Button
      {...styles}
      margin="5px 5px"
      p={"auto"}
      borderRadius={0}
      {...props}
    >
      {children}
    </Button>
    </Tooltip>
  );
};

export default CustomButton;
