import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";

interface SortEventsProps {
  onFilterChange: (startDate: string, endDate: string) => void;
}

const SortEvents: React.FC<SortEventsProps> = ({ onFilterChange }) => {
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "startDate") {
      setSelectedStartDate(value);
    } else if (name === "endDate") {
      setSelectedEndDate(value);
    }
  };

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

        <Button type="submit" color="#CBE6AD" bg="#141220" variant="outline" mt={4}>
          Sort Events
        </Button>
      </form>
    </Box>
  );
};

export default SortEvents;