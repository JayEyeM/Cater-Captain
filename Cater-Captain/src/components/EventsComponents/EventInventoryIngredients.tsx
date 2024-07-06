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
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ChevronDownIcon, EditIcon, DeleteIcon, ViewIcon, ViewOffIcon, AddIcon } from '@chakra-ui/icons';
import { InventoryItem } from '../Interfaces';
import { useThemeColors } from '../UseThemeColors';
import CustomButton from '../Buttons';
import ClosableBox from '../GeneralUtilities/ClosableBox';
import { useInventoryData } from '../../pages/Inventory';

interface EventInventoryIngredientsProps {
  eventId: string; // Ensure eventId is passed as prop
}

const EventInventoryIngredients: React.FC<EventInventoryIngredientsProps> = ({ eventId }) => {
  const [inventory] = useInventoryData();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [quantity, setQuantity] = useState('');
  const [ingredientList, setIngredientList] = useState<{ item: InventoryItem; quantity: number }[]>([]);

  const [visibleDetails, setVisibleDetails] = useState<{ [key: string]: boolean }>({});

  const { backgroundColor, primary, textColor, accent, secondary } = useThemeColors();

  // Load ingredientList from localStorage on component mount for the specific eventId
  useEffect(() => {
    const storedIngredients = localStorage.getItem(`ingredientList-${eventId}`);
    if (storedIngredients) {
      setIngredientList(JSON.parse(storedIngredients));
    }
  }, [eventId]);

  // Save ingredientList to localStorage whenever it changes for the specific eventId
  useEffect(() => {
    localStorage.setItem(`ingredientList-${eventId}`, JSON.stringify(ingredientList));
  }, [eventId, ingredientList]);

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

  const toggleDetails = (itemId: string) => {
    setVisibleDetails(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
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

  useEffect(() => {
    console.log("Inventory Data: ", inventory);
    console.log("Selected Category: ", selectedCategory);
  }, [inventory, selectedCategory]);

  return (
    <Box p={4}>
      {/* Category dropdown */}
      <Menu>
        <MenuButton bg={backgroundColor} color={textColor} outline={"1px solid"} outlineColor={primary} as={Button} rightIcon={<ChevronDownIcon />} mb={4} w={"65%"} borderRadius="0" >
          {selectedCategory || "Select Category"}
        </MenuButton>
        <MenuList bg={backgroundColor} borderColor={primary} color={textColor} borderRadius={0} outline={"2px solid"} outlineColor={primary} h={"200px"} overflow={"auto"} scrollBehavior={"auto"}>
          {categories.map((category) => (
            <MenuItem bg={backgroundColor} key={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {/* Dropdown to select inventory item */}
      <Select
      outline={"1px solid"}
      outlineColor={primary}
      borderRadius={0}
        title='Select item'
        aria-label='Select item'
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
          outline={"1px solid"}
          outlineColor={primary}
          borderRadius={0}
          type="number"
          placeholder="Quantity Needed"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </InputGroup>

      {/* Button to add ingredient */}
      <CustomButton variant='solidGreen' title='Add Ingredient' alt='Add Ingredient' mb={4} leftIcon={<AddIcon />} onClick={handleAddIngredient}>
        Add Ingredient
      </CustomButton>

      {/* List of ingredients */}
      <List spacing={3}>
        {ingredientList.map((ingredient, index) => (
          <ListItem key={index} borderBottom="1px solid #ddd" py={2}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Text color={textColor}>{ingredient.item.name}</Text>
              <Text color={textColor}> {ingredient.quantity * ingredient.item.amountPerUnit} {ingredient.item.unit}</Text>

              <CustomButton
                variant="outlineGreen"
                title="View Details"
                alt="View Details"
                onClick={() => toggleDetails(ingredient.item.id.toString())}
              >
                {visibleDetails[ingredient.item.id.toString()] ? <ViewIcon /> : <ViewOffIcon />}
              </CustomButton>
            </Box>

            <ClosableBox isOpen={visibleDetails[ingredient.item.id.toString()] || false} onClose={() => toggleDetails(ingredient.item.id.toString())}>
              <Box>
                <Text fontSize="sm" color={secondary}>Supplier: <Text as={"span"} color={textColor}>{ingredient.item.supplierName} </Text></Text>
                <Text fontSize="sm" color={secondary}>
                  Quantity Needed: 
                  <Text as={"span"} color={textColor}> {ingredient.quantity} ({ingredient.item.amountPerUnit} {ingredient.item.unit} {ingredient.item.packageType}) = {ingredient.quantity * ingredient.item.amountPerUnit} {ingredient.item.unit} </Text>
                </Text>
                <Text fontSize="sm" color={secondary}>
                  Cost:  
                  <Text as={"span"} color={textColor}> ${calculateCost(ingredient.item, ingredient.quantity).toFixed(2)} </Text>
                </Text>
              </Box>
              <Spacer />
              <Box>
                <CustomButton variant='outlineGreen' title='Edit Quantity' alt='Edit Quantity' onClick={() => {
                  const newQty = prompt('Enter new quantity', ingredient.quantity.toString());
                  if (newQty !== null && newQty !== '') {
                    handleEditQuantity(index, parseFloat(newQty));
                  }
                }}>
                  <EditIcon />
                </CustomButton>

                <CustomButton variant='outlineRed' title='Delete Ingredient' alt='Delete Ingredient' onClick={() => handleDeleteIngredient(index)}>
                  <DeleteIcon />
                </CustomButton>
              </Box>
            </ClosableBox>
          </ListItem>
        ))}
      </List>

      {/* Display total cost */}
      <Box mt={4}>
        <Text fontSize="xl" color={textColor}>
          <Text as={"b"} color={accent}>Total Cost:</Text> ${calculateTotalCost().toFixed(2)}
        </Text>
      </Box>
    </Box>
  );
};

export default EventInventoryIngredients;
