import React, { useState } from 'react';
import {
  Box, Input, Stack, Table, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react';
import { SolidLightBlueButton, SolidLightRedButton } from './Buttons';

//props for event menu
interface EventMenuProps {
  menuItems: string[];
  onAddMenuItem: (newMenuItem: string) => void;
  onDeleteMenuItem: (index: number) => void;
}

//component for event menu 
const EventMenu: React.FC<EventMenuProps> = ({
  menuItems = [],
  onAddMenuItem,
  onDeleteMenuItem,
}) => {
  //state for new menu item
  const [newMenuItem, setNewMenuItem] = useState('');

  //functionlity for adding menu item
  const handleAddMenuItem = () => {
    // Add the new menu item to the list of menu items
    onAddMenuItem(newMenuItem);
    // Clear the input field
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
