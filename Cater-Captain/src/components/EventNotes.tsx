import React, { useState } from 'react';
import { Notes } from '../components/Interfaces';
// import { SolidLightBlueButton, SolidLightRedButton } from './Buttons';
import CustomButton from './Buttons';
import { useThemeColors } from './UseThemeColors';
import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Heading,
    Text,
  } from "@chakra-ui/react";

interface EventNotesProps {
  notes: Notes[];
  onAddNote: (newNote: Notes) => void;
  onDeleteNote: (index: number) => void;
}

const EventNotes: React.FC<EventNotesProps> = ({ notes, onAddNote, onDeleteNote }) => {
  const [newNote, setNewNote] = useState<string>('');

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      onAddNote({ notes: newNote });
      setNewNote('');
    }
  };

  const { primary, secondary, accent, backgroundColor, textColor, shadows} = useThemeColors();

  return (
    <Box bg={shadows} p={0.5} w={"100%"} borderRadius="md">
    <Box bg={backgroundColor} p={8} w={"100%"} borderRadius="md">
      <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} gap={4}>
        <Input bg={backgroundColor} outline={"1px solid"} outlineColor={secondary} color={textColor} w={"100%"} borderRadius="md" 
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add new note"
        />
        {/* <SolidLightBlueButton onClick={handleAddNote}>Add Note</SolidLightBlueButton> */}
        <CustomButton variant="solidBlue" onClick={handleAddNote}>Add Note</CustomButton>
      </Box>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {note.notes}
            {/* <SolidLightRedButton onClick={() => onDeleteNote(index)}>Delete</SolidLightRedButton> */}
            <CustomButton variant="solidRed" onClick={() => onDeleteNote(index)}>Delete</CustomButton>
          </li>
        ))}
      </ul>
    </Box>
    </Box>
  );
};

export default EventNotes;
