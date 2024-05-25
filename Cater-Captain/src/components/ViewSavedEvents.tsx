import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Button } from '@chakra-ui/react';
import { Event } from '../components/Interfaces';
import { generateUniqueId } from './CreateEventForm';
import EventIngredientList from './EventIngredientList';
import { Ingredient } from '../components/Interfaces';

interface ViewSavedEventsProps {
  savedEvents: Event[];
  setSavedEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  onEditEvent: (event: Event) => void;
}

const ViewSavedEvents: React.FC<ViewSavedEventsProps> = ({ savedEvents, setSavedEvents, onEditEvent }) => {
  const [visibleIngredients, setVisibleIngredients] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    if (storedEvents.length === 0) {
      setSavedEvents(initialSavedEvents);
    } else {
      setSavedEvents(storedEvents);
    }
  }, [setSavedEvents]);

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
      StartTime: "16:00",
      EndTime: "19:00",
      VenueName: "Venue 1",
      VenueStreetAddress: "123 Main Street",
      VenueCity: "New York",
      id: generateUniqueId([]),
      ingredients: [],
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
      ingredients: [],
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
      ingredients: [],
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

  const toggleIngredientList = (id: number) => {
    setVisibleIngredients(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddIngredient = (eventId: number, newIngredient: Ingredient) => {
    setSavedEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event =>
        event.id === eventId ? { ...event, ingredients: [...(event.ingredients || []), newIngredient] } : event
      );
      localStorage.setItem('events', JSON.stringify(updatedEvents)); 
      return updatedEvents;
    });
  };
  
  
  const handleDeleteIngredient = (eventId: number, index: number) => {
    setSavedEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event =>
        event.id === eventId
          ? { ...event, ingredients: event.ingredients.filter((_, i) => i !== index) }
          : event
      );
      localStorage.setItem('events', JSON.stringify(updatedEvents)); 
      return updatedEvents;
    });
  };
  
  const handleEditIngredient = (eventId: number, index: number, updatedIngredient: Ingredient) => {
    setSavedEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event =>
        event.id === eventId
          ? {
              ...event,
              ingredients: event.ingredients.map((ingredient, i) =>
                i === index ? updatedIngredient : ingredient
              ),
            }
          : event
      );
      localStorage.setItem('events', JSON.stringify(updatedEvents)); 
      return updatedEvents;
    });
  };

 
  

  return (
    <div>
      {savedEvents.map((event) => (
        <Card key={event.id} direction={{ base: 'column', sm: 'row' }}>
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
            <Button colorScheme="green" onClick={() => toggleIngredientList(event.id)}>
              {visibleIngredients[event.id] ? "Hide Ingredients" : "Show Ingredients"}
            </Button>
            {visibleIngredients[event.id] && (
              <EventIngredientList 
              ingredients={event.ingredients || []}
              onAddIngredient={(newIngredient) => handleAddIngredient(event.id, newIngredient)}
              onDeleteIngredient={(index) => handleDeleteIngredient(event.id, index)}
              onEditIngredient={(index, updatedIngredient) => handleEditIngredient(event.id, index, updatedIngredient)}
              // updateLocalStorage={updateLocalStorage}
            />
            
            )}
            <Button onClick={() => handleEditEvent(event)}>Edit</Button>
            <Button onClick={() => handleDelete(event.id)}>Delete</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default ViewSavedEvents;
