import React, { useState, useEffect } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import CreateEventForm from '../components/CreateEventForm';
import ViewSavedEvents from '../components/ViewSavedEvents';
import EditEventForm from '../components/EditEvents';
import generateUniqueId from '../components/CreateEventForm';



//create dashboard component
const Dashboard: React.FC = () => {
    const [isCreateEventFormVisible, setIsCreateEventFormVisible] = useState(false);
    const [isViewSavedEventsFormVisible, setIsViewSavedEventsFormVisible] = useState(false);
    const [isEditEventFormVisible, setIsEditEventFormVisible] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<EventForm>({
        EventName: "",
        CustomerFirstName: "",
        CustomerLastName: "",
        CustomerPhoneNumber: 0,
        CustomerEmail: "",
        EventType: "",
        NumberOfGuests: 0,
        EventDate: "",
        StartTime: "",
        EndTime: "",
        VenueName: "",
        VenueStreetAddress: "",
        VenueCity: "",
        id: generateUniqueId(),
    });
    const [initialSavedEvents, setInitialSavedEvents] = useState<Event[]>([]);
    const [savedEvents, setSavedEvents] = useState<Event[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(true); // Set default theme to dark

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    console.log('Current theme:', isDarkMode ? 'Dark Theme' : 'Light Theme');

    return (
        <ChakraProvider theme={theme}>
            <button onClick={toggleTheme}>Toggle Theme</button>
            <CreateEventForm
                isCreateEventFormVisible={isCreateEventFormVisible}
                setIsCreateEventFormVisible={setIsCreateEventFormVisible}
                initialSavedEvents={initialSavedEvents}
                setInitialSavedEvents={setInitialSavedEvents}
                savedEvents={savedEvents}
                setSavedEvents={setSavedEvents}
                currentEvent={currentEvent}
                setCurrentEvent={setCurrentEvent}
            />
            <ViewSavedEvents
                isViewSavedEventsFormVisible={isViewSavedEventsFormVisible}
                setIsViewSavedEventsFormVisible={setIsViewSavedEventsFormVisible}
                initialSavedEvents={initialSavedEvents}
                setInitialSavedEvents={setInitialSavedEvents}
                savedEvents={savedEvents}
                setSavedEvents={setSavedEvents}
                currentEvent={currentEvent}
                setCurrentEvent={setCurrentEvent}
            />
            <EditEventForm
                isEditEventFormVisible={isEditEventFormVisible}
                setIsEditEventFormVisible={setIsEditEventFormVisible}
                initialSavedEvents={initialSavedEvents}
                setInitialSavedEvents={setInitialSavedEvents}
                savedEvents={savedEvents}
                setSavedEvents={setSavedEvents}
                currentEvent={currentEvent}
                setCurrentEvent={setCurrentEvent}
            />
        </ChakraProvider>
    );
};



export default Dashboard;