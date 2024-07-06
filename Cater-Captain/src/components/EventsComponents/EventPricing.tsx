import React, { useEffect } from "react";
import { useThemeColors } from "../UseThemeColors";
import CustomButton from "../Buttons";
import {
  Box,
  Text,
  Heading,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Pricing } from "../Interfaces";
import useTotalIngredientListCost from "../GeneralUtilities/useTotalIngredientListCost";
import useTotalEventIngredientCost from "../GeneralUtilities/useTotalEventIngredientCost";

interface PricingProps {
  eventId: string;
  onAddPricing: (newPricing: Pricing) => void;
  onEditPricing: (index: number, updatedPricing: Pricing) => void;
  onDeletePricing: (index: number) => void;
  pricing: Pricing[];
}

const EventPricing: React.FC<PricingProps> = ({
  eventId,
  pricing = [],
  onAddPricing,
  onDeletePricing,
  onEditPricing,
}) => {
  const [newPricing, setNewPricing] = React.useState<Pricing>({
    name: "",
    price: 0,
    currency: "",
  });

  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [discountPercentage, setDiscountPercentage] = React.useState<number>(() => {
    const storedValue = localStorage.getItem(`${eventId}-discountPercentage`);
    return storedValue ? parseFloat(storedValue) : 0;
  });
  const [taxPercentage, setTaxPercentage] = React.useState<number>(() => {
    const storedValue = localStorage.getItem(`${eventId}-taxPercentage`);
    return storedValue ? parseFloat(storedValue) : 0;
  });
  const [discountedTotalPrice, setDiscountedTotalPrice] = React.useState<number | null>(null);
  const [taxedTotalPrice, setTaxedTotalPrice] = React.useState<number | null>(null);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);

  const totalIngredientListCost = useTotalIngredientListCost(eventId);
  const totalEventIngredientCost = useTotalEventIngredientCost(eventId);

  useEffect(() => {
    const storedDiscountPercentage = localStorage.getItem(`${eventId}-discountPercentage`);
    const storedTaxPercentage = localStorage.getItem(`${eventId}-taxPercentage`);
    
    setDiscountPercentage(storedDiscountPercentage ? parseFloat(storedDiscountPercentage) : 0);
    setTaxPercentage(storedTaxPercentage ? parseFloat(storedTaxPercentage) : 0);
  }, [eventId]); // Ensure it runs when eventId changes

  useEffect(() => {
    handleApplyDiscountAndTax();
  }, [discountPercentage, taxPercentage, pricing, totalIngredientListCost, totalEventIngredientCost, totalPrice]); // Update on relevant changes

  useEffect(() => {
    // Calculate total price whenever pricing or costs change
    if (totalIngredientListCost !== null && totalEventIngredientCost !== null) {
      const combinedPricing = [
        ...pricing,
        { name: "Total Inventory Items", price: totalIngredientListCost, currency: "CAD" },
        { name: "Total Specialty Ingredients", price: totalEventIngredientCost, currency: "CAD" },
      ];

      const totalPrice = combinedPricing.reduce((total, item) => total + (+item.price), 0);
      setTotalPrice(totalPrice);
    }
  }, [pricing, totalIngredientListCost, totalEventIngredientCost]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Pricing
  ) => {
    const { value } = e.target;
    setNewPricing((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddPricing = () => {
    onAddPricing(newPricing);
    setNewPricing({ name: "", price: 0, currency: "" });
  };

  const handleEditButtonClick = (index: number) => {
    setEditingIndex(index);
    setNewPricing({
      name: pricing[index].name,
      price: pricing[index].price,
      currency: pricing[index].currency,
    });
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      onEditPricing(editingIndex, newPricing);
      setEditingIndex(null);
      setNewPricing({ name: "", price: 0, currency: "" });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewPricing({ name: "", price: 0, currency: "" });
  };

  const { primary, backgroundColor, textColor, accent } = useThemeColors();

  const handleApplyDiscountAndTax = () => {
    const discountFactor = 1 - (discountPercentage / 100);
    const taxFactor = 1 + (taxPercentage / 100);

    const discountedTotal = totalPrice * discountFactor;
    setDiscountedTotalPrice(discountedTotal);

    const taxedTotal = discountedTotal * taxFactor;
    setTaxedTotalPrice(taxedTotal);
  };

  if (totalEventIngredientCost === null || totalIngredientListCost === null) {
    return <div>Error fetching total event ingredient cost.</div>;
  }

  const combinedPricing = [
    ...pricing,
    { name: "Total Inventory Items", price: totalIngredientListCost, currency: "CAD" },
    { name: "Total Specialty Ingredients", price: totalEventIngredientCost, currency: "CAD" },
  ];

  return (
    <Box
      bg={backgroundColor}
      outline={"2px solid"}
      outlineColor={primary}
      p={4}
      w={{ base: "90%", md: "80%" }}
      h={{ base: "85%", md: "100%" }}
      overflowY={"scroll"}
      position={"relative"}
      m={"auto"}
      mb={"10px"}
      mt={4}
      zIndex={999}
      color={textColor}
    >
      <Heading mb={4} color={textColor} size="lg" textAlign={"center"}>
        Pricing
      </Heading>
      <Stack spacing={3}>
        <Input
          placeholder="Item Name"
          value={newPricing.name}
          onChange={(e) => handleInputChange(e, "name")}
          name="name"
        />
        <Input
          placeholder="Price"
          type="number"
          value={newPricing.price}
          onChange={(e) => handleInputChange(e, "price")}
          name="price"
        />
        <Input
          placeholder="Currency"
          value={newPricing.currency}
          onChange={(e) => handleInputChange(e, "currency")}
          name="currency"
        />
        {editingIndex === null ? (
          <CustomButton
            variant="solidBlue"
            title="Add Pricing"
            alt="Add Pricing"
            onClick={handleAddPricing}
          >
            <AddIcon />
          </CustomButton>
        ) : (
          <>
            <CustomButton
              variant="solidGreen"
              title="Save Edit"
              alt="Save Edit"
              onClick={handleSaveEdit}
            >
              Save
            </CustomButton>
            <CustomButton
              variant="solidRed"
              title="Cancel Edit"
              alt="Cancel Edit"
              onClick={handleCancelEdit}
            >
              Cancel
            </CustomButton>
          </>
        )}
      </Stack>
      <Table variant="simple" mt={5}>
        <Thead>
          <Tr>
            <Th>Item Name</Th>
            <Th>Price</Th>
            <Th>Currency</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {combinedPricing.map((pricingItem, index) => (
            <Tr key={index}>
              <Td>{pricingItem.name}</Td>
              <Td>{typeof pricingItem.price === "number" ? pricingItem.price.toFixed(2) : pricingItem.price}</Td>
              <Td>{pricingItem.currency}</Td>
              {index >= pricing.length ? (
                <>
                  <Td></Td>
                  <Td></Td>
                </>
              ) : (
                <>
                  {editingIndex === index ? (
                    <>
                      <Td>
                        <CustomButton
                          variant="solidGreen"
                          title="Save Edit"
                          alt="Save Edit"
                          onClick={handleSaveEdit}
                        >
                          Save
                        </CustomButton>
                      </Td>
                      <Td>
                        <CustomButton
                          variant="solidRed"
                          title="Cancel Edit"
                          alt="Cancel Edit"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </CustomButton>
                      </Td>
                    </>
                  ) : (
                    <>
                      <Td>
                        <CustomButton
                          variant="solidGreen"
                          title="Edit Pricing"
                          alt="Edit Pricing"
                          onClick={() => handleEditButtonClick(index)}
                        >
                          <EditIcon />
                        </CustomButton>
                      </Td>
                      <Td>
                        <CustomButton
                          variant="solidRed"
                          title="Delete Pricing"
                          alt="Delete Pricing"
                          onClick={() => onDeletePricing(index)}
                        >
                          <DeleteIcon />
                        </CustomButton>
                      </Td>
                    </>
                  )}
                </>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box mt={3}>
        <Heading size="md" color={textColor}>
          <Text as="b" color={accent}>Total Before Discount/Tax:</Text> ${totalPrice.toFixed(2)} CAD
        </Heading>
      </Box>
      <Box mt={3} textAlign="right">
        <Heading size="md" color={textColor}>
          <Text as="b" color={accent}>Discounted Total:</Text> ${discountedTotalPrice !== null ? discountedTotalPrice.toFixed(2) : totalPrice.toFixed(2)} CAD
        </Heading>
      </Box>
      <Box mt={3} textAlign="right">
        <Heading size="md" color={textColor}>
          <Text as="b" color={accent}>Taxed Total:</Text> ${taxedTotalPrice !== null ? taxedTotalPrice.toFixed(2) : totalPrice.toFixed(2)} CAD
        </Heading>
      </Box>
      <Box mt={3}>
        <label htmlFor="discountPercentage">Discount Percentage:</label>
        <Input
          placeholder="Discount Percentage"
          type="number"
          value={discountPercentage}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            setDiscountPercentage(value);
            localStorage.setItem(`${eventId}-discountPercentage`, value.toString());
            handleApplyDiscountAndTax(); // Apply discount and tax after updating
          }}
          name="discountPercentage"
        />
        <label htmlFor="taxPercentage">Tax Percentage:</label>
        <Input
          placeholder="Tax Percentage"
          type="number"
          value={taxPercentage}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            setTaxPercentage(value);
            localStorage.setItem(`${eventId}-taxPercentage`, value.toString());
            handleApplyDiscountAndTax(); // Apply discount and tax after updating
          }}
          name="taxPercentage"
        />
      </Box>
    </Box>
  );
};

export default EventPricing;
