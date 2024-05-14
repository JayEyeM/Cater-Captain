// import React, {useState} from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Button } from '@chakra-ui/react'
import { EventFormValues } from '../components/CreateEventForm';
import React, { useState, useEffect } from 'react';
import SortEvents from './SortEvents';

//define interface here
interface ViewSavedEventsProps {
  eventsChanged: boolean;
  setEditEvent: (event: EventFormValues | null) => void;
}
//pass in events changed props here

const ViewSavedEvents: React.FC<ViewSavedEventsProps> = ({ eventsChanged, setEditEvent }) => {
        //get event data from local storage
      const [savedEvents, setSavedEvents] = useState<EventFormValues[]>(() => {
        const savedEventsJSON = localStorage.getItem('events');
        return savedEventsJSON ? JSON.parse(savedEventsJSON) : [];
      });

      const [filteredEvents, setFilteredEvents] = useState<EventFormValues[]>(savedEvents);
      

      //useEffect to refetch loacl storage here
      useEffect(() => {
        if (eventsChanged) {
          const savedEventsJSON = localStorage.getItem('events');
          const savedEvents: EventFormValues[] = savedEventsJSON ? JSON.parse(savedEventsJSON) : [];
          setSavedEvents(savedEvents);
          setFilteredEvents(savedEvents);
        }
      }, [eventsChanged]);

      const handleDeleteEvent = (id: string) => {
        const updatedEvents = savedEvents.filter(event => event.id !== id);
        setSavedEvents(updatedEvents);
        setFilteredEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
      }

      const handleEditEvent = (id: string) => {
        const eventToEdit = savedEvents.find(event => event.id === id);
        if (eventToEdit) {
        setEditEvent(eventToEdit);
      }
    }

      const handleFilterChange = (startDate: string, endDate: string) => {
        console.log('startDate:', startDate);
  console.log('endDate:', endDate);
  console.log('savedEvents:', savedEvents);
        let filteredEvents: EventFormValues[] = savedEvents;
      
        if (startDate && endDate) {
          const startDateObj = new Date(startDate);
          const endDateObj = new Date(endDate);
          filteredEvents = savedEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= startDateObj && eventDate <= endDateObj;
          });
        }
      
        setFilteredEvents(filteredEvents);
      };
        

    return (
      <Stack spacing={4}>
        <SortEvents onFilterChange={(startDate, endDate) => handleFilterChange(startDate, endDate)} />
      {filteredEvents.map((event: EventFormValues) => (
        console.log(event.id),
        <Card
        key={event.id}
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
            <Text><strong>id:</strong>{event.id}</Text>
          </CardBody>

          <CardFooter>
            <Button variant='outline' color='#CBE6AD' onClick={() => handleEditEvent(event.id)}>
              Edit Event
            </Button>
            <Button variant='outline' color='#D2A4A4' ml={2} onClick={() => handleDeleteEvent(event.id)}>
              Delete Event
            </Button>
          </CardFooter>
        </Card>
      ))}
    </Stack>
    );
}


export default ViewSavedEvents;