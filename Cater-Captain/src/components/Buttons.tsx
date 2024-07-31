import React from 'react';
import { Button, Tooltip } from '@chakra-ui/react';
import { useThemeColors } from './UseThemeColors';
import { useSound } from './GeneralUtilities/SoundContext';

// Props for the customizable button
interface CustomButtonProps {
  children: React.ReactNode;
  variant: 'solidGreen' | 'outlineGreen' | 'solidRed' | 'outlineRed' | 'solidBlue' | 'outlineBlue';
  [key: string]: any;
  title: string;
}



// CustomButton component
const CustomButton: React.FC<CustomButtonProps> = ({ children, variant, title, ...props }) => {
 

  const { bBackgroundColor, bTextColor, accent, secondary } = useThemeColors();
  const { isMuted } = useSound();

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
    bg: accent,
    color: "#141220",
    _hover: { boxShadow: " 0 0 2px 2px #ADADAD" },
  },
  outlineRed: {
    variant: "outline",
    borderColor: accent,
    color: accent,
    _hover: { boxShadow: "inset 0 0 2px 2px #ADADAD"},
  },
  solidBlue: {
    bg: secondary,
    color: "#141220",
    _hover: { boxShadow: " 0 0 2px 2px #ADADAD"},
  },
  outlineBlue: {
    variant: "outline",
    borderColor: secondary,
    color: secondary,
    _hover: { boxShadow: "inset 0 0 2px 2px #ADADAD"},
  },
};

const styles = buttonStyles[variant];

const handleClick = () => {
  if (!isMuted && typeof children === 'string' && children.trim() !== '') {
    // get file path for pixabayRowingWaveSound1.mp3 from OtherContent folder in the Public folder
    const audio = new Audio('../OtherContent/pixabayRowingWaveSound1.mp3'); 
    audio.play();
  }
  if (props.onClick) {
    props.onClick();
  }
};

  return (
    <Tooltip label={title} hasArrow placement='top' bg={bBackgroundColor} fontFamily={"Cinzel"} fontSize={"16px"} fontWeight={"bold"}>
    <Button
      {...styles}
      margin="5px 5px"
      p={"auto"}
      borderRadius={0}
      {...props}
      onClick={handleClick}
    >
      {children}
    </Button>
    </Tooltip>
  );
};

export default CustomButton;
