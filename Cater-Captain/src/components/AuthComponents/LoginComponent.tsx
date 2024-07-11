

import React, { useState } from 'react';
import { signIn } from '../../auth';
import { Box, FormControl, FormLabel, Input, Text, Heading } from '@chakra-ui/react';
import { Link } from "react-router-dom";

import { useThemeColors } from '../../components/UseThemeColors';
import CustomButton from '../Buttons';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { backgroundColor, textColor, primary, accent } = useThemeColors();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signIn(email, password);
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Login successful!');
    }
  };

  return (
    <Box width="300px" margin="0 auto" mt="50px" bg={backgroundColor}>
        <Heading size="lg" color={textColor} textAlign="center" mb={6}>Welcome Back</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
          outline={ "2px solid"}
          outlineColor={primary}
          color={primary}
          borderRadius={"none"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            outline={ "2px solid"}
            outlineColor={primary}
            color={primary}
            borderRadius={"none"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Link to="/dashboard">
        <CustomButton mt={4} variant='solidGreen' title='Login' alt='Login' type="submit">Login</CustomButton></Link>
        {message && <Text mt={4}>{message}</Text>}
      </form>
      <Box mt={8}>
        <Text fontSize="sm">Don't have an account? <Link to="/signup"><Text as="span" color={accent} fontSize="sm">Sign up here</Text></Link></Text>
      </Box>
      
    </Box>
  );
};

export default Login;
