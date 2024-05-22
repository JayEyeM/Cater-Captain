import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Button } from '@chakra-ui/react';
import { Event } from '../components/Interfaces';
import { generateUniqueId } from '../components/CreateEventForm';

interface ViewSavedEventsProps {
  savedEvents: Event[];
  setSavedEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  onEditEvent: (event: Event) => void;
}

const ViewSavedEvents: React.FC<ViewSavedEventsProps> = ({ savedEvents, setSavedEvents, onEditEvent }) => {
  const [editedEvent, setEditedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const initialSavedEvents: Event[] = [
      {
        EventName: "Event 1",
        CustomerFirstName: "Customer1FirstName",
        CustomerLastName: "Customer1LastName",
        CustomerPhoneNumber: 1234567890,
        CustomerEmail: "p0n9D@example.com",
        EventType: "Wedding",
        NumberOfGuests: 55,
        EventDate: "2022-01-01",
        StartTime: "4:00pm",
        EndTime: "7:00pm",
        VenueName: "Venue 1",
        VenueStreetAddress: "123 Main Street",
        VenueCity: "New York",
        id: generateUniqueId(savedEvents),
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
        StartTime: "4:00pm",
        EndTime: "7:00pm",
        VenueName: "Venue 2",
        VenueStreetAddress: "123 Main Street",
        VenueCity: "New York",
        id: generateUniqueId(savedEvents),
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
        StartTime: "4:00pm",
        EndTime: "7:00pm",
        VenueName: "Venue 3",
        VenueStreetAddress: "123 Main Street",
        VenueCity: "New York",
        id: generateUniqueId(savedEvents),
      },
      ...savedEvents // Include existing saved events
    ];

    setSavedEvents(initialSavedEvents);
  }, []);

  const handleDelete = (id: number) => {
    const updatedEvents = savedEvents.filter(event => event.id !== id);
    setSavedEvents(updatedEvents);
  };

  const handleEditEvent = (updatedEvent: Event) => {
    const updatedEvents = savedEvents.map((event) => {
      if (event.id === updatedEvent.id) {
        return updatedEvent;
      }
      return event;
    });
    setSavedEvents(updatedEvents);
    onEditEvent(updatedEvent);
    setEditedEvent(updatedEvent);
    editedEvent;
  };

  return (
    <div>
      {savedEvents.map((event) => (
        <Card key={event.id}>
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
