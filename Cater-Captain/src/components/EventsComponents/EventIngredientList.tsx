import React, { useState } from 'react';
import {
  Box, Input, Stack, Text, Checkbox, Heading,
  FormLabel, Menu, MenuButton, MenuList, MenuItem, Button,
  List, ListItem, Spacer
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
}

//event ingredient list component
const EventIngredientList: React.FC<EventIngredientListProps> = ({
  ingredients = [],
  onAddIngredient,
  onDeleteIngredient,
  onEditIngredient,
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
        w={{ base: "100%", md: "80%" }} h={"100%"}
        overflowY={"scroll"}
        position={"relative"} m={"auto"}
        mb={"10px"}
        zIndex={999}
        color={textColor}
      >
        <Heading as="h2" size="lg" mb={4}>
          Add Items from Inventory.
        </Heading>
        <EventInventoryIngredients />
      </Box>

      <Box
        bg={backgroundColor}
        outline={"2px solid"}
        outlineColor={primary}
        p={4}
        w={{ base: "100%", md: "80%" }} h={"100%"}
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
            placeholder="Unit Quantity"
            name="unitQuantity"
            type="number"
            value={newIngredient.unitQuantity}
            onChange={handleInputChange}
          />
          <FormLabel htmlFor="units">Unit Measurement</FormLabel>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg={backgroundColor}
              color={textColor}
              mb={2}
              borderRadius="0"
            >
              {newIngredient.units || 'Select Unit'}
            </MenuButton>
            <MenuList
              bg={backgroundColor}
              borderRadius={0}
              outline={"2px solid"}
              outlineColor={primary}
              maxH={"200px"} overflow={"auto"} scrollBehavior={"auto"}
            >
              {["Kg", "lbs", "cups", "oz", "fluid oz", "grams", "tbsp", "tsp", "milliliters", "liters", "quarts", "pints", "gallons", "other"].map(unit => (
                <MenuItem key={unit} onClick={() => setNewIngredient({ ...newIngredient, units: unit })}>
                  {unit}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Input
            placeholder="Quantity Needed"
            name="quantityNeeded"
            type="number"
            value={newIngredient.quantityNeeded}
            onChange={handleInputChange}
          />
          <FormLabel htmlFor="packageType">Package Type</FormLabel>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg={backgroundColor}
              color={textColor}
              mb={2}
              borderRadius="0"
            >
              {newIngredient.packageType || 'Select Package Type'}
            </MenuButton>
            <MenuList
              bg={backgroundColor}
              borderRadius={0}
              outline={"2px solid"}
              outlineColor={primary}
              maxH={"200px"} overflow={"auto"} scrollBehavior={"auto"}
            >
              {["Box", "Bag", "Bottle", "Carton", "Container", "Pallet", "Each", "Other"].map(type => (
                <MenuItem key={type} onClick={() => setNewIngredient({ ...newIngredient, packageType: type })}>
                  {type}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Input
            placeholder="Cost Per Unit (00.00)"
            name="costPerUnit"
            type="number"
            value={newIngredient.costPerUnit}
            onChange={handleInputChange}
          />
          <Input
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
          <CustomButton variant="solidGreen" title="Add Ingredient" alt="Add Ingredient" leftIcon={<AddIcon />} onClick={handleAddIngredient}>
             Add Ingredient
          </CustomButton>
        </Stack>

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
                  <Text fontSize="sm" color={primary}>Quantity Needed: <Text as={"span"} color={textColor}>
                    {ingredient.quantityNeeded} ({ingredient.unitQuantity} {ingredient.units} per {ingredient.packageType}) = {calculateTotalAmountNeeded(Number(ingredient.quantityNeeded), Number(ingredient.unitQuantity))} {ingredient.units}
                    </Text></Text>
                  <Text fontSize="sm" color={primary}>Cost Per Unit: <Text as={"span"} color={textColor}>${ingredient.costPerUnit}</Text></Text>
                  <Text fontSize="sm" color={primary}>Total Item Cost: <Text as={"span"} color={textColor}>${calculateItemCost(ingredient, ingredient.quantityNeeded)}</Text></Text>
                  <Text fontSize="sm" color={primary}>On Hand: <Text as={"span"} color={textColor}>{ingredient.onHand ? 'Yes' : 'No'}</Text> </Text>
              </Box>
              <Spacer />
              <Box>
                <CustomButton
                  variant='outlineGreen'
                  title='Edit Quantity'
                  alt='Edit Quantity'
                  onClick={() => {
                    const newQuantity = prompt('Enter new quantity', ingredient.quantityNeeded.toString());
                    if (newQuantity !== null && newQuantity !== '') {
                      const updatedIngredient = { ...ingredient, quantityNeeded: parseFloat(newQuantity) };
                      onEditIngredient(index, updatedIngredient);
                    }
                  }}
                >
                  <EditIcon />
                </CustomButton>
                <CustomButton
                  variant='outlineRed'
                  title='Delete Ingredient'
                  alt='Delete Ingredient'
                  onClick={() => onDeleteIngredient(index)}
                >
                  <DeleteIcon />
                </CustomButton>
              </Box>
            </ClosableBox>
          </ListItem>
        ))}
      </List>

      {/* Total cost */}
      <Box mt={5}>
        <Text fontWeight="bold" color={accent}>Total Cost: <Text as={"span"} color={textColor}>${calculateTotalCost().toFixed(2)}</Text></Text>
      </Box>
    </Box>
  </Box>
);
};

export default EventIngredientList;
