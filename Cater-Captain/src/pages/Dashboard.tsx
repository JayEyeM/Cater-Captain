import React, { useState, useEffect } from 'react';
import CreateEventForm from '../components/CreateEventForm';
import ViewSavedEvents from '../components/ViewSavedEvents';
import { EventForm, Event } from '../components/Interfaces';
import SortEvents from '../components/SortEvents';
import FilterButtons from '../components/FilterButtons';
import { SolidLightGreenButton } from '../components/Buttons';
import NavBar from '../components/NavBar';
import './pagesStyleSheets/Dashboard.css';

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

const Dashboard: React.FC = () => {
  const [isCreateEventFormVisible, setIsCreateEventFormVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<EventForm>(initialEventFormState);
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

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

  return (
    <div id="dashboardPage">
      <NavBar buttonText="Home" buttonLink="/" />
      <h1>Dashboard</h1>
      <SolidLightGreenButton id="createEventButton" onClick={handleCreateEvent}>
        Create Event
      </SolidLightGreenButton>
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
      <SortEvents onFilterChange={handleFilterChange} />
      <ViewSavedEvents
        savedEvents={filteredEvents}
        setSavedEvents={setSavedEvents}
        onEditEvent={handleEditEvent}
      />
    </div>
  );
};

export default Dashboard;
