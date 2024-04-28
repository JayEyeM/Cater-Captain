import React from 'react';

  import { ChakraProvider, theme } from '@chakra-ui/react';
  import CreateEventForm from '../components/CreateEventForm';

  

const Dashboard: React.FC = () => {

    return (
    <ChakraProvider theme={theme}> 
        <div>
                <h1>Dis' yer Dashboard Page!</h1>
                <p>This is where you gonna get down to bizness!</p>
                <CreateEventForm />
        </div>
    </ChakraProvider>
    );
};

export default Dashboard;