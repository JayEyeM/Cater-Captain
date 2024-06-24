import React from 'react';
import {
  Box, Input, Stack, Table, Tbody, Td, Th, Thead, Tr, Checkbox,
  Heading,
} from '@chakra-ui/react';

import { Ingredient } from '../Interfaces';
// import { SolidLightBlueButton, SolidLightRedButton } from './Buttons';
import CustomButton from '../Buttons';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

import { useThemeColors } from '../UseThemeColors';
import EventInventoryIngredients from './EventInventoryIngredients';

//props for event ingredient list
interface EventIngredientListProps {
  ingredients: Ingredient[];
  onAddIngredient: (newIngredient: Ingredient) => void; 
  onDeleteIngredient: (index: number) => void; 
  onEditIngredient: (index: number, updatedIngredient: Ingredient) => void;
}


//event ingredient list component
const EventIngredientList: React.FC<EventIngredientListProps> = ({
  ingredients = [],
  onAddIngredient,
  onDeleteIngredient,
  onEditIngredient,
}) => {
  const [newIngredient, setNewIngredient] = React.useState<Ingredient>({
    name: '',
    units: '',
    quantity: 0,
    onHand: false,
    needToOrder: false,
  });

  //handle input change for event ingredient list
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewIngredient(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  //handle add ingredient for event ingredient list
  const handleAddIngredient = () => {
    onAddIngredient(newIngredient);
    setNewIngredient({ name: '', units: '', quantity: 0, onHand: false, needToOrder: false });
  };

 const { primary, backgroundColor, textColor } = useThemeColors();

  return (
    <Box
    bg={backgroundColor}
    outline={"2px solid"}
    outlineColor={primary}
    p={4}
    w={"80%"} h={"100%"} 
    overflowY={"scroll"} 
     position={"relative"} m={"auto"}
     mb={"10px"}
     zIndex={999}
     color={textColor}
     display={"flex"} 
     flexDirection={"row"}
    >

      <Box
      bg={backgroundColor}
      outline={"2px solid"}
      outlineColor={primary}
      p={4}
      w={"80%"} h={"100%"} 
      overflowY={"scroll"} 
       position={"relative"} m={"auto"}
       mb={"10px"}
       zIndex={999}
       color={textColor}
      >
        <Heading as="h2" size="lg" mb={4}>
          Add Items from Inventory.
        </Heading>

    <EventInventoryIngredients
        
      />

    </Box>

    <Box
    bg={backgroundColor}
    outline={"2px solid"}
    outlineColor={primary}
    p={4}
    w={"80%"} h={"100%"} 
    overflowY={"scroll"} 
     position={"relative"} m={"auto"}
     mb={"10px"}
     zIndex={999}
     color={textColor}
    >
      <Heading as="h2" size="lg" mb={4}>
          Add Specialty Ingredients.
        </Heading>
      <Stack spacing={3}>
        <Input
          placeholder="Ingredient Name"
          name="name"
          value={newIngredient.name}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Units"
          name="units"
          value={newIngredient.units}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Quantity"
          name="quantity"
          type="number"
          value={newIngredient.quantity}
          onChange={handleInputChange}
        />
        <Checkbox
          name="onHand"
          isChecked={newIngredient.onHand}
          onChange={handleInputChange}
        >
          On Hand
        </Checkbox>
        <Checkbox
          name="needToOrder"
          isChecked={newIngredient.needToOrder}
          onChange={handleInputChange}
        >
          Need to Order
        </Checkbox>
        
        <CustomButton variant="solidBlue" title="Add Ingredient" alt="Add Ingredient" onClick={handleAddIngredient}><AddIcon /></CustomButton>
        
      </Stack>

      

      <Table variant="simple" mt={5}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Units</Th>
            <Th>Quantity</Th>
            <Th>On Hand</Th>
            <Th>Need to Order</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ingredients.map((ingredient, index) => (
            <Tr key={index}>
              <Td sx={{ whiteSpace: 'pre-wrap', maxWidth: '12ch' }}>{ingredient.name}</Td>
              <Td>{ingredient.units}</Td>
              <Td>{ingredient.quantity}</Td>
              <Td>
                <Checkbox
                  isChecked={ingredient.onHand}
                  onChange={e => onEditIngredient(index, { ...ingredient, onHand: e.target.checked })}
                />
              </Td>
              <Td>
                <Checkbox
                  isChecked={ingredient.needToOrder}
                  onChange={e => onEditIngredient(index, { ...ingredient, needToOrder: e.target.checked })}
                />
              </Td>
              <Td>
                
                <CustomButton variant="solidRed" title="Delete Ingredient" alt="Delete Ingredient" onClick={() => onDeleteIngredient(index)}><DeleteIcon /></CustomButton>
                
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>

    </Box>
  );
};

export default EventIngredientList;
