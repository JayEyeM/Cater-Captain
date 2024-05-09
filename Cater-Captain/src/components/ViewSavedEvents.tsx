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
      const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
      const [selectedYear, setSelectedYear] = useState<string | null>(null);

      //useEffect to refetch loacl storage here
      useEffect(() => {
        savedEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        handleFilterChange(selectedMonth, selectedYear);
      }, [selectedMonth, selectedYear, eventsChanged]);

      const handleDeleteEvent = (index: number) => {
        const updatedEvents = savedEvents.filter((_, i) => i !== index);
        setSavedEvents(updatedEvents);
        setFilteredEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
      }

      const handleEditEvent = (index: number) => {
        const eventToEdit = savedEvents[index];
        setEditEvent(eventToEdit);
      }

      const handleFilterChange = (month: string | null, year: string | null) => {
        let filteredEvents: EventFormValues[] = savedEvents;
    
        if (month && year) {
          filteredEvents = savedEvents.filter(event => {
            const eventDate = new Date(event.date);
            const eventMonth = eventDate.getMonth() + 1;
            const eventYear = eventDate.getFullYear();
            return eventMonth === parseInt(month) && eventYear === parseInt(year);
          });
        }
    
        setFilteredEvents(filteredEvents);
      }
        

    return (
      <Stack spacing={4}>
        <SortEvents onFilterChange={handleFilterChange} />
      {filteredEvents.map((event: EventFormValues, index: number) => (
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
            <Button variant='outline' color='#CBE6AD' onClick={() => handleEditEvent(index)}>
              Edit Event
            </Button>
            <Button variant='outline' color='#D2A4A4' ml={2} onClick={() => handleDeleteEvent(index)}>
              Delete Event
            </Button>
          </CardFooter>
        </Card>
      ))}
    </Stack>
    );
}


export default ViewSavedEvents;