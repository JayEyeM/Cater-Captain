import React, { useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Button } from '@chakra-ui/react';
import { Event } from '../components/Interfaces';
import { generateUniqueId } from './CreateEventForm';

interface ViewSavedEventsProps {
  savedEvents: Event[];
  setSavedEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  onEditEvent: (event: Event) => void;
}

const ViewSavedEvents: React.FC<ViewSavedEventsProps> = ({ savedEvents, setSavedEvents, onEditEvent }) => {
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    if (storedEvents.length === 0) {
      // If no events in localStorage, set savedEvents to initialSavedEvents
      setSavedEvents(initialSavedEvents);
    } else {
      // Otherwise, set savedEvents to events from localStorage
      setSavedEvents(storedEvents);
    }
  }, []);

  const initialSavedEvents: Event[] = [
    // Dummy data to initialize if there are no saved events
    {
      EventName: "Event 1",
      CustomerFirstName: "Customer1FirstName",
      CustomerLastName: "Customer1LastName",
      CustomerPhoneNumber: 1234567890,
      CustomerEmail: "p0n9D@example.com",
      EventType: "Wedding",
      NumberOfGuests: 55,
      EventDate: "2022-01-01",
      StartTime: "16:00",
      EndTime: "19:00",
      VenueName: "Venue 1",
      VenueStreetAddress: "123 Main Street",
      VenueCity: "New York",
      id: generateUniqueId([]),
    },
    {
      EventName: "Event 2",
      CustomerFirstName: "Customer2FirstName",
      CustomerLastName: "Customer2LastName",
      CustomerPhoneNumber: 1234567890,
      CustomerEmail: "p0n9D@example.com",
      EventType: "Wedding",
      NumberOfGuests: 55,
      EventDate: "2022-01-01",
      StartTime: "16:00",
      EndTime: "19:00",
      VenueName: "Venue 2",
      VenueStreetAddress: "123 Main Street",
      VenueCity: "New York",
      id: generateUniqueId([]),
    },
    {
      EventName: "Event 3",
      CustomerFirstName: "Customer3FirstName",
      CustomerLastName: "Customer3LastName",
      CustomerPhoneNumber: 1234567890,
      CustomerEmail: "p0n9D@example.com",
      EventType: "Wedding",
      NumberOfGuests: 55,
      EventDate: "2022-01-01",
      StartTime: "16:00",
      EndTime: "19:00",
      VenueName: "Venue 3",
      VenueStreetAddress: "123 Main Street",
      VenueCity: "New York",
      id: generateUniqueId([]),
    }
  ];

  const handleDelete = (id: number) => {
    const updatedEvents = savedEvents.filter(event => event.id !== id);
    setSavedEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const handleEditEvent = (event: Event) => {
    onEditEvent(event);
  };

  return (
    <div>
      {savedEvents.map((event) => (
        <Card key={event.id}
        direction={{ base: 'column', sm: 'row' }}>
          <CardHeader>
            <Heading size="md">{event.EventName}</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing={4}>
              <Text>{event.CustomerFirstName} {event.CustomerLastName}</Text>
              <Text>{event.CustomerPhoneNumber}</Text>
              <Text>{event.CustomerEmail}</Text>
              <Text>{event.EventType}</Text>
              <Text>{event.NumberOfGuests}</Text>
              <Text>{event.EventDate}</Text>
              <Text>{event.StartTime}</Text>
              <Text>{event.EndTime}</Text>
              <Text>{event.VenueName}</Text>
              <Text>{event.VenueStreetAddress}</Text>
              <Text>{event.VenueCity}</Text>
              <Text>Event ID: {event.id}</Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <Button onClick={() => handleEditEvent(event)}>Edit</Button>
            <Button onClick={() => handleDelete(event.id)}>Delete</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default ViewSavedEvents;
