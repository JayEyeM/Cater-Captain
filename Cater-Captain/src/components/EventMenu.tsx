import React, { useState } from 'react';
import {
  Box, Input, Stack, Table, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react';
import { SolidLightBlueButton, SolidLightRedButton } from './Buttons';

interface EventMenuProps {
  menuItems: string[];
  onAddMenuItem: (newMenuItem: string) => void;
  onDeleteMenuItem: (index: number) => void;
}

const EventMenu: React.FC<EventMenuProps> = ({
  menuItems = [],
  onAddMenuItem,
  onDeleteMenuItem,
}) => {
  const [newMenuItem, setNewMenuItem] = useState('');

  const handleAddMenuItem = () => {
    onAddMenuItem(newMenuItem);
    setNewMenuItem('');
  };

  return (
    <Box>
      <Stack spacing={3}>
        <Input
          placeholder="Menu Item"
          value={newMenuItem}
          onChange={(e) => setNewMenuItem(e.target.value)}
        />
        <SolidLightBlueButton onClick={handleAddMenuItem}>Add Menu Item</SolidLightBlueButton>
        
      </Stack>

      <Table variant="simple" mt={5}>
        <Thead>
          <Tr>
            <Th>Menu Item</Th>
            <Th>Delete Item</Th>
          </Tr>
        </Thead>
        <Tbody>
          {menuItems.map((item, index) => (
            <Tr key={index}>
              <Td>{item}</Td>
              <Td>
                <SolidLightRedButton onClick={() => onDeleteMenuItem(index)}>Delete</SolidLightRedButton>
                
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EventMenu;
