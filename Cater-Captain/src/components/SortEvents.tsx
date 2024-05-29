import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { OutlineLightGreenButton } from './Buttons';


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

  return (
    <Box bg="#141220">
      <h1>Sort Events</h1>
      <form onSubmit={handleSubmit}>
        <FormControl id="startDate" color="#CBE6AD">
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            name="startDate"
            value={selectedStartDate ?? ''}
            onChange={handleDateChange}
          />
        </FormControl>

        <FormControl id="endDate" color="#CBE6AD" mt={4}>
          <FormLabel>End Date</FormLabel>
          <Input
            type="date"
            name="endDate"
            value={selectedEndDate ?? ''}
            onChange={handleDateChange}
          />
        </FormControl>
        <OutlineLightGreenButton type="submit" mt={4}> Sort Events </OutlineLightGreenButton>
        
      </form>
    </Box>
  );
};

export default SortEvents;