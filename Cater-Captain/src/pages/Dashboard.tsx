// import React, { useState, useEffect } from 'react';
// import CreateEventForm from '../components/CreateEventForm';
// import ViewSavedEvents from '../components/ViewSavedEvents';
// import { EventForm, Event } from '../components/Interfaces';
// import SortEvents from '../components/SortEvents';
// import FilterButtons from '../components/FilterButtons';
// // import { SolidLightGreenButton } from '../components/Buttons';
// import CustomButton from '../components/Buttons';
// import NavBar from '../components/NavBar';
// import './pagesStyleSheets/Dashboard.css';
// import { Box, Heading } from '@chakra-ui/react';
// import { useThemeColors } from '../components/UseThemeColors';
// import { AddIcon } from '@chakra-ui/icons';


// // Initial state for event form
// const initialEventFormState: EventForm = {
//   EventName: "",
//   CustomerFirstName: "",
//   CustomerLastName: "",
//   CustomerPhoneNumber: 0,
//   CustomerEmail: "",
//   EventType: "",
//   NumberOfGuests: 0,
//   EventDate: "",
//   StartTime: "",
//   EndTime: "",
//   VenueName: "",
//   VenueStreetAddress: "",
//   VenueCity: "",
//   id: 0,
//   ingredients: [],
// };

// const Dashboard: React.FC = () => {
//   const [isCreateEventFormVisible, setIsCreateEventFormVisible] = useState(false);
//   const [currentEvent, setCurrentEvent] = useState<EventForm>(initialEventFormState);
//   const [savedEvents, setSavedEvents] = useState<Event[]>([]);
//   const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

//   useEffect(() => {
//     setFilteredEvents(savedEvents);
//   }, [savedEvents]);

//   const handleFilterChange = (startDate: string, endDate: string) => {
//     const filteredEvents = savedEvents.filter(event => {
//       const eventDate = new Date(event.EventDate);
//       return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
//     });
//     setFilteredEvents(filteredEvents);
//   };

//   const handleCreateEvent = () => {
//     setIsCreateEventFormVisible(true);
//     setCurrentEvent(initialEventFormState);
//   };

//   const handleAddOrUpdateEvent = (event: EventForm) => {
//     setSavedEvents(prevEvents => {
//       const existingEventIndex = prevEvents.findIndex(e => e.id === event.id);
//       if (existingEventIndex > -1) {
//         const updatedEvents = prevEvents.map((e, index) =>
//           index === existingEventIndex ? { ...e, ...event } : e
//         );
//         localStorage.setItem('events', JSON.stringify(updatedEvents));
//         return updatedEvents;
//       } else {
//         const newEvent = { ...event, id: prevEvents.length + 1 };
//         const updatedEvents = [...prevEvents, newEvent];
//         localStorage.setItem('events', JSON.stringify(updatedEvents));
//         return updatedEvents;
//       }
//     });
//   };

//   const handleEditEvent = (event: Event) => {
//     setCurrentEvent(event);
//     setIsCreateEventFormVisible(true);
//   };

//   const { backgroundColor} = useThemeColors();

//   return (
//     <Box bg={backgroundColor} id="dashboardPage">
//       <NavBar buttonText="Home" buttonLink="/" />
//       <Box w={"100%"} display={"flex"} justifyContent={"center"} flexDir={"column"} alignItems={"center"}>
//       <Heading id="dashboardHeading" size="lg" fontFamily={"Cinzel"} >Dashboard</Heading>
      
//       <Heading id="eventsHeading" size="md" mt={2} fontFamily={"Cinzel"}>Events</Heading>
//       </Box>
//       {/* <SolidLightGreenButton id="createEventButton" ml={12} mb={0} onClick={handleCreateEvent}>
//         Create Event
//       </SolidLightGreenButton> */}
//       <CustomButton variant="solidGreen" id="createEventButton" title="New Event" ml={12} mb={0} onClick={handleCreateEvent} leftIcon={<AddIcon />}>
//         Event
//       </CustomButton>
//       <FilterButtons
//         setFilteredEvents={setFilteredEvents}
//         savedEvents={savedEvents}
//       />
//       <CreateEventForm
//         isCreateEventFormVisible={isCreateEventFormVisible}
//         setIsCreateEventFormVisible={setIsCreateEventFormVisible}
//         currentEvent={currentEvent}
//         setCurrentEvent={setCurrentEvent}
//         setSavedEvents={setSavedEvents}
//         onAddEvent={handleAddOrUpdateEvent}
//         savedEvents={savedEvents}
//       />
//       <SortEvents onFilterChange={handleFilterChange} />
//       <ViewSavedEvents
//         savedEvents={filteredEvents}
//         setSavedEvents={setSavedEvents}
//         onEditEvent={handleEditEvent}
//       />
//     </Box>
//   );
// };

// export default Dashboard;
