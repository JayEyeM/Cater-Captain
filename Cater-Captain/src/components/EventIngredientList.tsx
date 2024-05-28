import React from 'react';
import {
  Box, Input, Stack, Table, Tbody, Td, Th, Thead, Tr, Checkbox,
} from '@chakra-ui/react';

import { Ingredient } from './Interfaces';
import { SolidLightBlueButton, SolidLightRedButton } from './Buttons';

interface EventIngredientListProps {
  ingredients: Ingredient[];
  onAddIngredient: (newIngredient: Ingredient) => void; 
  onDeleteIngredient: (index: number) => void; 
  onEditIngredient: (index: number, updatedIngredient: Ingredient) => void;
}

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewIngredient(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddIngredient = () => {
    onAddIngredient(newIngredient);
    setNewIngredient({ name: '', units: '', quantity: 0, onHand: false, needToOrder: false });
  };

 

  return (
    <Box>
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
        <SolidLightBlueButton onClick={handleAddIngredient}>Add Ingredient</SolidLightBlueButton>
        
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
              <Td>{ingredient.name}</Td>
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
                <SolidLightRedButton onClick={() => onDeleteIngredient(index)}>Delete</SolidLightRedButton>
                
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EventIngredientList;
