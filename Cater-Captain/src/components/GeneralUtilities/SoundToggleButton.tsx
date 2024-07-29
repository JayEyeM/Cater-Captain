// src/components/Navbar.tsx

import React from 'react';
import { useSound } from './SoundContext';
import CustomButton from '../Buttons';
import { MuteIcon, UnmuteIcon } from '../ButtonIcons';

const SoundToggleButton: React.FC = () => {
  const { isMuted, toggleMute } = useSound();

  return (
    
      
      <CustomButton variant="outlineGreen" title={isMuted ? 'Unmute Button Sounds' : 'Mute Button Sounds'} onClick={toggleMute}>
        {isMuted ? <UnmuteIcon /> : <MuteIcon />}
      </CustomButton>
    
  );
};

export default SoundToggleButton;
