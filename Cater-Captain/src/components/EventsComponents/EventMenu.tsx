import React, { useState } from 'react';
import {
  Box, Input, Stack, Table, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/react';
// import { SolidLightBlueButton, SolidLightRedButton } from './Buttons';
import CustomButton from '../Buttons';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import ClosableBox from '../GeneralUtilities/ClosableBox';
import { useThemeColors } from '../UseThemeColors';

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

  const { primary, backgroundColor } = useThemeColors();

  return (
    <ClosableBox
    bg={backgroundColor}
    outline={"2px solid"}
    outlineColor={primary}
    p={2}
    w={"50%"} h={"80%"} 
    overflowY={"scroll"} 
     position={"fixed"} 
     left={'25%'} 
     top={'10%'} 
     zIndex={999}
    >
      <Stack spacing={3}>
        <Input
          placeholder="Menu Item"
          value={newMenuItem}
          onChange={(e) => setNewMenuItem(e.target.value)}
        />
        {/* <SolidLightBlueButton onClick={handleAddMenuItem}>Add Menu Item</SolidLightBlueButton> */}
        <CustomButton variant="solidBlue" title="Add Menu Item" alt="Add Menu Item" onClick={handleAddMenuItem}><AddIcon /></CustomButton>
        
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
              <Td sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxWidth: '20ch'}}>{item}</Td>
              <Td>
                {/* <SolidLightRedButton onClick={() => onDeleteMenuItem(index)}>Delete</SolidLightRedButton> */}
                <CustomButton variant="solidRed" title="Delete Menu Item" alt="Delete Menu Item" onClick={() => onDeleteMenuItem(index)}><DeleteIcon /></CustomButton>
                
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </ClosableBox>
  );
};

export default EventMenu;
