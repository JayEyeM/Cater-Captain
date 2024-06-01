import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import { EventForm, Event } from './Interfaces';
import { SolidLightGreenButton, OutlineLightRedButton } from './Buttons';
import './componentStyleSheets/CreateEventForm.css';

//props for create event form component 
interface CreateEventProps {
  onAddEvent: (event: EventForm) => void;
  isCreateEventFormVisible: boolean;
  setIsCreateEventFormVisible: Dispatch<SetStateAction<boolean>>;
  currentEvent: EventForm;
  setCurrentEvent: Dispatch<SetStateAction<EventForm>>;
  savedEvents: Event[];
}

//generate unique id for events in local storage
export const generateUniqueId = (savedEvents: Event[]) => {
  const maxId = savedEvents.length > 0 ? Math.max(...savedEvents.map((event) => event.id)) : 0;
  return maxId + 1;
};

//create event form component 
const CreateEventForm: React.FC<CreateEventProps> = ({ onAddEvent, isCreateEventFormVisible, setIsCreateEventFormVisible, currentEvent, setCurrentEvent }) => {
  if (!isCreateEventFormVisible) {
    return null;
  }
    //use state for using current event data
  const [formData, setFormData] = useState<EventForm>(currentEvent);
    //use effect for setting current event data
  useEffect(() => {
    setFormData(currentEvent);
  }, [currentEvent]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Destructure the name and value from the event target.
    const { name, value } = event.target;

    // Update the formData state.
    setFormData(prevFormData => ({
      // Spread the previous formData and update the specified field.
      ...prevFormData,
      [name]: value,
    }));

    // Update the currentEvent state.
    setCurrentEvent(prevFormData => ({
      // Spread the previous currentEvent and update the specified field.
      ...prevFormData,
      [name]: value,
    }));
  };

  
  //handle submit for create event form which adds event to local storage
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieve the stored events from localStorage
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');

    // Generate a unique ID for the new event
    const newEvent = { ...formData, id: generateUniqueId(storedEvents) };

    // If the event ID is 0, it means it's a new event
    if (formData.id === 0) {
      // Push the new event into the stored events array
      storedEvents.push(newEvent);
    } else {
      // Find the index of the event in the stored events array based on the event ID
      const eventIndex = storedEvents.findIndex((e: EventForm) => e.id === formData.id);

      // Update the event in the stored events array with the new event data
      storedEvents[eventIndex] = formData;
    }

    // Set the updated events array back into localStorage
    localStorage.setItem('events', JSON.stringify(storedEvents));

    // Call the onAddEvent function with the new event data
    onAddEvent(newEvent);

    // Set the visibility of the create event form to false
    setIsCreateEventFormVisible(false);
  };

  //handle cancel for create event form which hides the form
  const handleCancel = () => {
    // Set the visibility of the create event form to false
    // This will hide the form and make it inaccessible to the user
    setIsCreateEventFormVisible(false);
  };

  return (
    <Box bg={"#141220"} id ="formDiv">
      <h1 id="formTitle">Create New Event</h1>
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

        <SolidLightGreenButton type="submit" mt={4}> Save </SolidLightGreenButton>
        
        <OutlineLightRedButton type="submit" mt={4} onClick={handleCancel}> Cancel </OutlineLightRedButton>
        
      </form>
    </Box>
  );
};

export default CreateEventForm;
