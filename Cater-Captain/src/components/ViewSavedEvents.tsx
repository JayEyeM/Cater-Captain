// import React, {useState} from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Button } from '@chakra-ui/react'
import { EventFormValues } from '../components/CreateEventForm';

const ViewSavedEvents: React.FC = () => {
        //get event data from local storage
        const savedEventsJSON = localStorage.getItem('events');
        const savedEvents = savedEventsJSON ? JSON.parse(savedEventsJSON) : [];

        return (
            <Stack spacing={4}>
      {savedEvents.map((event: EventFormValues, index: number) => (
        <Card
        key={index}
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
      >
          <CardHeader>
            <Heading size='md'>{event.eventName}</Heading>
          </CardHeader>

          <CardBody>
            <Text><strong>Venue Name:</strong> {event.venueName}</Text>
            <Text><strong>Location:</strong> {event.location}</Text>
            <Text><strong>Date:</strong> {event.date}</Text>
            <Text><strong>Start Time:</strong> {event.startTime}</Text>
            <Text><strong>End Time:</strong> {event.endTime}</Text>
          </CardBody>

          <CardFooter>
            <Button variant='outline' color='#CBE6AD'>
              Edit Event
            </Button>
            <Button variant='outline' color='#D2A4A4' ml={2}>
              Delete Event
            </Button>
          </CardFooter>
        </Card>
      ))}
    </Stack>
        )
}


export default ViewSavedEvents;