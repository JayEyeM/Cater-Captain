import React, { useState } from 'react';
import { Notes } from '../components/Interfaces';
import { SolidLightBlueButton, SolidLightRedButton } from './Buttons';

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

  return (
    <div>
      <div>
        <input style={{color: 'black'}}
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add new note"
        />
        <SolidLightBlueButton onClick={handleAddNote}>Add Note</SolidLightBlueButton>
      </div>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {note.notes}
            <SolidLightRedButton onClick={() => onDeleteNote(index)}>Delete</SolidLightRedButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventNotes;
