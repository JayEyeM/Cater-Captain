import React, { useState } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import CreateEventForm from '../components/CreateEventForm';
import ViewSavedEvents from '../components/ViewSavedEvents';
import { EventForm, Event } from '../components/Interfaces';

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
  });

  const [savedEvents, setSavedEvents] = useState<Event[]>([]);// State to store saved events
  const [isDarkMode, setIsDarkMode] = useState(true); // Set default theme to dark

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  console.log('Current theme:', isDarkMode ? 'Dark Theme' : 'Light Theme');

  return (
    <ChakraProvider theme={theme}>
      <button type='button' onClick={toggleTheme}>Toggle Theme</button>
      <CreateEventForm
        isCreateEventFormVisible={isCreateEventFormVisible}
        setIsCreateEventFormVisible={setIsCreateEventFormVisible}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
        onAddEvent={
          (event: EventForm) => {
            setSavedEvents([...savedEvents, event]);
          }
        }
      />
      <ViewSavedEvents
        savedEvents={savedEvents}
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