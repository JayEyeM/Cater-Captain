// src/components/Signout.tsx

import React, { useState } from 'react';
import { signOut } from '../../auth';
import { Box, Text } from '@chakra-ui/react';
import CustomButton from '../Buttons';

const Signout: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSignout = async () => {
    const { error } = await signOut();
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Signed out successfully!');
    }
  };

  return (
    <Box>
      <CustomButton variant="solidRed" title="Sign Out" alt="Sign Out" onClick={handleSignout}>Sign Out</CustomButton>
      {message && <Text mt={4}>{message}</Text>}
    </Box>
  );
};

export default Signout;
