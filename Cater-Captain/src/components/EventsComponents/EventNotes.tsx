import React, { useState } from 'react';
import { Notes } from '../Interfaces';
// import { SolidLightBlueButton, SolidLightRedButton } from './Buttons';
import CustomButton from '../Buttons';
import { useThemeColors } from '../UseThemeColors';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
    
    Input,
    Box,
    Heading,
    
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

  const { primary, secondary, backgroundColor, textColor} = useThemeColors();

  interface NoteItemProps {
    note: { notes: string };
    index: number;
    onDeleteNote: (index: number) => void;
  }
  
  const NoteItem = ({ note, index, onDeleteNote }: NoteItemProps) => (
    <Box as="li" display="flex" justifyContent="space-between" color={textColor} sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxWidth: '75ch'}}>
      <span>{note.notes}</span>
      <CustomButton
        variant="solidRed"
        title="Delete Note"
        aria-label="Delete Note"
        onClick={() => onDeleteNote(index)}
        w={'40px'}
      >
        <DeleteIcon />
      </CustomButton>
    </Box>
  );

  return (
    <Box
    bg={backgroundColor}
    outline={"2px solid"}
    outlineColor={primary}
    p={6}
    w={{ base: "100%", md: "80%" }} h={"100%"} 
    overflowY={"scroll"} 
     position={"relative"} 
     mx={'auto'}
     mb={"10px"}
     zIndex={999}
    >
   <Heading mb={4} color={textColor} size="lg" textAlign={"center"}>Notes</Heading>
   
      <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} gap={4}>
        <Input bg={backgroundColor} outline={"1px solid"} outlineColor={secondary} color={textColor} w={"100%"} borderRadius="md" 
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add new note"
        />
        
        <CustomButton variant="solidBlue" title="Add Note" alt="Add Note" onClick={handleAddNote}><AddIcon /></CustomButton>
      </Box>
      <ul>
        {notes.map((note, index) => (
          <NoteItem key={index} note={note} index={index} onDeleteNote={onDeleteNote} />
        ))}
      </ul>
    
    
    </Box>
  );
};

export default EventNotes;
