import React from 'react';
import { Button, Stack } from '@chakra-ui/react';
import { Event } from './Interfaces';

interface FilterButtonsProps {
    setFilteredEvents: React.Dispatch<React.SetStateAction<Event[]>>;
    savedEvents: Event[];
    handleThisWeek: () => void;
    handleThisMonth: () => void;
    handleAllEvents: () => void;
  }
  
  

const FilterButtons: React.FC<FilterButtonsProps> = ({ setFilteredEvents, savedEvents }) => {
  const handleThisWeek = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    handleFilterChange(startOfWeek, endOfWeek);
  };

  const handleThisMonth = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    handleFilterChange(startOfMonth, endOfMonth);
  };

  const handleAllEvents = () => {
    setFilteredEvents(savedEvents);
  };

  const handleFilterChange = (startDate: Date, endDate: Date) => {
    const filteredEvents = savedEvents.filter(event => {
      const eventDate = new Date(event.EventDate);
      return eventDate >= startDate && eventDate <= endDate;
    });
    setFilteredEvents(filteredEvents);
  };

  return (
    <Stack direction="row" spacing={4} mb={4}>
      <Button colorScheme="blue" onClick={handleThisWeek}>This Week</Button>
      <Button colorScheme="blue" onClick={handleThisMonth}>This Month</Button>
      <Button colorScheme="blue" onClick={handleAllEvents}>All Events</Button>
    </Stack>
  );
};

export default FilterButtons;
