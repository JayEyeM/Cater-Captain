import React from 'react';
import { Stack } from '@chakra-ui/react';
import { Event } from './Interfaces';
import { SolidLightBlueButton } from './Buttons';
import dayjs from 'dayjs';

interface FilterButtonsProps {
  setFilteredEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  savedEvents: Event[];
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ setFilteredEvents, savedEvents }) => {
  const getCurrentDay = () => {
    return dayjs();
  };

  const getCurrentWeek = () => {
    const today = dayjs();
    const startOfWeek = today.startOf('week');
    const endOfWeek = today.endOf('week');
    return {
      start: startOfWeek.format('YYYY-MM-DD'),
      end: endOfWeek.format('YYYY-MM-DD')
    };
  };

  const getCurrentMonth = () => {
    const today = dayjs();
    const startOfMonth = today.startOf('month');
    const endOfMonth = today.endOf('month');
    return {
      start: startOfMonth.format('YYYY-MM-DD'),
      end: endOfMonth.format('YYYY-MM-DD')
    };
  };

  const getNextMonth = () => {
    const today = dayjs();
    const startOfNextMonth = today.add(1, 'month').startOf('month');
    const endOfNextMonth = today.add(1, 'month').endOf('month');
    return {
      start: startOfNextMonth.format('YYYY-MM-DD'),
      end: endOfNextMonth.format('YYYY-MM-DD')
    };
  };

  const handleToday = () => {
    const currentDay = getCurrentDay().format('YYYY-MM-DD');
    handleFilterChange(currentDay, currentDay);
  };

  const handleThisWeek = () => {
    const currentWeek = getCurrentWeek();
    handleFilterChange(currentWeek.start, currentWeek.end);
  };

  const handleThisMonth = () => {
    const currentMonth = getCurrentMonth();
    handleFilterChange(currentMonth.start, currentMonth.end);
  };

  const handleNextMonth = () => {
    const nextMonth = getNextMonth();
    handleFilterChange(nextMonth.start, nextMonth.end);
  };

  //handle all poast events
  const handlePastEvents = () => {
    const currentDay = getCurrentDay().format('YYYY-MM-DD');
    const pastEvents = savedEvents.filter((event) => {
      const eventDate = dayjs(event.EventDate).format('YYYY-MM-DD');
      return eventDate < currentDay;
    });
    setFilteredEvents(pastEvents);
  }

  const handleAllEvents = () => {
    const startOfAllEvents = '1970-01-01';
    const endOfAllEvents = '2038-01-01';
    handleFilterChange(startOfAllEvents, endOfAllEvents);
  };

  const handleFilterChange = (startDate: string, endDate: string) => {
    const filteredEvents = savedEvents.filter((event) => {
      const eventDate = dayjs(event.EventDate).format('YYYY-MM-DD');
      return eventDate >= startDate && eventDate <= endDate;
    });
    setFilteredEvents(filteredEvents);
  };

  return (
    <Stack direction="row" spacing={4} mb={4}>
      <SolidLightBlueButton onClick={handlePastEvents}>Past Events</SolidLightBlueButton>
      <SolidLightBlueButton onClick={handleToday}>Today</SolidLightBlueButton>
      <SolidLightBlueButton onClick={handleThisWeek}>This Week</SolidLightBlueButton>
      <SolidLightBlueButton onClick={handleThisMonth}>This Month</SolidLightBlueButton>
      <SolidLightBlueButton onClick={handleNextMonth}>Next Month</SolidLightBlueButton>
      <SolidLightBlueButton onClick={handleAllEvents}>All Events</SolidLightBlueButton>
    </Stack>
  );
};

export default FilterButtons;