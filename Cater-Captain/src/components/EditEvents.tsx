import React, { useState } from 'react';
import { EventFormValues } from '../components/CreateEventForm';
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";

interface EditEventFormProps {
  event: EventFormValues;
  onSave: (updatedEvent: EventFormValues) => void;
}

const EditEventForm: React.FC<EditEventFormProps> = ({ event, onSave }) => {
  const [editedEvent, setEditedEvent] = useState<EventFormValues>({ ...event });

  const handleChange = (fieldName: keyof EventFormValues, value: string) => {
    setEditedEvent(prevEvent => ({
      ...prevEvent,
      [fieldName]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(editedEvent);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Event Name</FormLabel>
          <Input
            type="text"
            value={editedEvent.eventName}
            onChange={(event) => handleChange("eventName", event.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Venue Name</FormLabel>
          <Input
            type="text"
            value={editedEvent.venueName}
            onChange={(event) => handleChange("venueName", event.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            value={editedEvent.location}
            onChange={(event) => handleChange("location", event.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            value={editedEvent.date}
            onChange={(event) => handleChange("date", event.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Start Time</FormLabel>
          <Input
            type="time"
            value={editedEvent.startTime}
            onChange={(event) => handleChange("startTime", event.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>End Time</FormLabel>
          <Input
            type="time"
            value={editedEvent.endTime}
            onChange={(event) => handleChange("endTime", event.target.value)}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" mt={4} onClick={() => onSave(editedEvent)}>
          Save Event
        </Button>
      </form>
    </Box>
  );
};

export default EditEventForm;
