
import React, { createContext, useState, useContext, ReactNode } from 'react';

// The interface for the SoundContextType
interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
}

// The SoundContext uses the SoundContextType interface when it is created with react createContext
const SoundContext = createContext<SoundContextType | undefined>(undefined);

// The SoundProvider component provides the SoundContext with the isMuted and toggleMute functions. The children prop is passed to the SoundProvider so that the SoundProvider can render its children.
export const SoundProvider = ({ children }: { children: ReactNode }) => {
  // the muted state is set to true initially and is toggled when the toggleMute function is called
  const [isMuted, setIsMuted] = useState(true);

  // the toggleMute function sets the isMuted state to the opposite of its current value by use of the ! operator
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };
  
  return (
    <SoundContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
};

// The useSound hook returns the isMuted and toggleMute functions from the SoundContext so that they can be used in other components
export const useSound = () => {
  // context is defined to make use of the SoundContext by calling react useContext
  const context = useContext(SoundContext);
  // if context is undefined, throw an error to indicate that useSound must be used within a SoundProvider
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
