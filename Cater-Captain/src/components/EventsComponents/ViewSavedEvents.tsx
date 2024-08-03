import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Box, Image, SimpleGrid } from '@chakra-ui/react';
import { Event, Ingredient, Notes, Pricing } from '../Interfaces';
import EventIngredientList from './EventIngredientList';
import EventMenu from './EventMenu';
import EventNotes from './EventNotes';
import EventPricing from './EventPricing';

import CustomButton from '../Buttons';
import { useThemeColors } from '../UseThemeColors';
import EventImageSelector from './EventImageSelector';
import { EditIcon, DeleteIcon, ViewIcon, ViewOffIcon, SettingsIcon} from '@chakra-ui/icons';
import { IngredientsIcon, MenuIcon, NotesIcon, ImageIcon, PriceIcon } from '../ButtonIcons';
import ClosableBox from '../GeneralUtilities/ClosableBox';

interface ViewSavedEventsProps {
  savedEvents: Event[];
  setSavedEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  onEditEvent: (event: Event) => void;
}

const ViewSavedEvents: React.FC<ViewSavedEventsProps> = ({ savedEvents, setSavedEvents, onEditEvent }) => {
  const [visibleIngredients, setVisibleIngredients] = useState<{ [key: number]: boolean }>({});
  const [visibleMenu, setVisibleMenu] = useState<{ [key: number]: boolean }>({});
  const [visibleNotes, setVisibleNotes] = useState<{ [key: number]: boolean }>({});
  const [visiblePricing, setVisiblePricing] = useState<{ [key: number]: boolean }>({});
  const [visibleDetails, setVisibleDetails] = useState<{ [key: number]: boolean }>({});
  const [visibleToolKit, setVisibleToolKit] = useState<{ [key: number]: boolean }>({});
  

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
    const storedEvents = JSON.parse(localStorage.getItem('events') ?? '[]');

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

  const togglePricing = (id: number) => {
    setVisiblePricing(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleDetails = (id: number) => {
    setVisibleDetails(prev => ({
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


  const toggleToolKit = (id: number) => {
    setVisibleToolKit(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleToolKitClose = (id: number) => {
    setVisibleToolKit(prev => ({
      ...prev,
      [id]: false 
    }));
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

  const { backgroundColor, textColor, primary, secondary } = useThemeColors();

  const [visibleImages, setVisibleImages] = useState<{ [key: number]: boolean }>({});

const toggleImages = (eventId: number) => {
  setVisibleImages(prev => ({
    ...prev,
    [eventId]: !prev[eventId]
  }));
};

  const handleSelectImage = (eventId: number, image: { src: string; alt: string; title: string }) => {
    setSavedEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) =>
        event.id === eventId ? { ...event, imageUrl: image.src, imageAlt: image.alt, imageTitle: image.title } : event
      );
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  };
  
  const handleAddPricing = (eventId: number, newPricing: Pricing) => {
    setSavedEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event =>
        event.id === eventId ? { ...event, pricing: [...(event.pricing || []), newPricing] } : event
      );
      updatedEvents.sort((a, b) => b.id - a.id);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  };

  const handleDeletePricing = (eventId: number, index: number) => {
    setSavedEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event => {
        if (event.id === eventId && event.pricing) {
          return {
            ...event,
            pricing: event.pricing.filter((_, i) => i !== index)
          };
        } else {
          return event;
        }
      });
      updatedEvents.sort((a, b) => b.id - a.id);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  };

  const handleEditPricing = (eventId: number, index: number, updatedPricing: Pricing) => {
    setSavedEvents(prevEvents => {
      const updatedEvents = prevEvents.map(event =>
        event.id === eventId
          ? {
              ...event,
              pricing: event.pricing ? event.pricing.map((pricing, i) => (i === index ? updatedPricing : pricing)) : []
              
            }
          : event
      );
      updatedEvents.sort((a, b) => b.id - a.id);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  };
  


  return (
    <Box w={"100%"} pb={12}>
      {savedEvents.map((event) => (
        <Card
          key={event.id}
          bg={backgroundColor}
          borderRadius={0}
          color={secondary}
          outline={"2px solid"}
          outlineColor={primary}
          direction={{ base: 'column', md: 'column' }}
          ml={12}
          mr={12}
          mt={6}
        >
          <CardHeader display={{ base: 'flex', md: 'flex' }} flexDirection={{ base: 'column', md: 'row' }} alignItems={"center"}>
          <Box>
          <Image src={event.imageUrl} alt={event.imageAlt ?? `${event.EventName} Image`} w={{ base: '150px', md: '200px' }}  />
          </Box>
          <Box display={'flex'} flexDirection={'column'} alignItems={{ base: 'center', md: 'flex-start' }} ml={{ base: 0, md: 6 }}>
            <Heading size={{ base: 'lg', md: 'xl' }} color={textColor}>{event.EventName}</Heading>
            <Text mt={6}>Customer Name: <Text as="span" color={textColor}>{event.CustomerFirstName} {event.CustomerLastName}</Text></Text>
            <Text mt={2}>Event Date: <Text as="span" color={textColor}>{event.EventDate}</Text></Text>
          </Box>
          <CustomButton
          variant='outlineGreen'
          title="View More Details"
          alt="View More Details"
          ml={{ base: 0, md: 'auto' }}
          mr={{ base: 0, md: 0 }}
          pl={12}
          pr={12}
          
                  leftIcon={visibleDetails[event.id] ? <ViewIcon /> : <ViewOffIcon />}
                 
                  onClick={() => toggleDetails(event.id)}
                  colorScheme="teal"
          >
            {visibleDetails[event.id] ? 'Hide Details' : 'More Details'}
          </CustomButton>
            
          </CardHeader>
          {visibleDetails[event.id] && (
          <Box w={{ base: '100%', md: '100%' }} m="auto" display={{ base: 'flex', md: 'flex' }} flexDirection={{ base: 'column', md: 'row' }}>
          <CardBody>
          <SimpleGrid columns={{ base: 2, md: 2 }} spacing={{ base: 2, md: 4 }} >
            <Text>Customer Name: <Text as="span" color={textColor}>{event.CustomerFirstName} {event.CustomerLastName}</Text></Text>
            <Text>Customer Phone Number: <Text as="span" color={textColor}>{event.CustomerPhoneNumber}</Text></Text>
            <Text>Customer Email: <Text as="span" color={textColor}>{event.CustomerEmail}</Text></Text>
            <Text>Event Type: <Text as="span" color={textColor}>{event.EventType}</Text></Text>
            <Text>Number of Guests: <Text as="span" color={textColor}>{event.NumberOfGuests}</Text></Text>
            <Text>Event Date: <Text as="span" color={textColor}>{event.EventDate}</Text></Text>
            <Text>Start Time: <Text as="span" color={textColor}>{event.StartTime}</Text></Text>
            <Text>End Time: <Text as="span" color={textColor}>{event.EndTime}</Text></Text>
            <Text>Venue Name: <Text as="span" color={textColor}>{event.VenueName}</Text></Text>
            <Text>Venue Address: <Text as="span" color={textColor}>{event.VenueStreetAddress}</Text></Text>
            <Text>Venue City: <Text as="span" color={textColor}>{event.VenueCity}</Text></Text>
            <Text>Event ID: <Text as="span" color={textColor}>{event.id}</Text></Text>
        </SimpleGrid>
          </CardBody>
          
          <CardFooter display={{ base: 'flex', md: 'flex' }} flexDirection={{ base: 'column', md: 'column' }}>
          
          <CustomButton variant='outlineGreen' title="Tool Kit" alt="Tool Kit"  onClick={() =>{ toggleToolKit(event.id)}}><SettingsIcon /></CustomButton>
          <CustomButton variant="outlineGreen" onClick={() => handleEditEvent(event)} alt="Edit Event" label="Edit Event" title="Edit Event"><EditIcon /></CustomButton>
            
            <CustomButton variant="outlineRed" onClick={() => handleDelete(event.id)} alt="Delete Event" label="Delete Event" title="Delete Event"><DeleteIcon /></CustomButton>
          
          {visibleToolKit[event.id] && (
          <ClosableBox bg={backgroundColor} outline={"2px solid"} outlineColor={primary} p={4} w={{ base: '100%', md: '100%' }} h={"100%"} overflowY={"hidden"} position={"absolute"} top={0} left={0} zIndex={999}
          isOpen={visibleToolKit[event.id]} onClose={() => handleToolKitClose(event.id)}>
          <SimpleGrid columns={{ base: 2, md: 5 }} spacing={{ base: 0, md: 18 }} w={{ base: '100%', md: '90%' }} m="auto" ml={0} mt={{ base: "10%", md: 0 }} >
          <CustomButton variant="solidGreen" title="Choose Event Image" pl={12} pr={12} onClick={() => toggleImages(event.id)} rightIcon={<ImageIcon />}>
                {visibleImages[event.id] ? <ViewIcon /> : <ViewOffIcon />}
              </CustomButton>
              
            
            
            
            <CustomButton variant="solidGreen" title="Ingredients" pl={12} pr={12} onClick={() => toggleIngredientList(event.id)} rightIcon={<IngredientsIcon />}>
              
              {visibleIngredients[event.id] ? <ViewIcon /> : <ViewOffIcon />}
            </CustomButton>

            

            
            <CustomButton variant="solidGreen" title="Menu" pl={12} pr={12} onClick={() => toggleMenuList(event.id)} rightIcon={<MenuIcon />}>
              {visibleMenu[event.id] ? <ViewIcon /> : <ViewOffIcon />}
            </CustomButton>

           

            
            <CustomButton variant="solidGreen" title="Notes" pl={12} pr={12} onClick={() => toggleNotes(event.id)} rightIcon={<NotesIcon />}>
              {visibleNotes[event.id] ? <ViewIcon /> : <ViewOffIcon />}
            </CustomButton>

            <CustomButton variant='solidGreen' title="Pricing" pl={12} pr={12} onClick={() => togglePricing(event.id)} rightIcon={<PriceIcon />}>
              {visiblePricing[event.id] ? <ViewIcon /> : <ViewOffIcon />}
            </CustomButton>

            
            </SimpleGrid>
            <Box bg={backgroundColor}  w={{ base: '100%', md: '100%' }} h={{ base: '100%', md: '90%' }} overflowY={"scroll"} position={"relative"} m={"auto"} zIndex={999}>
            <Text position={"absolute"} color={textColor} mt={16} left={{ base: "0%", md: "30%" }} w={{ base: "100%", md: "40%" }} textAlign={"center"} fontSize={"2xl"}>Click the buttons above to toggle the visibility of the different tools.</Text>
            {visibleImages[event.id] && <EventImageSelector onSelectImage={(image) => handleSelectImage(event.id, { src: image, alt: image, title: image })} />}
            
            
            {visibleIngredients[event.id] && (
             
              <EventIngredientList
                eventId={event.id.toString()}
                ingredients={event.ingredients || []}
                onAddIngredient={(newIngredient) => handleAddIngredient(event.id, newIngredient)}
                onDeleteIngredient={(index) => handleDeleteIngredient(event.id, index)}
                onEditIngredient={(index, updatedIngredient) => handleEditIngredient(event.id, index, updatedIngredient)}
              />
             
            )}
             

            {visibleMenu[event.id] && (
              <EventMenu
                menuItems={event.menuItems || []}
                onAddMenuItem={(newMenuItem: string) => handleAddMenuItem(event.id, newMenuItem)}
                onDeleteMenuItem={(index) => handleDeleteMenuItem(event.id, index)}
              />
            )}

            {visibleNotes[event.id] && (
              <EventNotes
                notes={event.notes || []}
                onAddNote={(newNote: Notes) => handleSaveNotes(event.id, newNote)}
                onDeleteNote={(index) => handleDeleteNote(event.id, index)}
              />
            )}

            {visiblePricing[event.id] && (
              <EventPricing
              eventId={event.id.toString()}
                pricing={event.pricing || []}
                onAddPricing={(newPricing: Pricing) => handleAddPricing(event.id, newPricing)}
                onDeletePricing={(index) => handleDeletePricing(event.id, index)}
                onEditPricing={(index, updatedPricing) => handleEditPricing(event.id, index, updatedPricing)}
              />
            )}
            </Box>
            
            </ClosableBox>
          )}
          </CardFooter>
          </Box>
          )}
        </Card>
      ))}
    </Box>
  );
};

export default ViewSavedEvents;
