import React, { useState } from 'react';
import { ChakraProvider, theme, Button } from '@chakra-ui/react';
import CreateEventForm from '../components/CreateEventForm';
import ViewSavedEvents from '../components/ViewSavedEvents';
import { EventForm, Event } from '../components/Interfaces';
import SortEvents from '../components/SortEvents';

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

  const handleFilterChange = (startDate: string, endDate: string) => {
    const filteredEvents = savedEvents.filter(event => {
      const eventDate = new Date(event.EventDate); 
      return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
    });
    
    setSavedEvents(filteredEvents);
  };

  return (
    <ChakraProvider theme={theme}>
      <h1 color='#CBE6AD'>Dashboard</h1>
      <Button variant="outline" colorScheme="green" onClick={() => {
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
      }}>Add New Event</Button>
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
