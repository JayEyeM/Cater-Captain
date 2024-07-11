// src/components/Signup.tsx

import React, { useState } from 'react';
import { signUp } from '../../auth';
import { Box, Heading, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import CustomButton from '../Buttons';
import { useThemeColors } from '../UseThemeColors';


const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { primary, secondary } = useThemeColors();

  const handleSubmit = async (e: React.FormEvent) => {
   
    e.preventDefault();
    const { error } = await signUp(email, password);
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Signup successful!');
    }
  };

  return (
    <Box width="300px" margin="0 auto" mt="50px">
       <Heading as="h1" textAlign={"center"} size="lg" >
          Create an account
        </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
          borderRadius={"none"}
          outline={ "2px solid"}
          color={primary}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
          borderRadius={"none"}
           outline={ "2px solid"}
          color={primary}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <CustomButton mt={4} variant='solidGreen' title='Sign Up' alt='Sign Up' type="submit">Sign Up</CustomButton>
        {message && <Text mt={4}>{message}</Text>}
      </form>
      <Box mt={8} h={"auto"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Text fontSize={"lg"} color={secondary} textAlign={"center"}>
          We are thrilled to have you aboard the Cater-Captain crew! 
          
        </Text>
        
      </Box>
      
    </Box>
  );
};

export default Signup;
