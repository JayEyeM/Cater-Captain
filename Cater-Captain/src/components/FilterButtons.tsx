import React from 'react';
import { Stack } from '@chakra-ui/react';
import { Event } from './Interfaces';
import { SolidLightGreenButton } from './Buttons';

//filter events buttons for dashboard

//props for filter buttons
interface FilterButtonsProps {
    setFilteredEvents: React.Dispatch<React.SetStateAction<Event[]>>;
    savedEvents: Event[];
    handleThisWeek: () => void;
    handleThisMonth: () => void;
    handleAllEvents: () => void;
  }
  
  
//filter functions
const FilterButtons: React.FC<FilterButtonsProps> = ({ setFilteredEvents, savedEvents }) => {
//button for current week
  const handleThisWeek = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    handleFilterChange(startOfWeek, endOfWeek);
  };

  //button for current month
  const handleThisMonth = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    handleFilterChange(startOfMonth, endOfMonth);
  };

  //all events
  const handleAllEvents = () => {
    setFilteredEvents(savedEvents);
  };

  //filter change to set filtered events
  const handleFilterChange = (startDate: Date, endDate: Date) => {
    const filteredEvents = savedEvents.filter(event => {
      const eventDate = new Date(event.EventDate);
      return eventDate >= startDate && eventDate <= endDate;
    });
    setFilteredEvents(filteredEvents);
  };

  return (
    <Stack direction="row" spacing={4} mb={4}>
      <SolidLightGreenButton onClick={handleThisWeek}>This Week</SolidLightGreenButton>
      <SolidLightGreenButton onClick={handleThisMonth}>This Month</SolidLightGreenButton>
      <SolidLightGreenButton onClick={handleAllEvents}>All Events</SolidLightGreenButton>
    </Stack>
  );
};

export default FilterButtons;
