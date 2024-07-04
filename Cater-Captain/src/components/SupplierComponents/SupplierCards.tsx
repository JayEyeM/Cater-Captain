import React, { useState, useEffect } from 'react';
import { useThemeColors } from '../UseThemeColors';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Box, Stack, SimpleGrid } from '@chakra-ui/react';
import CustomButton from '../Buttons';
import SupplierForm from './SupplierForm';

interface SupplierCardProps {
    supplierID: string;
    supplierName: string;
    email: string;
    phone: string;
    contractStatus: string;
    startDate: string;
    endDate: string;
    onEdit: () => void;
    onDelete: () => void;
}



const SupplierCard: React.FC<SupplierCardProps> = ({ supplierID, supplierName, email, phone, contractStatus, startDate, endDate, onEdit, onDelete }) => {
  const { backgroundColor, primary, textColor, secondary } = useThemeColors();
  
  return (
    <Card 
    bg={backgroundColor}
    color={textColor}
    outline={"2px solid"}
    outlineColor={primary}
    borderRadius="0"
    >
      <CardHeader>
        <Heading size='lg'>{`${supplierName} - ${contractStatus}`} contract</Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 1, md: 3}} spacing={2}>
        <Text><Text as="b" color={secondary}>Supplier ID:</Text> {supplierID}</Text>
        <Text><Text as="b" color={secondary}>Supplier Name:</Text> {supplierName}</Text>
        <Text><Text as="b" color={secondary}>Email:</Text> {email}</Text>
        <Text><Text as="b" color={secondary}>Phone:</Text> {phone}</Text>
        <Text><Text as="b" color={secondary}>Contract Status:</Text> {contractStatus}</Text>
        <Text><Text as="b" color={secondary}>Start Date:</Text> {startDate}</Text>
        <Text><Text as="b" color={secondary}>End Date:</Text> {endDate}</Text>
        </SimpleGrid>
      </CardBody>
      <CardFooter>
        <CustomButton variant='solidGreen' title="Edit" alt="Edit" onClick={onEdit}>
          Edit
        </CustomButton>
        <CustomButton variant='outlineRed' title="Delete" alt="Delete" onClick={onDelete}>
          Delete
        </CustomButton>
      </CardFooter>
    </Card>
  );
};

interface SupplierData {
    supplierID: string;
    supplierName: string;
    email: string;
    phone: string;
    contractStatus: string;
    startDate: string;
    endDate: string;
}

const SupplierCards: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { backgroundColor } = useThemeColors();

  useEffect(() => {
    const storedSuppliers = localStorage.getItem('suppliers');
    if (storedSuppliers) {
      setSuppliers(JSON.parse(storedSuppliers));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  const handleFormSubmit = (supplierData: SupplierData) => {
    if (editingIndex !== null) {
      const updatedSuppliers = [...suppliers];
      updatedSuppliers[editingIndex] = supplierData;
      setSuppliers(updatedSuppliers);
      setEditingIndex(null);
    } else {
      setSuppliers([...suppliers, supplierData]);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updatedSuppliers = suppliers.filter((_, i) => i !== index);
    setSuppliers(updatedSuppliers);
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  return (
    <Box bg={backgroundColor} p={4}>
      <SupplierForm
        onFormSubmit={handleFormSubmit}
        onCancel={handleCancel}
        initialData={editingIndex !== null ? suppliers[editingIndex] : undefined}
      />
      <Stack spacing={4} mt={4}>
        {suppliers.map((supplier, index) => (
          <SupplierCard
            key={index}
            {...supplier}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default SupplierCards;
