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
  // get isMuted from SoundContext, by calling the useSound hook that has been imported
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


// the handleClick function is called when the button is clicked. This function checks if the button is not muted and the children is not an empty string, and if so, it plays the sound.
const handleClick = () => {
  // if the isMuted is true and the children is not an empty string, and children.trim() is not equal to an empty string, then play the sound.
  if (!isMuted && typeof children === 'string' && children.trim() !== '') {
    // get file path for pixabayRowingWaveSound1.mp3 from OtherContent folder in the Public folder
    const audio = new Audio('../OtherContent/pixabayRowingWaveSound1.mp3'); 
    // the play method plays the audio
    audio.play();
  }
  // if props.onClick is defined, then call it
  if (props.onClick) {
    props.onClick();
  }
};

  return (
    <Tooltip label={title} hasArrow placement='top' bg={bBackgroundColor} fontFamily={"Cinzel"} fontSize={"16px"} fontWeight={"bold"}>
    {/* CustomButton is rendered with the appropriate styles and props. 
    The handleClick function is called when the button is clicked. Which handles 
    playing the sound. The children are also passed as props to the Button component 
    so that it can be rendered inside the Button. */}
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
