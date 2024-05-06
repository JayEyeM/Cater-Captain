import React, { useState, useEffect } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import CreateEventForm from '../components/CreateEventForm';
import ViewSavedEvents from '../components/ViewSavedEvents';




const Dashboard: React.FC = () => {

const [eventsChanged, setEventsChanged] = useState(false);
useEffect(() => {
    console.log(eventsChanged, "this is eventsChanged");
    
}, [eventsChanged]);

    return (
    <ChakraProvider theme={theme}> 
        <div>
                <h1>Dis' yer Dashboard Page!</h1>
                <p>This is where you gonna get down to bizness!</p>
                <CreateEventForm setEventsChanged={setEventsChanged}/>
                <ViewSavedEvents eventsChanged={eventsChanged}/>
        </div>
    </ChakraProvider>
    );
};

export default Dashboard;