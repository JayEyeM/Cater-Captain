import React, { useState } from 'react';
import { EventFormValues } from '../components/CreateEventForm';
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";

interface EditEventFormProps {
  event: EventFormValues;
  onSave: (updatedEvent: EventFormValues) => void;
  onCancel: () => void;
}

const EditEventForm: React.FC<EditEventFormProps> = ({ event, onSave, onCancel }) => {
  const [editedEvent, setEditedEvent] = useState<EventFormValues>({ ...event });
  //const [isFormVisible, setIsFormVisible] = useState(true);

  const handleCancel = () => {
    setEditedEvent(event);
    onCancel();
  }

  const handleSave = () => {
    onSave(editedEvent);
    onCancel();
  }


  const handleChange = (fieldName: keyof EventFormValues, value: string) => {
    setEditedEvent(prevEvent => ({
      ...prevEvent,
      [fieldName]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");
    onSave(editedEvent);
  };

  

  return (
    <>
    {/* {isFormVisible && ( */}
    <Box bg={"#141220"} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', zIndex: 1000, boxShadow: '0 5px 26px #CBE6AD', borderRadius: '4px'}}>
      <h1>Edit Event Form</h1>
      <form onSubmit={handleSubmit}>
        <FormControl color="#CBE6AD">
          <FormLabel>Event Name</FormLabel>
          <Input
            type="text"
            value={editedEvent.eventName}
            onChange={(event) => handleChange("eventName", event.target.value)}
          />
        </FormControl>

        <FormControl color="#CBE6AD">
          <FormLabel>Venue Name</FormLabel>
          <Input
            type="text"
            value={editedEvent.venueName}
            onChange={(event) => handleChange("venueName", event.target.value)}
          />
        </FormControl>

        <FormControl color="#CBE6AD">
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            value={editedEvent.location}
            onChange={(event) => handleChange("location", event.target.value)}
          />
        </FormControl>

        <FormControl color="#CBE6AD">
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            value={editedEvent.date}
            onChange={(event) => handleChange("date", event.target.value)}
          />
        </FormControl>

        <FormControl color="#CBE6AD">
          <FormLabel>Start Time</FormLabel>
          <Input
            type="time"
            value={editedEvent.startTime}
            onChange={(event) => handleChange("startTime", event.target.value)}
          />
        </FormControl>

        <FormControl color="#CBE6AD">
          <FormLabel>End Time</FormLabel>
          <Input
            type="time"
            value={editedEvent.endTime}
            onChange={(event) => handleChange("endTime", event.target.value)}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" variant="outline" mt={4} onClick={handleSave}>
          Save Event
        </Button>
        <Button type="reset" colorScheme="red" variant="outline" mt={4} onClick={handleCancel}>
          Cancel
        </Button>
      </form>
    </Box>
    {/* )} */}
    </>
  );
};

export default EditEventForm;


