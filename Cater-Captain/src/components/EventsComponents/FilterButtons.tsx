import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { Event } from '../Interfaces';
// import { SolidLightBlueButton } from './Buttons';
import CustomButton from '../Buttons';
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
    setFilteredEvents(savedEvents);
  };

  const handleFilterChange = (startDate: string, endDate: string) => {
    const filteredEvents = savedEvents.filter((event) => {
      const eventDate = dayjs(event.EventDate).format('YYYY-MM-DD');
      return eventDate >= startDate && eventDate <= endDate;
    });
    setFilteredEvents(filteredEvents);
  };

  return (
    <SimpleGrid columns={{ base: 2, md: 3 }}
  spacing={0} mt={5} 
  ml={{ base: "auto", md: "auto" }} 
  mr={{ base: "auto", md: "auto" }} 
  w={{base:"auto", md:"auto"}} 
>
     
      <CustomButton variant="solidBlue" title="Past Events" alt="Past Events" onClick={handlePastEvents}>Past Events</CustomButton>
      <CustomButton variant="solidBlue" title="Today" alt="Today" onClick={handleToday}>Today</CustomButton>
      <CustomButton variant="solidBlue" title="This Week" alt="This Week" onClick={handleThisWeek}>This Week</CustomButton>
      <CustomButton variant="solidBlue" title="This Month" alt="This Month" onClick={handleThisMonth}>This Month</CustomButton>
      <CustomButton variant="solidBlue" title="Next Month" alt="Next Month" onClick={handleNextMonth}>Next Month</CustomButton>
      <CustomButton variant="solidBlue" title="All Events" alt="All Events" onClick={handleAllEvents}>All Events</CustomButton>
    </SimpleGrid>
  );
};

export default FilterButtons;