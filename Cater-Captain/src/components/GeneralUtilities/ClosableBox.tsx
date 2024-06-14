import React, { useState, ReactNode } from 'react';
import { Box, IconButton, BoxProps } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface ClosableBoxProps extends BoxProps {
  children: ReactNode;
}

const ClosableBox: React.FC<ClosableBoxProps> = ({ children, ...boxProps }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} position="relative" {...boxProps}>
        <IconButton
          icon={<CloseIcon />}
          onClick={handleClose}
          aria-label="Close"
          variant="ghost"
          size="md"
          position="relative"
          float="right"
          m={2}
        />
        {children}
      </Box>
    )
  );
};

export default ClosableBox;
