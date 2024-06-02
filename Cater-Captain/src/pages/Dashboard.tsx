import React, { useState, useEffect } from 'react';
import CreateEventForm from '../components/CreateEventForm';
import ViewSavedEvents from '../components/ViewSavedEvents';
import { EventForm, Event } from '../components/Interfaces';
import SortEvents from '../components/SortEvents';
import FilterButtons from '../components/FilterButtons';
import { SolidLightGreenButton } from '../components/Buttons';
import NavBar from '../components/NavBar';
import './pagesStyleSheets/Dashboard.css';

// set event form initial values
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

  // filter change to set filtered events
  const handleFilterChange = (startDate: string, endDate: string) => {
    const filteredEvents = savedEvents.filter(event => {
      const eventDate = new Date(event.EventDate);
      return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
    });
    setFilteredEvents(filteredEvents);
  };

  const handleCreateEvent = () => {
    setIsCreateEventFormVisible(true);
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
    })
  }

  return (
    <div id="dashboardPage">
      <NavBar buttonText="Home" buttonLink="/" />
      <h1>Dashboard</h1>
      <SolidLightGreenButton id="createEventButton" onClick={handleCreateEvent} >Create Event</SolidLightGreenButton>
      <FilterButtons
        setFilteredEvents={setFilteredEvents}
        savedEvents={savedEvents}
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
    </div>
  );
};

export default Dashboard;
