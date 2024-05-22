import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import { EventForm, Event } from './Interfaces';

interface CreateEventProps {
  onAddEvent: (event: EventForm) => void;
  isCreateEventFormVisible: boolean;
  setIsCreateEventFormVisible: Dispatch<SetStateAction<boolean>>;
  currentEvent: EventForm;
  setCurrentEvent: Dispatch<SetStateAction<EventForm>>;
  savedEvents: Event[];
}

export const generateUniqueId = (savedEvents: Event[]) => {
  const maxId = savedEvents.length > 0 ? Math.max(...savedEvents.map((event) => event.id)) : 0;
  return maxId + 1;
};

const CreateEventForm: React.FC<CreateEventProps> = ({ onAddEvent, isCreateEventFormVisible, setIsCreateEventFormVisible, currentEvent, setCurrentEvent }) => {
  if (!isCreateEventFormVisible) {
    return null;
  }

  const [formData, setFormData] = useState<EventForm>(currentEvent);

  useEffect(() => {
    setFormData(currentEvent);
  }, [currentEvent]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
    setCurrentEvent(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const newEvent = { ...formData, id: generateUniqueId(storedEvents) };
    
    if (formData.id === 0) {
      storedEvents.push(newEvent);
    } else {
      const eventIndex = storedEvents.findIndex((e: EventForm) => e.id === formData.id);
      storedEvents[eventIndex] = formData;
    }
    
    localStorage.setItem('events', JSON.stringify(storedEvents));
    onAddEvent(formData);
    setIsCreateEventFormVisible(false);
  };

  const handleCancel = () => {
    setIsCreateEventFormVisible(false);
  };

  return (
    <Box bg={"#141220"} style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', zIndex: 1000, boxShadow: '0 5px 26px #CBE6AD', borderRadius: '4px'}}>
      <h1>Create Event Form</h1>
      <form onSubmit={handleSubmit}>
        <FormControl color="#CBE6AD">
          <FormLabel>Event Name</FormLabel>
          <Input
            name="EventName"
            id="EventName"
            type="text"
            value={formData.EventName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Customer First Name</FormLabel>
          <Input
            name="CustomerFirstName"
            id="CustomerFirstName"
            type="text"
            value={formData.CustomerFirstName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Customer Last Name</FormLabel>
          <Input
            name="CustomerLastName"
            id="CustomerLastName"
            type="text" 
            value={formData.CustomerLastName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Customer Phone Number</FormLabel>
          <Input
            name="CustomerPhoneNumber"
            id="CustomerPhoneNumber"
            type="number"
            value={formData.CustomerPhoneNumber}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Customer Email</FormLabel>
          <Input
            name="CustomerEmail"
            id="CustomerEmail"
            type="text"
            value={formData.CustomerEmail}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Event Type</FormLabel>
          <Input
            name="EventType"
            id="EventType"
            type="text"
            value={formData.EventType}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Number of Guests</FormLabel>
          <Input
            name="NumberOfGuests"
            id="NumberOfGuests"
            type="number"
            value={formData.NumberOfGuests}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Event Date</FormLabel>
          <Input
            name="EventDate"
            id="EventDate"
            type="date"
            value={formData.EventDate}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Start Time</FormLabel> 
          <Input
            name="StartTime"
            id="StartTime"
            type="time"
            value={formData.StartTime}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>End Time</FormLabel>
          <Input
            name="EndTime"
            id="EndTime"
            type="time"
            value={formData.EndTime}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Venue Name</FormLabel> 
          <Input
            name="VenueName"
            id="VenueName"
            type="text"
            value={formData.VenueName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Venue Street Address</FormLabel>
          <Input
            name="VenueStreetAddress"
            id="VenueStreetAddress"
            type="text" 
            value={formData.VenueStreetAddress}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl color="#CBE6AD">
          <FormLabel>Venue City</FormLabel>
          <Input
            name="VenueCity"
            id="VenueCity"
            type="text"
            value={formData.VenueCity}
            onChange={handleChange}
          />
        </FormControl>

        <Button type="submit" colorScheme="lightGreen" variant="outline" mt={4}>
          Save
        </Button>
        <Button colorScheme="Red" variant="outline" mt={4} onClick={handleCancel}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default CreateEventForm;
