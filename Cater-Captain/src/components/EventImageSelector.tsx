import React from 'react';
import { Box, Image, SimpleGrid } from '@chakra-ui/react';

const eventTypesImages = [
  './public/eventTypesImages/BabyShower.svg',
  './public/eventTypesImages/Birthday.svg',
  './public/eventTypesImages/Conference.svg',
  './public/eventTypesImages/Engagement.svg',
  './public/eventTypesImages/FamilyGathering.svg',
  './public/eventTypesImages/Meeting.svg',
  './public/eventTypesImages/WorkParty.svg',
  './public/eventTypesImages/Fundraiser.svg',
  './public/eventTypesImages/Retirement.svg',
  './public/eventTypesImages/Wedding.svg',
  './public/eventTypesImages/Other.svg',
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
