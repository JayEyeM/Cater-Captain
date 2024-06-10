import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
// import { OutlineLightBlueButton } from './Buttons';
import CustomButton from '../Buttons';
import { useThemeColors } from '../UseThemeColors';


//props for sort events
interface SortEventsProps {
  onFilterChange: (startDate: string, endDate: string) => void;
}

//sort events component with form for start and end date
const SortEvents: React.FC<SortEventsProps> = ({ onFilterChange }) => {
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);

  //handle date change for start and end date
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "startDate") {
      setSelectedStartDate(value);
    } else if (name === "endDate") {
      setSelectedEndDate(value);
    }
  };

  //handle submit for start and end date
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFilterChange(selectedStartDate ?? '', selectedEndDate ?? '');
  };

  const { secondary, backgroundColor, textColor } = useThemeColors();

  return (
    <Box bg={backgroundColor} p={4} w={"60%"} borderRadius="0" ml={12} mt={2} mb={0} outline={"2px solid"} outlineColor={secondary}>
      <Heading color={textColor} size="lg">Custom Filter Events</Heading>
      <Text color={textColor}>Display events that fall on or between your chosen start and end dates.</Text>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} gap={4}>
          <FormControl id="startDate" flex="1">
            <FormLabel color={textColor}>Start Date</FormLabel>
            <Input
              type="date"
              name="startDate"
              value={selectedStartDate ?? ''}
              onChange={handleDateChange}
              bg={secondary}
              color={backgroundColor}
            />
          </FormControl>

          <FormControl id="endDate" flex="1">
            <FormLabel color={textColor}>End Date</FormLabel>
            <Input
              type="date"
              name="endDate"
              value={selectedEndDate ?? ''}
              onChange={handleDateChange}
              bg={secondary}
              color={backgroundColor}
            />
          </FormControl>
        </Box>
        
        {/* <OutlineLightBlueButton type="submit" mt={4}>Filter Events</OutlineLightBlueButton> */}
        <CustomButton variant="outlineBlue" type="submit" mt={4}>Filter Events</CustomButton>
      </form>
    </Box>
  );
};

export default SortEvents;