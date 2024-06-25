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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ChevronDownIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { InventoryItem } from '../Interfaces';
import { useThemeColors } from '../UseThemeColors';
import CustomButton from '../Buttons';

const EventInventoryIngredients: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [quantity, setQuantity] = useState('');
  const [ingredientList, setIngredientList] = useState<{ item: InventoryItem; quantity: number }[]>([]);

  const { backgroundColor, primary, textColor, accent, secondary } = useThemeColors();

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

  // List of categories
  const categories = [
    "Cool Storage",
    "Freezer",
    "Dry Storage",
    "Produce",
    "Fruits",
    "Vegetables",
    "Meat",
    "Seafood",
    "Dairy",
    "Frozen",
    "Canned",
    "Wine Cellar",
    "Other"
  ];

  return (
    <Box p={4}>
      {/* Category dropdown */}
      <Menu>
        <MenuButton bg={backgroundColor} color={textColor} outlineColor={primary} as={Button} rightIcon={<ChevronDownIcon />} mb={4}
         w={"65%"} borderRadius="0" >
          {selectedCategory || "Select Category"}
        </MenuButton>
        <MenuList bg={backgroundColor} borderColor={primary} color={textColor} borderRadius={0} outline={"2px solid"} outlineColor={primary}
        h={"200px"} overflow={"auto"} scrollBehavior={"auto"}>
          {categories.map((category) => (
            <MenuItem bg={backgroundColor} key={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

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
          .filter((item) => item.category === selectedCategory)
          .map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.supplierName})
            </option>
          ))}
      </Select>

      {/* Display unit measurement and package type */}
      {selectedItem && (
        <Box mb={4}>
          <Text fontSize="sm" color={textColor}>This item costs <Text fontSize={"md"} as={"span"} color={primary}>${selectedItem.costPerUnit}</Text></Text>
          <Text fontSize="sm" color={textColor}>per <Text fontSize={"md"} as={"span"} color={primary}>{selectedItem.amountPerUnit} {selectedItem.unit} {selectedItem.packageType}</Text> </Text>
          
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
              <Text color={textColor}>{ingredient.item.name}</Text>
              <Text fontSize="sm" color={secondary}>Supplier: <Text as={"span"} color={textColor}>{ingredient.item.supplierName} </Text></Text>
              <Text fontSize="sm" color={secondary}>
                Quantity Needed: 
                <Text as={"span"} color={textColor}> {ingredient.quantity} ({ingredient.item.amountPerUnit} {ingredient.item.unit} {ingredient.item.packageType}) </Text>
              </Text>
              <Text fontSize="sm" color={secondary}>
                Cost:  
                <Text as={"span"} color={textColor}> ${calculateCost(ingredient.item, ingredient.quantity).toFixed(2)} </Text>
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
        <Text fontWeight="bold" color={accent}>Total Cost: <Text as={"span"} color={textColor}> ${calculateTotalCost().toFixed(2)} </Text></Text>
      </Box>
    </Box>
  );
};

export default EventInventoryIngredients;
