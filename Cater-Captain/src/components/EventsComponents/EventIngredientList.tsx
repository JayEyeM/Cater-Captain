import React, { useState, useEffect } from 'react';
import {
  Box, Input, Stack, Text, Checkbox, Heading,
   Menu, MenuButton, MenuList, MenuItem, Button,
  List, ListItem
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, ChevronDownIcon, EditIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Ingredient } from '../Interfaces';
import CustomButton from '../Buttons';
import { useThemeColors } from '../UseThemeColors';
import ClosableBox from '../GeneralUtilities/ClosableBox';
import EventInventoryIngredients from './EventInventoryIngredients';

//props for event ingredient list
interface EventIngredientListProps {
  ingredients: Ingredient[];
  onAddIngredient: (newIngredient: Ingredient) => void;
  onDeleteIngredient: (index: number) => void;
  onEditIngredient: (index: number, updatedIngredient: Ingredient) => void;
  eventId: string;
}

//use "ingredientList" data from local storage
export const useIngredientListData = () => {
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
  useEffect(() => {
    const storedIngredients = localStorage.getItem('ingredientList');
    if (storedIngredients) {
      setIngredientList(JSON.parse(storedIngredients));
    }
  }, []);
  return [ingredientList, setIngredientList];
};



//event ingredient list component
const EventIngredientList: React.FC<EventIngredientListProps> = ({
  ingredients = [],
  onAddIngredient,
  onDeleteIngredient,
  onEditIngredient,
  eventId,
}) => {
  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    name: '',
    units: '',
    unitQuantity: '',
    quantityNeeded: 0,
    onHand: false,
    needToOrder: false,
    costPerUnit: '',
    packageType: '',
    supplierName: '',
  });

  const [visibleDetails, setVisibleDetails] = useState<boolean[]>(ingredients.map(() => false));
  const [editingIndex, setEditingIndex] = useState<number | null>(null);


  //handle input change for event ingredient list
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewIngredient(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setNewIngredient({
      name: '',
      units: '',
      unitQuantity: '',
      quantityNeeded: 0,
      onHand: false,
      needToOrder: false,
      costPerUnit: '',
      packageType: '',
      supplierName: '',
    });
  };
  

  //handle add ingredient for event ingredient list
  const handleAddIngredient = () => {
    if (editingIndex !== null) {
      // Update existing ingredient
      onEditIngredient(editingIndex, newIngredient);
      setEditingIndex(null); // Reset editing state
    } else {
      // Add new ingredient
      onAddIngredient(newIngredient);
    }
    resetForm(); // Reset form fields
  };
  

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    const ingredientToEdit = ingredients[index];
    setNewIngredient({
      ...ingredientToEdit,
      
    });
  };
  

  const toggleDetails = (index: number) => {
    setVisibleDetails(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  

  const calculateTotalAmountNeeded = (quantityNeeded: number, unitQuantity: number): number => {
    return quantityNeeded * unitQuantity;
  };

  const calculateTotalCost = (): number => {
    return ingredients.reduce((total, ingredient) => {
      const itemTotal = ingredient.quantityNeeded * parseFloat(ingredient.costPerUnit);
      return total + itemTotal;
    }, 0);
  };

  const calculateItemCost = (item: Ingredient, qty: number): number => {
    const costPerUnit = parseFloat(item.costPerUnit);
    return qty * costPerUnit;
  };

  const { primary, backgroundColor, textColor, accent } = useThemeColors();

  return (
    <Box
      bg={backgroundColor}
      p={4}
      w={{ base: "100%", md: "80%" }} h={"100%"}
      position={"relative"} m={"auto"}
      mb={"10px"}
      zIndex={999}
      color={textColor}
      display={"flex"}
      flexDirection={{ base: "column", md: "row" }}
    >
      <Box
        bg={backgroundColor}
        outline={"2px solid"}
        outlineColor={primary}
        p={4}
        w={{ base: "100%", md: "80%" }}
        h={{ base: "100%", md: "100%" }}
        overflowY={"scroll"}
        position={"relative"}
        m={"auto"}
        mb={"10px"}
        zIndex={999}
        color={textColor}
      >
        <Heading as="h2" size="lg" mb={4}>
          Add Items from Inventory.
        </Heading>
        <EventInventoryIngredients eventId={eventId} />
      </Box>

      <Box
        bg={backgroundColor}
        outline={"2px solid"}
        outlineColor={primary}
        p={4}
        w={{ base: "100%", md: "80%" }}
        h={{ base: "100%", md: "100%" }}
        overflowY={"scroll"}
        position={"relative"}
        m={"auto"}
        mb={"10px"}
        zIndex={999}
        color={textColor}
      >
        <Heading as="h2" size="lg" mb={4}>
          Add Specialty Ingredients.
        </Heading>
        <Stack spacing={3}>
          <Input
          outline={"1px solid"}
          outlineColor={primary}
          borderRadius={0}
            placeholder="Ingredient Name"
            name="name"
            value={newIngredient.name}
            onChange={handleInputChange}
          />
          <Input
           outline={"1px solid"}
           outlineColor={primary}
           borderRadius={0}
            placeholder="Unit Quantity"
            name="unitQuantity"
            type="number"
            value={newIngredient.unitQuantity}
            onChange={handleInputChange}
          />
          
          <Menu>
            <MenuButton
             outline={"1px solid"}
             outlineColor={primary}
             borderRadius={0}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg={backgroundColor}
              color={textColor}
              mb={2}
              
            >
              {newIngredient.units || 'Select Unit Measurement'}
            </MenuButton>
            <MenuList
              bg={backgroundColor}
              borderRadius={0}
              outline={"2px solid"}
              outlineColor={primary}
              maxH={"200px"}
              overflow={"auto"}
              scrollBehavior={"auto"}
            >
              {["Kg", "lbs", "cups", "oz", "fluid oz", "grams", "tbsp", "tsp", "milliliters", "liters", "quarts", "pints", "gallons", "each", "other"].map(unit => (
                <MenuItem 
                bg={backgroundColor}
                key={unit} onClick={() => setNewIngredient({ ...newIngredient, units: unit })}>
                  {unit}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Input
           outline={"1px solid"}
           outlineColor={primary}
           borderRadius={0}
            placeholder="Quantity Needed"
            name="quantityNeeded"
            type="number"
            value={newIngredient.quantityNeeded}
            onChange={handleInputChange}
          />
          
          <Menu>
            <MenuButton
             outline={"1px solid"}
             outlineColor={primary}
             borderRadius={0}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg={backgroundColor}
              color={textColor}
              mb={2}
              
            >
              {newIngredient.packageType || 'Select Package Type'}
            </MenuButton>
            <MenuList
              bg={backgroundColor}
              borderRadius={0}
              outline={"2px solid"}
              outlineColor={primary}
              maxH={"200px"}
              overflow={"auto"}
              scrollBehavior={"auto"}
            >
              {["Box", "Bag", "Bottle", "Carton", "Container", "Pallet", "Each", "Other"].map(type => (
                <MenuItem 
                bg={backgroundColor}
                key={type} onClick={() => setNewIngredient({ ...newIngredient, packageType: type })}>
                  {type}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Input
           outline={"1px solid"}
           outlineColor={primary}
           borderRadius={0}
            placeholder="Cost Per Unit (00.00)"
            name="costPerUnit"
            type="number"
            value={newIngredient.costPerUnit}
            onChange={handleInputChange}
          />
          <Input
           outline={"1px solid"}
           outlineColor={primary}
           borderRadius={0}
            placeholder="Supplier Name"
            name="supplierName"
            value={newIngredient.supplierName}
            onChange={handleInputChange}
          />
          <Checkbox
            name="onHand"
            isChecked={newIngredient.onHand}
            onChange={handleInputChange}
          >
            On Hand
          </Checkbox>
          
        </Stack>
        <CustomButton variant="solidGreen" title="Add Ingredient" alt="Add Ingredient" leftIcon={<AddIcon />} onClick={handleAddIngredient}>
             Add Ingredient
          </CustomButton>

        <List spacing={3} mt={5}>
          {ingredients.map((ingredient, index) => (
            <ListItem key={index} borderBottom="1px solid #ddd" py={2}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Text color={textColor}>{ingredient.name}</Text>
                <Text color={textColor}>
                  {calculateTotalAmountNeeded(Number(ingredient.quantityNeeded), Number(ingredient.unitQuantity))} {ingredient.units}
                </Text>
                <CustomButton
                  variant="outlineGreen"
                  title="View Details"
                  alt="View Details"
                  onClick={() => toggleDetails(index)}
                >
                  {visibleDetails[index] ? <ViewIcon /> : <ViewOffIcon />}
                </CustomButton>
              </Box>

              <ClosableBox isOpen={visibleDetails[index]} onClose={() => toggleDetails(index)}>
                <Box>
                  <Text fontSize="sm" color={primary}>Supplier: <Text as={"span"} color={textColor}>{ingredient.supplierName}</Text></Text>
                  <Text fontSize="sm" color={primary}>Quantity Needed: <Text as={"span"} color={textColor}>{ingredient.quantityNeeded}</Text></Text>
                  <Text fontSize="sm" color={primary}>Units: <Text as={"span"} color={textColor}>{ingredient.units}</Text></Text>
                  <Text fontSize="sm" color={primary}>Unit Quantity: <Text as={"span"} color={textColor}>{ingredient.unitQuantity}</Text></Text>
                  <Text fontSize="sm" color={primary}>On Hand: <Text as={"span"} color={textColor}>{ingredient.onHand ? 'Yes' : 'No'}</Text></Text>
                  <Text fontSize="sm" color={primary}>Need to Order: <Text as={"span"} color={textColor}>{ingredient.needToOrder ? 'Yes' : 'No'}</Text></Text>
                  <Text fontSize="sm" color={primary}>Package Type: <Text as={"span"} color={textColor}>{ingredient.packageType}</Text></Text>
                  <Text fontSize="sm" color={primary}>Cost Per Unit: <Text as={"span"} color={textColor}>${ingredient.costPerUnit}</Text></Text>
                  <Text fontSize="sm" color={primary}>Total Item Cost: <Text as={"span"} color={textColor}>${calculateItemCost(ingredient, ingredient.quantityNeeded)}</Text></Text>
                  <CustomButton
                    variant="outlineGreen"
                    title="Edit Ingredient"
                    alt="Edit Ingredient"
                    onClick={() => handleEditClick(index)}
                    leftIcon={<EditIcon />}
                  >
                    Edit
                  </CustomButton>

                  <CustomButton
                    variant="outlineRed"
                    title="Delete Ingredient"
                    alt="Delete Ingredient"
                    onClick={() => onDeleteIngredient(index)}
                    leftIcon={<DeleteIcon />}
                  >
                    Delete
                  </CustomButton>
                </Box>
              </ClosableBox>
            </ListItem>
          ))}
        </List>

        <Box
          bg={backgroundColor}
          
          p={2}
          w={"90%"}
          h={"10%"}
          m={"auto"}
          mt={"10px"}
          mb={"10px"}
          zIndex={999}
          color={textColor}
        >
          <Text color={textColor}><Text as={"b"} color={accent}>Total Cost: </Text> ${calculateTotalCost().toFixed(2)}</Text>
        </Box>
      </Box>
      <Box
      display={{ base: "block", md: "none" }}
        bg={backgroundColor}
        h={"20%"}
        p={2}
        w={"90%"}
        m={"auto"}
        mt={"10px"}
        mb={"10px"}
        zIndex={999}
        color={textColor}
        >
      </Box>
    </Box>
  );
};

export default EventIngredientList;
