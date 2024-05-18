// import React, {useState} from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Button } from '@chakra-ui/react'
import { Event } from '../components/Interfaces';
import React, { useState, useEffect } from 'react';
import { generateUniqueId } from './CreateEventForm';

// Initial saved events
let initialSavedEvents = [{
  //Event 1 with values defined in the ViewSavedEvents interface
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
id: generateUniqueId(),
},
{
//Event 2 with values defined in the ViewSavedEvents interface
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
id: generateUniqueId(),
},
{
//Event 3 with values defined in the ViewSavedEvents interface
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
id: generateUniqueId(),
}
];

const ViewSavedEvents: React.FC<{ initialSavedEvents: Event[] }> = ({ initialSavedEvents }) => {
  const [savedEvents, setSavedEvents] = useState<Event[]>(initialSavedEvents);

  return (
    <Card maxW='sm'>
      <CardHeader>
        <Heading size='md'>Saved Events</Heading>
      </CardHeader>
      <CardBody>
        {savedEvents.map((event) => (
          <Stack key={event.id} spacing='4'>
            <Text>Event Name: {event.EventName}</Text>
            <Text>Customer Name: {event.CustomerFirstName} {event.CustomerLastName}</Text>
            <Text>Customer Phone Number: {event.CustomerPhoneNumber}</Text>
            <Text>Customer Email: {event.CustomerEmail}</Text>
            <Text>Event Type: {event.EventType}</Text>
            <Text>Number of Guests: {event.NumberOfGuests}</Text>
            <Text>Event Date: {event.EventDate}</Text>
            <Text>Start Time: {event.StartTime}</Text>
            <Text>End Time: {event.EndTime}</Text>
            <Text>Venue Name: {event.VenueName}</Text>
            <Text>Venue Street Address: {event.VenueStreetAddress}</Text>
            <Text>Venue City: {event.VenueCity}</Text>
            <Text>Event ID: {event.id}</Text>
          </Stack>
        ))}
      </CardBody>
      <CardFooter>
        <Button variant='outline' colorScheme='lightGreen'>Edit</Button>
        <Button variant='outline' colorScheme='red'>Delete</Button>
      </CardFooter>
    </Card>
  );
}
export default ViewSavedEvents;