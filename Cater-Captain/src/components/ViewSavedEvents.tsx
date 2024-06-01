import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text } from '@chakra-ui/react';
import { Event } from '../components/Interfaces';

import EventIngredientList from './EventIngredientList';
import { Ingredient } from '../components/Interfaces';
import EventMenu from './EventMenu';
import { OutlineLightGreenButton, SolidLightGreenButton, OutlineLightRedButton } from './Buttons';

interface ViewSavedEventsProps {
  savedEvents: Event[];
  setSavedEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  onEditEvent: (event: Event) => void;
}

const ViewSavedEvents: React.FC<ViewSavedEventsProps> = ({ savedEvents, setSavedEvents, onEditEvent }) => {
  const [visibleIngredients, setVisibleIngredients] = useState<{ [key: number]: boolean }>({});
  const [visibleMenu, setVisibleMenu] = useState<{ [key: number]: boolean }>({});

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
      id: 1,
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
      id: 2,
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
      id: 3,
      ingredients: [],
    }
  ];

  useEffect(() => {
    // Retrieve events from local storage
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    
    // Merge initialSavedEvents with storedEvents
    const mergedEvents = [...initialSavedEvents, ...storedEvents];
    
    // Remove duplicates based on event id
    const uniqueEvents = mergedEvents.reduce((acc: Event[], current) => {
      if (!acc.find(event => event.id === current.id)) {
        acc.push(current);
      }
      return acc;
    }, []);
  
    // Sort events by id in descending order
    uniqueEvents.sort((a, b) => b.id - a.id);
    
    // Update state with unique events
    setSavedEvents(uniqueEvents);
  
    // Store unique events in local storage
    localStorage.setItem('events', JSON.stringify(uniqueEvents));
  }, [setSavedEvents]);
  

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

  const toggleMenuList = (id: number) => {
    setVisibleMenu(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddIngredient = (eventId: number, newIngredient: Ingredient) => {
    setSavedEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event =>
        event.id === eventId ? { ...event, ingredients: [...(event.ingredients || []), newIngredient] } : event
      );
      updatedEvents.sort((a, b) => b.id - a.id);
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
      updatedEvents.sort((a, b) => b.id - a.id);
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
      updatedEvents.sort((a, b) => b.id - a.id);
      localStorage.setItem('events', JSON.stringify(updatedEvents)); 
      return updatedEvents;
    });
  };

  const handleAddMenuItem = (eventId: number, newMenuItem: string) => {
    setSavedEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event =>
        event.id === eventId ? { ...event, menuItems: [...(event.menuItems || []), newMenuItem] } : event
      );
      updatedEvents.sort((a, b) => b.id - a.id);
      localStorage.setItem('events', JSON.stringify(updatedEvents)); 
      return updatedEvents;
    });
  };

  const handleDeleteMenuItem = (eventId: number, index: number) => {
    setSavedEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event =>
        event.id === eventId
          ? { ...event, menuItems: event.menuItems ? event.menuItems.filter((_, i) => i !== index) : [] }
          : event
      );
      updatedEvents.sort((a, b) => b.id - a.id);
      localStorage.setItem('events', JSON.stringify(updatedEvents)); 
      return updatedEvents;
    });
  };

  return (
    <div>
      {savedEvents.map((event) => (
        <Card key={event.id} direction={{ base: 'column', sm: 'row' }} backgroundColor={'#141220'} color={'#CBE6AD'} outline={'2px solid #CBE6AD'}>
          <CardHeader>
            <Heading size="lg">{event.EventName}</Heading>
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
          <CardFooter style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <SolidLightGreenButton onClick={() => toggleIngredientList(event.id)}>
              {visibleIngredients[event.id] ? "Hide Ingredients" : "Show Ingredients"}
            </SolidLightGreenButton>
            
            {visibleIngredients[event.id] && (
              <EventIngredientList 
              ingredients={event.ingredients || []}
              onAddIngredient={(newIngredient) => handleAddIngredient(event.id, newIngredient)}
              onDeleteIngredient={(index) => handleDeleteIngredient(event.id, index)}
              onEditIngredient={(index, updatedIngredient) => handleEditIngredient(event.id, index, updatedIngredient)}
            />
            )}
            <SolidLightGreenButton onClick={() => toggleMenuList(event.id)}>
              {visibleMenu[event.id] ? "Hide Menu" : "Show Menu"}
            </SolidLightGreenButton>
            
            {visibleMenu[event.id] && (
              <EventMenu
                menuItems={event.menuItems || []}
                onAddMenuItem={(newMenuItem: string) => handleAddMenuItem(event.id, newMenuItem)}
                onDeleteMenuItem={(index) => handleDeleteMenuItem(event.id, index)}
              />
            )}
            <OutlineLightGreenButton onClick={() => handleEditEvent(event)}>Edit</OutlineLightGreenButton>
            <OutlineLightRedButton onClick={() => handleDelete(event.id)}>Delete</OutlineLightRedButton>
           
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default ViewSavedEvents;
