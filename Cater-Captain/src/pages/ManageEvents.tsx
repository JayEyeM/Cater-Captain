import React, { useState, useEffect } from 'react';
import CreateEventForm from '../components/EventsComponents/CreateEventForm';
import ViewSavedEvents from '../components/ViewSavedEvents';
import { EventForm, Event } from '../components/Interfaces';
import SortEvents from '../components/EventsComponents/SortEvents';
import FilterButtons from '../components/EventsComponents/FilterButtons';
// import { SolidLightGreenButton } from '../components/Buttons';
import CustomButton from '../components/Buttons';
import NavBar from '../components/NavBar';
import './pagesStyleSheets/Dashboard.css';
import { Box, Heading } from '@chakra-ui/react';
import { useThemeColors } from '../components/UseThemeColors';
import { AddIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import NameSearch from '../components/EventsComponents/NameSearch';


// Initial state for event form
const initialEventFormState: EventForm = {
  EventName: "",
  CustomerFirstName: "",
  CustomerLastName: "",
  CustomerPhoneNumber: 0,
  CustomerEmail: "",
  EventType: "",
  NumberOfGuests: 0,
  EventDate: "",
  StartTime: "",
  EndTime: "",
  VenueName: "",
  VenueStreetAddress: "",
  VenueCity: "",
  id: 0,
  ingredients: [],
};

const ManageEvents: React.FC = () => {
  const [isCreateEventFormVisible, setIsCreateEventFormVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventForm>(initialEventFormState);
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isFilterOptionsVisible, setIsFilterOptionsVisible] = useState(false);

  const toggleFilterOptions = () => {
    setIsFilterOptionsVisible(!isFilterOptionsVisible); // Toggle visibility state
  };

  useEffect(() => {
    setFilteredEvents(savedEvents);
  }, [savedEvents]);

  const handleFilterChange = (startDate: string, endDate: string) => {
    const filteredEvents = savedEvents.filter(event => {
      const eventDate = new Date(event.EventDate);
      return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
    });
    setFilteredEvents(filteredEvents);
  };

  const handleCreateEvent = () => {
    setIsCreateEventFormVisible(true);
    setCurrentEvent(initialEventFormState);
  };

  const handleAddOrUpdateEvent = (event: EventForm) => {
    setSavedEvents(prevEvents => {
      const existingEventIndex = prevEvents.findIndex(e => e.id === event.id);
      if (existingEventIndex > -1) {
        const updatedEvents = prevEvents.map((e, index) =>
          index === existingEventIndex ? { ...e, ...event } : e
        );
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        return updatedEvents;
      } else {
        const newEvent = { ...event, id: prevEvents.length + 1 };
        const updatedEvents = [...prevEvents, newEvent];
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        return updatedEvents;
      }
    });
  };

  const handleEditEvent = (event: Event) => {
    setCurrentEvent(event);
    setIsCreateEventFormVisible(true);
  };

  const { backgroundColor} = useThemeColors();

  const handleNameSearch = (firstName: string, lastName: string) => {
    // Filter events based on first name and last name
    const filteredEvents = savedEvents.filter(event =>
      event.CustomerFirstName.toLowerCase().includes(firstName.toLowerCase().trim()) &&
      event.CustomerLastName.toLowerCase().includes(lastName.toLowerCase().trim())
    );
    setFilteredEvents(filteredEvents);
  };

  return (
    <Box bg={backgroundColor} id="dashboardPage">
      <NavBar />
      <Box w={"100%"} display={"flex"} justifyContent={"center"} flexDir={"column"} alignItems={"center"}>
      
      
      <Heading id="eventsHeading" size="lg" mt={2} fontFamily={"Cinzel"}>Event Management</Heading>
      </Box>
      
      <CustomButton variant="solidGreen" id="createEventButton" title="New Event" alt="New Event" ml={12} mb={0} onClick={handleCreateEvent} leftIcon={<AddIcon />}>
        Event
      </CustomButton>
      <FilterButtons
        setFilteredEvents={setFilteredEvents}
        savedEvents={savedEvents}
      />
      <CreateEventForm
        isCreateEventFormVisible={isCreateEventFormVisible}
        setIsCreateEventFormVisible={setIsCreateEventFormVisible}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
        setSavedEvents={setSavedEvents}
        onAddEvent={handleAddOrUpdateEvent}
        savedEvents={savedEvents}
      />
      <Box id='customFiltering' mt={2} display={"flex"}  flexDir={"column"}>
        <Box id='filteringDropdown' display={"flex"} flexDir={"row"} alignItems={"center"} >
      <Heading id="filterHeading" size="md" ml={12} fontFamily={"Cinzel"} p={2}>More Filtering Options:</Heading>
      <CustomButton variant='outlineBlue' id='customFilteringButton' title="Custom Filtering" alt="Custom Filtering" w="auto" onClick={toggleFilterOptions}>
      {isFilterOptionsVisible ? <ViewIcon /> : <ViewOffIcon />}
      </CustomButton>
      </Box>
      {isFilterOptionsVisible && ( 
          <Box id="filterOptions" display={"flex"}>
            <SortEvents onFilterChange={handleFilterChange} />
            <NameSearch onSearch={handleNameSearch} />
          </Box>
        )}
      </Box>
      <ViewSavedEvents
        savedEvents={filteredEvents}
        setSavedEvents={setSavedEvents}
        onEditEvent={handleEditEvent}
      />
    </Box>
  );
};

export default ManageEvents;
