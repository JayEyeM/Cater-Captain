import React, { useState, useEffect } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import CreateEventForm from '../components/CreateEventForm';
import ViewSavedEvents from '../components/ViewSavedEvents';
import EditEventForm from '../components/EditEvents';
import { EventFormValues } from '../components/CreateEventForm';
import SortEvents from '../components/SortEvents';



const Dashboard: React.FC = () => {
    const [editEvent, setEditEvent] = useState<EventFormValues | null>(null);
const [eventsChanged, setEventsChanged] = useState<boolean>(false);

const handleSaveEvent = (updatedEvent: EventFormValues) => {
    const savedEventsJSON = localStorage.getItem('events');
    const savedEvents: EventFormValues[] = savedEventsJSON ? JSON.parse(savedEventsJSON) : [];
    const index = savedEvents.findIndex((event) => event.eventName === updatedEvent.eventName);

    if (index !== -1) {
        savedEvents[index] = updatedEvent;
        localStorage.setItem('events', JSON.stringify(savedEvents));
        setEventsChanged(true);
    } else {
        console.error('Event not found');
    }
    
}
useEffect(() => {
    console.log(eventsChanged, "this is eventsChanged");
    
}, [eventsChanged]);

    return (
    <ChakraProvider theme={theme}> 
        <div>
                <h1>Dis' yer Dashboard Page!</h1>
                <p>This is where you gonna get down to bizness!</p>
                <CreateEventForm setEventsChanged={setEventsChanged}/>
                <ViewSavedEvents eventsChanged={eventsChanged} setEditEvent={setEditEvent}/>
                {editEvent && <EditEventForm event={editEvent} onSave={handleSaveEvent} />}
        </div>
    </ChakraProvider>
    );
};

export default Dashboard;