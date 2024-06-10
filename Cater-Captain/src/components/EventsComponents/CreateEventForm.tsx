import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, Box, Heading } from "@chakra-ui/react";
import { EventForm, Event } from '../Interfaces';
// import { SolidLightGreenButton, OutlineLightRedButton } from './Buttons';
import CustomButton from '../Buttons';
import '../componentStyleSheets/CreateEventForm.css';
import { useThemeColors } from '../UseThemeColors';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

//props for create event form component 
interface CreateEventProps {
  onAddEvent: (event: EventForm) => void;
  setSavedEvents: Dispatch<SetStateAction<Event[]>>;
  isCreateEventFormVisible: boolean;
  setIsCreateEventFormVisible: Dispatch<SetStateAction<boolean>>;
  currentEvent: EventForm;
  setCurrentEvent: Dispatch<SetStateAction<EventForm>>;
  savedEvents: Event[];
}

//generate unique id for events in local storage
export const generateUniqueId = (savedEvents: Event[], currentEventId: number) => {
  // Find the maximum ID among existing events and the current event's ID
  const maxId = Math.max(...savedEvents.map((event) => event.id), currentEventId);
  
  // Increment the maximum ID by one to generate a new unique ID
  return maxId + 1;
};

//create event form component 
const CreateEventForm: React.FC<CreateEventProps> = ({ onAddEvent, setSavedEvents, isCreateEventFormVisible, setIsCreateEventFormVisible, currentEvent, setCurrentEvent, savedEvents }) => {
  // Always initialize state
  const [formData, setFormData] = useState<EventForm>(currentEvent);

  // Always run the effect
  useEffect(() => {
    setFormData(currentEvent);
  }, [currentEvent]);

  // If the form is not visible, return null
  if (!isCreateEventFormVisible) {
    return null;
  }

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

  //handle submit for create event form which adds or updates event in local storage
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve the stored events from localStorage
  const storedEvents: EventForm[] = JSON.parse(localStorage.getItem('events') || '[]');

  // Check if the event is new or existing
  const isExistingEvent = formData.id !== 0;

  // If it's a new event, generate a new unique ID
  const eventId = isExistingEvent ? formData.id : generateUniqueId(savedEvents, formData.id);
  const updatedEvent = { ...formData, id: eventId };

  if (isExistingEvent) {
    // Find the index of the existing event in the stored events array based on the event ID
    const eventIndex = storedEvents.findIndex((e: EventForm) => e.id === formData.id);

    // Update the event in the stored events array with the updated event data
    if (eventIndex > -1) {
      storedEvents[eventIndex] = updatedEvent;
    }
  } else {
    // Push the new event into the stored events array
    storedEvents.unshift(updatedEvent);
  }

  // Set the updated events array back into localStorage
  localStorage.setItem('events', JSON.stringify(storedEvents));

  // Update the saved events state and ensure it is sorted
  setSavedEvents(prevEvents => {
    const updatedEvents = [updatedEvent, ...prevEvents.filter(event => event.id !== updatedEvent.id)];
    updatedEvents.sort((a, b) => b.id - a.id);
    return updatedEvents;
  });

  // Call the onAddEvent function with the updated event data
  onAddEvent(updatedEvent);

  // Set the visibility of the create event form to false
  setIsCreateEventFormVisible(false);
};


  //handle cancel for create event form which hides the form
  const handleCancel = () => {
    // Set the visibility of the create event form to false
    setIsCreateEventFormVisible(false);
  };

  const { backgroundColor, textColor, primary } = useThemeColors();

  return (
    <div id='formContainer'>
      <Box bg={backgroundColor} id ="formDiv">
        <Heading color={primary} fontFamily={'Cinzel'} fontSize={'4xl'} textAlign={'center'}>Create New Event</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl color={textColor}>
            <FormLabel>Event Name</FormLabel>
            <Input
              name="EventName"
              id="EventName"
              type="text"
              value={formData.EventName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl color={textColor}>
            <FormLabel>Customer First Name</FormLabel>
            <Input
              name="CustomerFirstName"
              id="CustomerFirstName"
              type="text"
              value={formData.CustomerFirstName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl color={textColor}>
            <FormLabel>Customer Last Name</FormLabel>
            <Input
              name="CustomerLastName"
              id="CustomerLastName"
              type="text" 
              value={formData.CustomerLastName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl color={textColor}>
            <FormLabel>Customer Phone Number</FormLabel>
            <Input
              name="CustomerPhoneNumber"
              id="CustomerPhoneNumber"
              type="number"
              value={formData.CustomerPhoneNumber}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl color={textColor}>
            <FormLabel>Customer Email</FormLabel>
            <Input
              name="CustomerEmail"
              id="CustomerEmail"
              type="text"
              value={formData.CustomerEmail}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl color={textColor}>
            <FormLabel>Event Type</FormLabel>
            <Input
              name="EventType"
              id="EventType"
              type="text"
              value={formData.EventType}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl color={textColor}>
            <FormLabel>Number of Guests</FormLabel>
            <Input
              name="NumberOfGuests"
              id="NumberOfGuests"
              type="number"
              value={formData.NumberOfGuests}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl color={textColor}>
            <FormLabel>Event Date</FormLabel>
            <Input
              name="EventDate"
              id="EventDate"
              type="date"
              value={formData.EventDate}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl color={textColor}>
            <FormLabel>Start Time</FormLabel> 
            <Input
              name="StartTime"
              id="StartTime"
              type="time"
              value={formData.StartTime}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl color={textColor}>
            <FormLabel>End Time</FormLabel>
            <Input
              name="EndTime"
              id="EndTime"
              type="time"
              value={formData.EndTime}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl color={textColor}>
            <FormLabel>Venue Name</FormLabel> 
            <Input
              name="VenueName"
              id="VenueName"
              type="text"
              value={formData.VenueName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl color={textColor}>
            <FormLabel>Venue Street Address</FormLabel>
            <Input
              name="VenueStreetAddress"
              id="VenueStreetAddress"
              type="text" 
              value={formData.VenueStreetAddress}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl color={textColor}>
            <FormLabel>Venue City</FormLabel>
            <Input
              name="VenueCity"
              id="VenueCity"
              type="text"
              value={formData.VenueCity}
              onChange={handleChange}
            />
          </FormControl>

          {/* <SolidLightGreenButton type="submit" mt={4}> Save </SolidLightGreenButton> */}
          <CustomButton variant="solidGreen" type="submit" title="Save" alt="Save" mt={4}> <CheckIcon /> </CustomButton>
          
          {/* <OutlineLightRedButton type="button" mt={4} onClick={handleCancel}> Cancel </OutlineLightRedButton> */}
          <CustomButton variant="outlineRed" type="button" title="Cancel" alt="Cancel" mt={4} onClick={handleCancel}> <CloseIcon /> </CustomButton>
          
        </form>
      </Box>
    </div>
  );
};

export default CreateEventForm;
