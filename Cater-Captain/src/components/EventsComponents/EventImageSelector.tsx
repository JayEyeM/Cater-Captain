import React from 'react';
import { Box, Image, SimpleGrid } from '@chakra-ui/react';

const eventTypesImages = [
  './eventTypesImages/BabyShower.svg',
  './eventTypesImages/Birthday.svg',
  './eventTypesImages/Conference.svg',
  './eventTypesImages/Engagement.svg',
  './eventTypesImages/FamilyGathering.svg',
  './eventTypesImages/Meeting.svg',
  './eventTypesImages/WorkParty.svg',
  './eventTypesImages/Fundraiser.svg',
  './eventTypesImages/Retirement.svg',
  './eventTypesImages/Wedding.svg',
  './eventTypesImages/Other.svg',
];

interface EventImageSelectorProps {
  onSelectImage: (imageUrl: string) => void;
}

const EventImageSelector: React.FC<EventImageSelectorProps> = ({ onSelectImage }) => {
  return (
    <SimpleGrid columns={3} spacing={5}>
      {eventTypesImages.map((image, index) => (
        <Box key={index} onClick={() => onSelectImage(image)} cursor="pointer">
          <Image src={image} alt={`Event Image ${index + 1}`} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default EventImageSelector;
