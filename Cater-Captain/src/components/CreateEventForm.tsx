import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { theme } from '@chakra-ui/react';

interface EventFormValues {
  eventName: string;
  venueName: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
}

const CreateEventForm: React.FC = () => {
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
    localStorage.setItem("formValues", JSON.stringify(formValues));
    console.log("Form submitted:", formValues);
  };

  return (
    <Box sx={{ background: theme.colors.gray[100] }}>
      <form onSubmit={handleSubmit}>
        <FormControl id="eventName">
          <FormLabel>Event Name</FormLabel>
          <Input
            type="text"
            value={formValues.eventName}
            onChange={(event) => handleChange(event, "eventName")}
          />
        </FormControl>

        {/* Other form controls omitted for brevity */}

        <Button type="submit" colorScheme="blue" mt={4}>
          Create Event
        </Button>
      </form>
    </Box>
  );
};

export default CreateEventForm;