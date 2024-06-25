import React from "react";
import { useThemeColors } from "../UseThemeColors";
import CustomButton from "../Buttons";
import { Box, Heading, Input, Stack, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Pricing } from "../Interfaces";

// interface for pricing props
interface PricingProps {
  onAddPricing: (newPricing: Pricing) => void;
  onEditPricing: (index: number, updatedPricing: Pricing) => void;
  onDeletePricing: (index: number) => void;
  pricing: Pricing[];
}

const EventPricing: React.FC<PricingProps> = ({
  pricing = [],
  onAddPricing,
  onDeletePricing,
  onEditPricing,
}) => {
  const [newPricing, setNewPricing] = React.useState<Pricing>({
    name: '',
    price: 0,
    currency: '',
  });

  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);

  // handle input change for event pricing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPricing(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPricing = () => {
    onAddPricing(newPricing);
    setNewPricing({ name: '', price: 0, currency: '' });
  };

  const handleEditButtonClick = (index: number) => {
    setEditingIndex(index);
    setNewPricing(pricing[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      onEditPricing(editingIndex, newPricing);
      setEditingIndex(null);
      setNewPricing({ name: '', price: 0, currency: '' });
    }
  };

  const { primary, backgroundColor, textColor } = useThemeColors();

  return (
    <Box
      bg={backgroundColor}
      outline={"2px solid"}
      outlineColor={primary}
      p={4}
      w={{ base: "100%", md: "80%" }}
      h={"100%"}
      overflowY={"scroll"}
      position={"relative"}
      m={"auto"}
      mb={"10px"}
      zIndex={999}
      color={textColor}
    >
      <Heading mb={4} color={textColor} size="lg" textAlign={"center"}>Pricing</Heading>
      <Stack spacing={3}>
        <Input
          placeholder="Pricing Name"
          value={newPricing.name}
          onChange={handleInputChange}
          name="name"
        />
        <Input
          placeholder="Price"
          value={newPricing.price}
          onChange={handleInputChange}
          name="price"
        />
        <Input
          placeholder="Currency"
          value={newPricing.currency}
          onChange={handleInputChange}
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
          <CustomButton
            variant="solidGreen"
            title="Save Edit"
            alt="Save Edit"
            onClick={handleSaveEdit}
          >
            Save
          </CustomButton>
        )}
      </Stack>
      <Table variant="simple" mt={5}>
        <Thead>
          <Tr>
            <Th>Pricing Name</Th>
            <Th>Price</Th>
            <Th>Currency</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pricing.map((pricingItem, index) => (
            <Tr key={index}>
              <Td>{pricingItem.name}</Td>
              <Td>{pricingItem.price}</Td>
              <Td>{pricingItem.currency}</Td>
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
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EventPricing;
