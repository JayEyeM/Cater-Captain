import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Box, Image } from '@chakra-ui/react';
import { Event, Ingredient, Notes } from '../components/Interfaces';
import './componentStyleSheets/ViewSavedEvents.css';
import EventIngredientList from './EventIngredientList';
import EventMenu from './EventMenu';
import EventNotes from './EventNotes';
// import { OutlineLightGreenButton, SolidLightGreenButton, OutlineLightRedButton } from './Buttons';
import CustomButton from './Buttons';
import { useThemeColors } from './UseThemeColors';
import EventImageSelector from './EventImageSelector';
import { EditIcon, DeleteIcon, ViewIcon, ViewOffIcon, AddIcon } from '@chakra-ui/icons';
import { IngredientsIcon, MenuIcon, NotesIcon } from './ButtonIcons';

interface ViewSavedEventsProps {
  savedEvents: Event[];
  setSavedEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  onEditEvent: (event: Event) => void;
}

const ViewSavedEvents: React.FC<ViewSavedEventsProps> = ({ savedEvents, setSavedEvents, onEditEvent }) => {
  const [visibleIngredients, setVisibleIngredients] = useState<{ [key: number]: boolean }>({});
  const [visibleMenu, setVisibleMenu] = useState<{ [key: number]: boolean }>({});
  const [visibleNotes, setVisibleNotes] = useState<{ [key: number]: boolean }>({});

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

  const toggleNotes = (id: number) => {
    setVisibleNotes(prev => ({
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

  const handleSaveNotes = (eventId: number, newNote: Notes) => {
    setSavedEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event =>
        event.id === eventId ? { ...event, notes: [...(event.notes || []), newNote] } : event
      );
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  };

  const handleDeleteNote = (eventId: number, index: number) => {
    setSavedEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event =>
        event.id === eventId
          ? { ...event, notes: event.notes ? event.notes.filter((_, i) => i !== index) : [] }
          : event
      );
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  };

  const { backgroundColor, textColor, primary } = useThemeColors();

  const [visibleImages, setVisibleImages] = useState<{ [key: number]: boolean }>({});

const toggleImages = (eventId: number) => {
  setVisibleImages(prev => ({
    ...prev,
    [eventId]: !prev[eventId]
  }));
};

  const handleSelectImage = (eventId: number, imageUrl: string) => {
    setSavedEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) =>
        event.id === eventId ? { ...event, imageUrl } : event
      );
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  };
  
  // const [showImages, setShowImages] = useState(false);


  return (
    <div>
      {savedEvents.map((event) => (
        <Card
          key={event.id}
          bg={backgroundColor}
          borderRadius={0}
          color={textColor}
          outline={"2px solid"}
          outlineColor={primary}
          direction={{ base: 'column', sm: 'row' }}
          ml={12}
          mr={12}
          mt={6}
        >
          <CardHeader>
            <Heading size="lg">{event.EventName}</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing={4}>
              <Text>Customer Name: <span className="spansClass">{event.CustomerFirstName} {event.CustomerLastName}</span></Text>
              <Text>Customer Phone Number: <span className="spansClass">{event.CustomerPhoneNumber}</span></Text>
              <Text>Customer Email: <span className="spansClass">{event.CustomerEmail}</span></Text>
              <Text>Event Type: <span className="spansClass">{event.EventType}</span></Text>
              <Text>Number of Guests: <span className="spansClass">{event.NumberOfGuests}</span></Text>
              <Text>Event Date: <span className="spansClass">{event.EventDate}</span></Text>
              <Text>Start Time: <span className="spansClass">{event.StartTime}</span></Text>
              <Text>End Time: <span className="spansClass">{event.EndTime}</span></Text>
              <Text>Venue Name: <span className="spansClass">{event.VenueName}</span></Text>
              <Text>Venue Address: <span className="spansClass">{event.VenueStreetAddress}</span></Text>
              <Text>Venue City: <span className="spansClass">{event.VenueCity}</span></Text>
              <Text>Event ID: <span className="spansClass">{event.id}</span></Text>
            </Stack>
          </CardBody>
          <Box>
            <Image src={event.imageUrl} alt={`${event.EventName} Image`} width="400px" height="400px" mr={16} mt={16} />
          </Box>
          <CardFooter style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box justifyContent={'center'} display={'flex'} flexDirection={'column'}>
          <CustomButton variant="solidGreen" onClick={() => toggleImages(event.id)}>
              {visibleImages[event.id] ? 'Hide Event Images' : 'Choose Event Image'}
            </CustomButton>
            {visibleImages[event.id] && <EventImageSelector onSelectImage={(imageUrl) => handleSelectImage(event.id, imageUrl)} />}
          </Box>
            
            {/* <SolidLightGreenButton onClick={() => toggleIngredientList(event.id)}>
              {visibleIngredients[event.id] ? "Hide Ingredients" : "Show Ingredients"}
            </SolidLightGreenButton> */}
            <CustomButton variant="solidGreen" title="Ingredients" onClick={() => toggleIngredientList(event.id)} rightIcon={<IngredientsIcon />}>
              
              {visibleIngredients[event.id] ? <ViewIcon /> : <ViewOffIcon />}
            </CustomButton>

            {visibleIngredients[event.id] && (
              <EventIngredientList
                ingredients={event.ingredients || []}
                onAddIngredient={(newIngredient) => handleAddIngredient(event.id, newIngredient)}
                onDeleteIngredient={(index) => handleDeleteIngredient(event.id, index)}
                onEditIngredient={(index, updatedIngredient) => handleEditIngredient(event.id, index, updatedIngredient)}
              />
            )}

            {/* <SolidLightGreenButton onClick={() => toggleMenuList(event.id)}>
              {visibleMenu[event.id] ? "Hide Menu" : "Show Menu"}
            </SolidLightGreenButton> */}
            <CustomButton variant="solidGreen" title="Menu" onClick={() => toggleMenuList(event.id)} rightIcon={<MenuIcon />}>
              {visibleMenu[event.id] ? <ViewIcon /> : <ViewOffIcon />}
            </CustomButton>

            {visibleMenu[event.id] && (
              <EventMenu
                menuItems={event.menuItems || []}
                onAddMenuItem={(newMenuItem: string) => handleAddMenuItem(event.id, newMenuItem)}
                onDeleteMenuItem={(index) => handleDeleteMenuItem(event.id, index)}
              />
            )}

            {/* <SolidLightGreenButton onClick={() => toggleNotes(event.id)}>
              {visibleNotes[event.id] ? "Hide Notes" : "Show Notes"}
            </SolidLightGreenButton> */}
            <CustomButton variant="solidGreen" title="Notes" onClick={() => toggleNotes(event.id)} rightIcon={<NotesIcon />}>
              {visibleNotes[event.id] ? <ViewIcon /> : <ViewOffIcon />}
            </CustomButton>

            {visibleNotes[event.id] && (
              <EventNotes
                notes={event.notes || []}
                onAddNote={(newNote: Notes) => handleSaveNotes(event.id, newNote)}
                onDeleteNote={(index) => handleDeleteNote(event.id, index)}
              />
            )}
            {/* <OutlineLightGreenButton onClick={() => handleEditEvent(event)}>Edit</OutlineLightGreenButton> */}
            <CustomButton variant="outlineGreen" onClick={() => handleEditEvent(event)} alt="Edit Event" label="Edit Event" title="Edit Event"><EditIcon /></CustomButton>
            {/* <OutlineLightRedButton onClick={() => handleDelete(event.id)}>Delete</OutlineLightRedButton> */}
            <CustomButton variant="outlineRed" onClick={() => handleDelete(event.id)} alt="Delete Event" label="Delete Event" title="Delete Event"><DeleteIcon /></CustomButton>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ViewSavedEvents;
