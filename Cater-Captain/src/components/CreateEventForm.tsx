import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  
} from "@chakra-ui/react";




export interface EventFormValues {
  eventName: string;
  venueName: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface CreateEventFormProps {
  setEventsChanged: any;
  testField?: string;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ setEventsChanged }) => {
  const [formValues, setFormValues] = useState<EventFormValues>({
    eventName: "",
    venueName: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
  });


  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof EventFormValues
  ) => {
    const { value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const existingEventsJSON= localStorage.getItem('events');
    const exisitingEvents : EventFormValues[] = existingEventsJSON ? JSON.parse(existingEventsJSON) : [];

    const updatedEvents = [...exisitingEvents, formValues];

    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setEventsChanged(true);
    console.log("Form submitted:", formValues);
  };

  return (
    
    <Box bg={"#141220"}>
      <form onSubmit={handleSubmit}>
        <FormControl id="eventName" color="#CBE6AD">
          <FormLabel>Event Name</FormLabel>
          <Input
            type="text"
            value={formValues.eventName}
            onChange={(event) => handleChange(event, "eventName")}
          />
        </FormControl>

        <FormControl id="venueName" color="#CBE6AD">
          <FormLabel>Venue Name</FormLabel>
          <Input
            type="text"
            value={formValues.venueName}
            onChange={(event) => handleChange(event, "venueName")}
          />
        </FormControl>

        <FormControl id="location" color="#CBE6AD">
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            value={formValues.location}
            onChange={(event) => handleChange(event, "location")}
          />
        </FormControl> 

        <FormControl id="date" color="#CBE6AD">
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            value={formValues.date}
            onChange={(event) => handleChange(event, "date")}
          />
        </FormControl>

        <FormControl id="startTime" color="#CBE6AD">
          <FormLabel>Start Time</FormLabel>
          <Input
            type="time"
            value={formValues.startTime}
            onChange={(event) => handleChange(event, "startTime")}
          />
        </FormControl>

        <FormControl id="endTime" color="#CBE6AD">
          <FormLabel>End Time</FormLabel>
          <Input
            type="time"
            value={formValues.endTime}
            onChange={(event) => handleChange(event, "endTime")}
          />  
        </FormControl>

        

        <Button type="submit" color="#CBE6AD" bg="#141220" variant="outline" mt={4}>
          Create Event
        </Button>
      </form>
    </Box>
    
  );
};

export default CreateEventForm;