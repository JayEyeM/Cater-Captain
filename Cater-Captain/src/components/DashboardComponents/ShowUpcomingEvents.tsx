import React, { useEffect, useState } from "react";
import { Event } from "../Interfaces"; // Assuming Event interface is defined correctly
import { Box, Text, SimpleGrid, useToast } from "@chakra-ui/react";
import { useThemeColors } from "../UseThemeColors";
import { useEventData } from "../../components/GeneralUtilities/UseEventData";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useExport } from "../GeneralUtilities/HandleExport";
import { DownloadIcon } from "@chakra-ui/icons";
import CustomButton from "../Buttons";

dayjs.extend(isBetween);

// The ShowUpcomingEvents component displays the upcoming events for the user for a 14 day period starting from the current day.
const ShowUpcomingEvents: React.FC = () => {
    const events: Event[] = useEventData(); // Ensure useEventData returns Event[], which is an array of Event objects

    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]); // upcomingEvents is an array of events that fall on or between the current day and the 14th day from the current day (14 days in the future)
    const { backgroundColor, secondary, accent, textColor } = useThemeColors();
    const toast = useToast();// used to display notifications

    // Wrap upcomingEvents in an object with a suitable key for exporting
    const exportItems = useExport({
        // The data is an object with a key of 'upcomingEvents' and a value of upcomingEvents
        data: { upcomingEvents },
        // The toast function is used to display notifications when the export is complete.
        toast: (options) => {
            // The options object contains the title, status, duration, and isClosable properties.
            const { title, status, duration, isClosable } = options;
            // The toast function is called with the title, status, duration, and isClosable properties.
            toast({
                title,
                status,
                duration,
                isClosable,
            });
        }
    });

    // Define handleExport functions
    const handleExportJSON = () => {
        // Call the handleExport function with the appropriate arguments (in this case, 'json', 'upcomingEvents', and 'UpcomingEvents')
        exportItems.handleExport('UpcomingEvents', 'json', 'upcomingEvents');
    };

    const handleExportCSV = () => {
        // Call the handleExport function with the appropriate arguments (in this case, 'csv', 'upcomingEvents', and 'UpcomingEvents')
        exportItems.handleExport('UpcomingEvents', 'csv', 'upcomingEvents');
    };

    // Show events that fall on or between the current day and the 14th day from the current day (14 days in the future)
    useEffect(() => {
        //dayJS is used to filter events that fall on or between the current day and the 14th day from the current day (14 days in the future)
        const currentDate = dayjs();// get the current day by calling dayjs()
        const futureDate = currentDate.add(14, 'day');// get the 14th day by calling currentDate.add(14, 'day') from dayjs
        // filter the events by use of the isBetween method from dayjs
        const filteredEvents = events.filter((event) => {
            // get the event date by calling dayjs() with the EventDate property of the event
            const eventDate = dayjs(event.EventDate);// This is converting the event date to a dayjs object
            //
            return eventDate.isBetween(currentDate, futureDate, 'day', '[]');// This is checking if the event date is between the current date and the 14th day from the current date
        });
        // Sort the events by date in ascending order
        filteredEvents.sort((a, b) => dayjs(a.EventDate).diff(dayjs(b.EventDate)));// This uses dayjs to sort the events by date in ascending order
        // Set the filtered events as the upcoming events
        setUpcomingEvents(filteredEvents);
    }, [events]);// This is the dependency array for the useEffect hook, which allows it to re-run when the events array changes.

    return (
        <Box
            bg={backgroundColor}
            outline={"2px solid"}
            outlineColor={secondary}
            p={4}
            w={{ base: "80%", md: "80%" }}
            h={{ base: "auto", md: "auto" }}
            overflowY={"hidden"}
            position={"relative"}
            mx={"auto"}
            mb={"10px"}
            mt={"10px"}
        >
            <Text
                mb={4}
                color={secondary}
                size="lg"
                textAlign={"center"}
                as={"h1"}
            >
                Upcoming Events
            </Text>
            <Text
                mb={4}
                color={secondary}
                size="sm"
                textAlign={"center"}
            >
                14 day period
            </Text>

            {/* Export upcoming events as a JSON file */}
            <Box textAlign="center" mb={4}>
                <CustomButton
                    variant="solidBlue"
                    title="Export Upcoming Events"
                    text={"Export JSON"}
                    onClick={handleExportJSON}
                    leftIcon={<DownloadIcon />}
                >
                    Export JSON
                </CustomButton>

                {/* Export upcoming events as a CSV file */}
                <CustomButton
                    variant="solidBlue"
                    title="Export Upcoming Events"
                    text={"Export CSV"}
                    onClick={handleExportCSV}
                    leftIcon={<DownloadIcon />}
                >
                    Export CSV
                </CustomButton>
            </Box>

            <SimpleGrid
                columns={{ base: 1, md: 3 }}
                spacing={3}
                p={4}
                ml={{ base: "auto", md: "auto" }}
                mr={{ base: "auto", md: "auto" }}
                w={{ base: "auto", md: "auto" }}
                h={"auto"}
                maxH={"300px"}
                overflow={"auto"}
                scrollBehavior={"auto"}
                outline={"2px solid"}
                outlineColor={secondary}
            >
                {upcomingEvents.map((event) => (
                    <Box 
                        key={event.id}
                        bg={backgroundColor}
                        outline={"2px solid"}
                        outlineColor={accent}
                        p={2}
                        w={{ base: "100%", md: "100%" }}
                        h={"100%"}
                        position={"relative"}
                        mx={"auto"}
                        mb={"10px"}
                        mt={"10px"}
                    >
                        <Text color={textColor} fontSize={"2xl"} fontWeight="bold">
                            {event.EventName}
                        </Text>
                        <Text as="span" display="inline" mb={0} color={accent} fontSize="sm">
                            {dayjs(event.EventDate).format('MMMM D, YYYY')}
                        </Text>
                        <Text color={textColor} fontSize={"lg"}>
                            <Text as={"b"} color={accent}> Start Time:</Text> {event.StartTime}
                        </Text>
                        <Text color={textColor} fontSize={"lg"}>
                            <Text as={"b"} color={accent}> End Time:</Text> {event.EndTime}
                        </Text>
                        <Text color={textColor} fontSize={"lg"}>
                            <Text as={"b"} color={accent}> Location:</Text> {event.VenueName}
                        </Text>
                        <Text color={textColor} fontSize={"lg"}>
                            <Text as={"b"} color={accent}> Address:</Text> {event.VenueStreetAddress}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default ShowUpcomingEvents;
