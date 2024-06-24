import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Select,
  Text,
  Button,
  List,
  ListItem,
  InputGroup,
  InputLeftElement,
  IconButton,
  Spacer,
} from '@chakra-ui/react';
import { SearchIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { InventoryItem } from '../Interfaces';

const EventInventoryIngredients: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [quantity, setQuantity] = useState('');
  const [ingredientList, setIngredientList] = useState<{ item: InventoryItem; quantity: number }[]>([]);

  // Fetch inventory items from localStorage on component mount
  useEffect(() => {
    const storedInventory = localStorage.getItem('inventoryItems');
    if (storedInventory) {
      setInventory(JSON.parse(storedInventory));
    }
  }, []);

  // Load ingredientList from localStorage on component mount
  useEffect(() => {
    const storedIngredients = localStorage.getItem('ingredientList');
    if (storedIngredients) {
      setIngredientList(JSON.parse(storedIngredients));
    }
  }, []);

  // Save ingredientList to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ingredientList', JSON.stringify(ingredientList));
  }, [ingredientList]);

  // Function to handle adding an ingredient to the list
  const handleAddIngredient = () => {
    if (selectedItem && quantity) {
      const newIngredient = { item: selectedItem, quantity: parseFloat(quantity) };
      setIngredientList([...ingredientList, newIngredient]);
      setSelectedItem(null);
      setQuantity('');
    }
  };

  // Function to calculate cost per ingredient based on quantity
  const calculateCost = (item: InventoryItem, qty: number): number => {
    return qty * item.costPerUnit;
  };

  // Function to calculate total cost of all ingredients
  const calculateTotalCost = (): number => {
    return ingredientList.reduce((total, { item, quantity }) => total + calculateCost(item, quantity), 0);
  };

  // Function to handle editing quantity of an ingredient
  const handleEditQuantity = (index: number, newQuantity: number) => {
    const updatedList = [...ingredientList];
    updatedList[index].quantity = newQuantity;
    setIngredientList(updatedList);
  };

  // Function to handle deleting an ingredient from the list
  const handleDeleteIngredient = (index: number) => {
    const updatedList = [...ingredientList];
    updatedList.splice(index, 1);
    setIngredientList(updatedList);
  };

  return (
    <Box p={4}>
      {/* Search input */}
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search by name or supplier..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* Dropdown to select inventory item */}
      <Select
      title='Select item'
      
        mb={4}
        placeholder="Select item"
        value={selectedItem ? selectedItem.id.toString() : ''}
        onChange={(e) => {
          const itemId = parseInt(e.target.value);
          const item = inventory.find((item) => item.id === itemId.toString());
          if (item) {
            setSelectedItem(item);
          }
        }}
      >
        {inventory
          .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.supplierName})
            </option>
          ))}
      </Select>

      {/* Display unit measurement and package type */}
      {selectedItem && (
        <Box mb={4}>
          <Text fontSize="sm">Unit: {selectedItem.unit}</Text>
          <Text fontSize="sm">Package Type: {selectedItem.packageType}</Text>
        </Box>
      )}

      {/* Input for quantity */}
      <InputGroup mb={4}>
        <Input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </InputGroup>

      {/* Button to add ingredient */}
      <Button colorScheme="blue" mb={4} onClick={handleAddIngredient}>
        Add Ingredient
      </Button>

      {/* List of ingredients */}
      <List spacing={3}>
        {ingredientList.map((ingredient, index) => (
          <ListItem key={index} borderBottom="1px solid #ddd" py={2}>
            <Box>
              <Text>{ingredient.item.name}</Text>
              <Text fontSize="sm">Supplier: {ingredient.item.supplierName}</Text>
              <Text fontSize="sm">
                Quantity: {ingredient.quantity} {ingredient.item.unit}
              </Text>
              <Text fontSize="sm">
                Cost: ${calculateCost(ingredient.item, ingredient.quantity).toFixed(2)}
              </Text>
            </Box>
            <Spacer />
            <Box>
              <IconButton
                icon={<EditIcon />}
                aria-label="Edit"
                onClick={() => {
                  const newQty = prompt('Enter new quantity', ingredient.quantity.toString());
                  if (newQty !== null && newQty !== '') {
                    handleEditQuantity(index, parseFloat(newQty));
                  }
                }}
                mr={2}
              />
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Delete"
                onClick={() => handleDeleteIngredient(index)}
              />
            </Box>
          </ListItem>
        ))}
      </List>

      {/* Total cost */}
      <Box mt={4}>
        <Text fontWeight="bold">Total Cost: ${calculateTotalCost().toFixed(2)}</Text>
      </Box>
    </Box>
  );
};

export default EventInventoryIngredients;
