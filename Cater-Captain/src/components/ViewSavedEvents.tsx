import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text } from '@chakra-ui/react';
import { Event } from '../components/Interfaces';

import EventIngredientList from './EventIngredientList';
import { Ingredient } from '../components/Interfaces';
import EventMenu from './EventMenu';
import { OutlineLightGreenButton, SolidLightGreenButton, OutlineLightRedButton } from './Buttons';

//view saved events props

interface ViewSavedEventsProps {
  savedEvents: Event[];
  setSavedEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  onEditEvent: (event: Event) => void;
}

//view saved events component that displays saved events and allows user to edit them and delete them.
const ViewSavedEvents: React.FC<ViewSavedEventsProps> = ({ savedEvents, setSavedEvents, onEditEvent }) => {
  const [visibleIngredients, setVisibleIngredients] = useState<{ [key: number]: boolean }>({});
  const [visibleMenu, setVisibleMenu] = useState<{ [key: number]: boolean }>({});
//use effect for storing events in local storage
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
      setSavedEvents([ ...storedEvents, ...initialSavedEvents]);
  }, [setSavedEvents]);

  //initial saved events data for testing/examples
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

  //delete event function that removes event from saved events
  const handleDelete = (id: number) => {
    const updatedEvents = savedEvents.filter(event => event.id !== id);
    setSavedEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  //edit event function that allows user to edit event details
  const handleEditEvent = (event: Event) => {
    onEditEvent(event);
  };

  //functionlaity for toggling ingredient list
  const toggleIngredientList = (id: number) => {
    setVisibleIngredients(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  //functionlity for toggling menu list
  const toggleMenuList = (id: number) => {
    setVisibleMenu(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  //functionlity for adding ingredient
  const handleAddIngredient = (eventId: number, newIngredient: Ingredient) => {
    setSavedEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event =>
        event.id === eventId ? { ...event, ingredients: [...(event.ingredients || []), newIngredient] } : event
      );
      localStorage.setItem('events', JSON.stringify(updatedEvents)); 
      return updatedEvents;
    });
  };
  
  //functionlity for deleting ingredient
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
  
  //functionlity for editing ingredient (on hand / need to order check boxes)
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

  //functionlity for adding menu item
  const handleAddMenuItem = (eventId: number, newMenuItem: string) => {
    setSavedEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event =>
        event.id === eventId ? { ...event, menuItems: [...(event.menuItems || []), newMenuItem] } : event
      );
      localStorage.setItem('events', JSON.stringify(updatedEvents)); 
      return updatedEvents;
    });
  };


  //functionlity for deleting menu item
  const handleDeleteMenuItem = (eventId: number, index: number) => {
    setSavedEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event =>
        event.id === eventId
          ? { ...event, menuItems: event.menuItems ? event.menuItems.filter((_, i) => i !== index) : [] }
          : event
      );
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
              // updateLocalStorage={updateLocalStorage}
            />
            
            )}
            <SolidLightGreenButton onClick={() => toggleMenuList(event.id)}>
              {visibleMenu[event.id] ? "Hide Menu" : "Show Menu"}
            </SolidLightGreenButton>
            
            {visibleMenu[event.id] && (
              <EventMenu
                menuItems={event.menuItems || []}
                onAddMenuItem={(newMenuItem) => handleAddMenuItem(event.id, newMenuItem)}
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
