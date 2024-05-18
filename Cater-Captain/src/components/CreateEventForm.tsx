import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  
} from "@chakra-ui/react";
import { EventForm } from './Interfaces';
import ViewSavedEvents from './ViewSavedEvents';

//Get max event array length +1
const generateUniqueId = () => {
  const maxId = Math.max(...ViewSavedEvents.savedEvents.map((event) => event.id));
  return maxId + 1;
};

//Create Event Form
const CreateEventForm: React.FC = () => {
  const [event, setEvent] = useState<EventForm>({
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

  return (
    <Box bg={"#141220"} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', zIndex: 1000, boxShadow: '0 5px 26px #CBE6AD', borderRadius: '4px'}}>
      <h1>Create Event Form</h1>
      <form>
        <FormControl color="#CBE6AD">
          <FormLabel>Event Name</FormLabel>
          <Input
            type="text"
            value={event.EventName}
            onChange={(event) =>
              setEvent((prevEvent) => ({
                ...prevEvent,
                EventName: event.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Customer First Name</FormLabel>
          <Input
            type="text"
            value={event.CustomerFirstName}
            onChange={(event) =>
              setEvent((prevEvent) => ({
                ...prevEvent,
                CustomerFirstName: event.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Customer Last Name</FormLabel>
          <Input
            type="text" 
            value={event.CustomerLastName}
            onChange={(event) =>
             setEvent((prevEvent) => ({
               ...prevEvent,
               CustomerLastName: event.target.value,
             }))
            }
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Customer Phone Number</FormLabel>
          <Input
            type="number"
            value={event.CustomerPhoneNumber}
            onChange={(event) =>
              setEvent((prevEvent) => ({
                ...prevEvent,
                CustomerPhoneNumber: parseInt(event.target.value),
              }))
            }
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Customer Email</FormLabel>
          <Input
            type="text"
            value={event.CustomerEmail}
            onChange={(event) =>  
              setEvent((prevEvent) => ({
                ...prevEvent,
                CustomerEmail: event.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Event Type</FormLabel>
          <Input
            type="text"
            value={event.EventType}
            onChange={(event) =>
             setEvent((prevEvent) => ({
               ...prevEvent,
               EventType: event.target.value,
             }))
            }
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Number of Guests</FormLabel>
          <Input
            type="number"
            value={event.NumberOfGuests}
            onChange={(event) =>
             setEvent((prevEvent) => ({
               ...prevEvent,
               NumberOfGuests: parseInt(event.target.value),
             }))
            }
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Event Date</FormLabel>
          <Input
            type="date"
            value={event.EventDate}
            onChange={(event) =>
              setEvent((prevEvent) => ({
                ...prevEvent,
                EventDate: event.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Start Time</FormLabel> 
          <Input
            type="time"
            value={event.StartTime}
            onChange={(event) =>
              setEvent((prevEvent) => ({
                ...prevEvent,
                StartTime: event.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>End Time</FormLabel>
          <Input
            type="time"
            value={event.EndTime}
            onChange={(event) =>
              setEvent((prevEvent) => ({
                ...prevEvent,
                EndTime: event.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Venue Name</FormLabel> 
          <Input
            type="text"
            value={event.VenueName}
            onChange={(event) =>
              setEvent((prevEvent) => ({
                ...prevEvent,
                VenueName: event.target.value,
              }))
            }
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Venue Street Address</FormLabel>
          <Input
            type="text" 
            value={event.VenueStreetAddress}
            onChange={(event) =>
              setEvent((prevEvent) => ({
                ...prevEvent,
                VenueStreetAddress: event.target.value,
              }))  
            } 
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Venue City</FormLabel>
          <Input
            type="text"
            value={event.VenueCity}
            onChange={(event) =>
              setEvent((prevEvent) => ({
                ...prevEvent,
                VenueCity: event.target.value,
              }))
            }
          />
        </FormControl>

        <Button type="submit" colorScheme="lightGreen" variant="outline" mt={4} onClick={handleSave}>
          Save
        </Button>
        <Button type="submit" colorScheme="Red" variant="outline" mt={4} onClick={handleCancel}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};




export default CreateEventForm;