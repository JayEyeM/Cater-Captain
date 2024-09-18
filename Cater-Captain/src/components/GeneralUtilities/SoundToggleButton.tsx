// src/components/Navbar.tsx

import React from 'react';
import { useSound } from './SoundContext';
import CustomButton from '../Buttons';
import { MuteIcon, UnmuteIcon } from '../ButtonIcons';

// SoundToggleButton component
const SoundToggleButton: React.FC = () => {
  // get isMuted and toggleMute from SoundContext and pass them to CustomButton
  const { isMuted, toggleMute } = useSound();

  return (
    
      // render CustomButton with appropriate props. When isMuted is true, render UnmuteIcon. When isMuted is false, render MuteIcon.
      <CustomButton variant="outlineGreen" title={isMuted ? 'Unmute Button Sounds' : 'Mute Button Sounds'} onClick={toggleMute}>
        {isMuted ? <UnmuteIcon /> : <MuteIcon />}
      </CustomButton>
    
  );
};

export default SoundToggleButton;
