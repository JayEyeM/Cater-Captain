import React from 'react';
import { theme } from '../main';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Flex,
  } from "@chakra-ui/react";

interface EventFormValues {
    eventName: string;
    venueName: string;
    location: string;
    date: string;
    startTime: string;
    endTime: string;
  }

  const CreateEventForm: React.FC = () => {
    const [formValues, setFormValues] = React.useState<EventFormValues>({
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

          <FormControl id="venueName" mt={4}>
            <FormLabel>Venue Name</FormLabel>
            <Input
              type="text"
              value={formValues.venueName}
              onChange={(event) => handleChange(event, "venueName")}
                placeholder='Enter Venue Name'
            />
          </FormControl>

          <FormControl id="location" mt={4}>
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              value={formValues.location}
              onChange={(event) => handleChange(event, "location")}
                placeholder='Enter Location'
            />
          </FormControl>

          <Flex mt={4}>
            <Box mr={4}>
              <FormControl id="date">
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  value={formValues.date}
                  onChange={(event) => handleChange(event, "date")}
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl id="startTime">
                <FormLabel>Start Time</FormLabel>
                <Input
                  type="time"
                  value={formValues.startTime}
                  onChange={(event) => handleChange(event, "startTime")}
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl id="endTime">
                <FormLabel>End Time</FormLabel>
                <Input
                  type="time"
                  value={formValues.endTime}
                  onChange={(event) => handleChange(event, "endTime")}
                />
              </FormControl>
            </Box>
          </Flex>

          <Button type="submit" colorScheme="blue" mt={4}>
            Create Event
          </Button>
        </form>
        </Box>
      );
  };

  export default CreateEventForm;