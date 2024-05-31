import React, { useState, useEffect } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import CreateEventForm from '../components/CreateEventForm';
import ViewSavedEvents from '../components/ViewSavedEvents';
import { EventForm, Event } from '../components/Interfaces';
import SortEvents from '../components/SortEvents';
import FilterButtons from '../components/FilterButtons';
import { SolidLightGreenButton } from '../components/Buttons';
import NavBar from '../components/NavBar';

//set event form initial values
const Dashboard: React.FC = () => {
  const [isCreateEventFormVisible, setIsCreateEventFormVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventForm>({
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
  });

  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    setFilteredEvents(savedEvents);
  }, [savedEvents]);

  //filter functions
      //current week
  const handleThisWeek = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    const filteredEvents = savedEvents.filter(event => {
      const eventDate = new Date(event.EventDate); 
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    });
    setFilteredEvents(filteredEvents);
  };

  //current month
  const handleThisMonth = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const filteredEvents = savedEvents.filter(event => {
      const eventDate = new Date(event.EventDate); 
      return eventDate >= startOfMonth && eventDate <= endOfMonth;
    });
    setFilteredEvents(filteredEvents);
  };

  //all events
  const handleAllEvents = () => {
    setFilteredEvents(savedEvents);
  };

  //filter change to set filtered events
  const handleFilterChange = (startDate: string, endDate: string) => {
    const filteredEvents = savedEvents.filter(event => {
      const eventDate = new Date(event.EventDate); 
      return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
    });
    setFilteredEvents(filteredEvents);
  };

  return (
    <ChakraProvider theme={theme}>
      <NavBar buttonText="Home" buttonLink="/" />
      <h1 color='#F5F5F5'>Dashboard</h1>
      <SolidLightGreenButton onClick={() => {
        setCurrentEvent({
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
        });
        setIsCreateEventFormVisible(true);
      }}>Add New Event</SolidLightGreenButton>
      <FilterButtons 
  setFilteredEvents={setFilteredEvents} 
  savedEvents={savedEvents}
  handleThisWeek={handleThisWeek}
  handleThisMonth={handleThisMonth}
  handleAllEvents={handleAllEvents}
/>

      <CreateEventForm
        isCreateEventFormVisible={isCreateEventFormVisible}
        setIsCreateEventFormVisible={setIsCreateEventFormVisible}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
        onAddEvent={(event: EventForm) => {
          const existingEventIndex = savedEvents.findIndex(e => e.id === event.id);
          if (existingEventIndex > -1) {
            const updatedEvents = savedEvents.map((e, index) => index === existingEventIndex ? event : e);
            setSavedEvents(updatedEvents);
          } else {
            setSavedEvents([...savedEvents, event]);
          }
        }}
        savedEvents={savedEvents}
      />
      <SortEvents onFilterChange={(startDate, endDate) => handleFilterChange(startDate, endDate)} />
      <ViewSavedEvents
        savedEvents={filteredEvents}
        setSavedEvents={setSavedEvents}
        onEditEvent={(event: Event) => {
          setCurrentEvent(event);
          setIsCreateEventFormVisible(true);
        }}
      />
    </ChakraProvider>
  );
};

export default Dashboard;
