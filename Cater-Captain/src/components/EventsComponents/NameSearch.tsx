import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Box, Text } from "@chakra-ui/react";
import CustomButton from '../Buttons';
import { useThemeColors } from '../UseThemeColors';
import { Search2Icon } from '@chakra-ui/icons';

interface NameSearchProps {
  onSearch: (firstName: string, lastName: string) => void;
}

const NameSearch: React.FC<NameSearchProps> = ({ onSearch }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleSearch = () => {
    onSearch(firstName.trim(), lastName.trim());
  };

  const { secondary, backgroundColor, textColor } = useThemeColors();

  return (
    <Box bg={backgroundColor} p={4} w={{ base: '90%', md: '60%' }} borderRadius="0" mr={{ base: 0, md: 12 }} mt={2} mb={0} mx={{ base: 'auto', md: 0 }} outline={"2px solid"} outlineColor={secondary}>
      <Text color={textColor}>Display events that match a customer's first and/or last name.</Text><hr />
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <FormControl id="firstName" flex="1">
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </FormControl>
        <FormControl id="lastName" flex="1">
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </FormControl>
        <CustomButton variant='outlineBlue' title="Search" alt="Search" type="submit"> <Search2Icon /> </CustomButton>
      </form>
    </Box>
  );
};

export default NameSearch;
