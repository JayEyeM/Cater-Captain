import React, { useState, ReactNode, useEffect } from 'react';
import { Box, IconButton, BoxProps } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface ClosableBoxProps extends BoxProps {
  children: ReactNode;
  isOpen?: boolean; 
  onClose: () => void;
}

const ClosableBox: React.FC<ClosableBoxProps> = ({ children, isOpen = true, onClose, ...boxProps }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen); 
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false); 
    onClose();
  };

  if (!isVisible) return null; 

  return (
    <Box borderWidth="1px"  overflow="hidden" p={4} position="relative" {...boxProps}>
      <IconButton
        icon={<CloseIcon />}
        onClick={handleClose}
        aria-label="Close"
        variant="ghost"
        size="md"
        position="absolute"
        top={2}
        right={2}
      />
      {children}
    </Box>
  );
};

export default ClosableBox;
