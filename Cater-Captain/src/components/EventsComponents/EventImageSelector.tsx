import React from 'react';
import { Box, Image, SimpleGrid } from '@chakra-ui/react';
import { useThemeColors } from '../UseThemeColors';
import ClosableBox from '../GeneralUtilities/ClosableBox';


const eventTypesImages = [
  { src: './eventTypesImages/BabyShower.svg', alt: 'Baby Shower', title: 'Baby Shower' },
  { src: './eventTypesImages/Birthday.svg', alt: 'Birthday', title: 'Birthday' },
  { src: './eventTypesImages/Conference.svg', alt: 'Conference', title: 'Conference' },
  { src: './eventTypesImages/Engagement.svg', alt: 'Engagement', title: 'Engagement' },
  { src: './eventTypesImages/FamilyGathering.svg', alt: 'Family Gathering', title: 'Family Gathering' },
  { src: './eventTypesImages/Meeting.svg', alt: 'Meeting', title: 'Meeting' },
  { src: './eventTypesImages/WorkParty.svg', alt: 'Work Party', title: 'Work Party' },
  { src: './eventTypesImages/Fundraiser.svg', alt: 'Fundraiser', title: 'Fundraiser' },
  { src: './eventTypesImages/Retirement.svg', alt: 'Retirement', title: 'Retirement' },
  { src: './eventTypesImages/Wedding.svg', alt: 'Wedding', title: 'Wedding' },
  { src: './eventTypesImages/Other.svg', alt: 'Other', title: 'Other' },
];

interface EventImageSelectorProps {
  onSelectImage: (imageUrl: string) => void;
}

const EventImageSelector: React.FC<EventImageSelectorProps> = ({ onSelectImage }) => {

  const { backgroundColor, primary } = useThemeColors();

  return (
    <Box 
    bg={backgroundColor}
    outline={"2px solid"}
    outlineColor={primary}
    p={2}
    w={"80%"} h={"100%"} 
    overflowY={"scroll"} 
     position={"relative"} 
     mx={'auto'}
     mb={"10px"}
     mt={"10px"}
     zIndex={999}>
    <SimpleGrid 
    columns={3} spacing={5}>
      {eventTypesImages.map((image, index) => (
        <Box key={index} onClick={() => onSelectImage(image.src)} cursor="pointer">
          <Image src={image.src} alt={image.alt} title={image.title} />
        </Box>
      ))}
    </SimpleGrid>
    </Box>
  );
};

export default EventImageSelector;
