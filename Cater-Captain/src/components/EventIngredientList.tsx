import React from 'react';
import {
  Box, Button, Input, Stack, Table, Tbody, Td, Th, Thead, Tr, Checkbox,
} from '@chakra-ui/react';

import { Ingredient } from './Interfaces';

interface EventIngredientListProps {
  ingredients: Ingredient[];
  onAddIngredient: (newIngredient: Ingredient) => void; 
  onDeleteIngredient: (index: number) => void; 
  onEditIngredient: (index: number, updatedIngredient: Ingredient) => void; 
  updateLocalStorage: () => void;
}

const EventIngredientList: React.FC<EventIngredientListProps> = ({ ingredients: initialIngredients = [], onAddIngredient, onDeleteIngredient, onEditIngredient, updateLocalStorage }) => {
  const [newIngredient, setNewIngredient] = React.useState<Ingredient>({
    name: '',
    units: '',
    quantity: 0,
    onHand: false,
    needToOrder: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewIngredient((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddIngredient = () => {
    onAddIngredient(newIngredient); 
    setNewIngredient({ name: '', units: '', quantity: 0, onHand: false, needToOrder: false });
    updateLocalStorage();
  };

  const handleDeleteIngredient = (index: number) => {
    onDeleteIngredient(index); 
    updateLocalStorage();
  };

  const handleEditIngredient = (index: number, updatedIngredient: Ingredient) => {
    onEditIngredient(index, updatedIngredient); 
    updateLocalStorage();
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
        <Button onClick={handleAddIngredient}>Add Ingredient</Button>
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
        {initialIngredients && Array.isArray(initialIngredients) && initialIngredients.map((ingredient, index) => (
            <Tr key={index}>
              <Td>{ingredient.name}</Td>
              <Td>{ingredient.units}</Td>
              <Td>{ingredient.quantity}</Td>
              <Td>
                <Checkbox
                  isChecked={ingredient.onHand}
                  onChange={(e) => handleEditIngredient(index, { ...ingredient, onHand: e.target.checked })}
                />
              </Td>
              <Td>
                <Checkbox
                  isChecked={ingredient.needToOrder}
                  onChange={(e) => handleEditIngredient(index, { ...ingredient, needToOrder: e.target.checked })}
                />
              </Td>
              <Td>
                <Button onClick={() => handleDeleteIngredient(index)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EventIngredientList;
