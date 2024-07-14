import React, { useState, useEffect } from 'react';
import { useThemeColors } from '../UseThemeColors';
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Box, Stack, SimpleGrid } from '@chakra-ui/react';
import CustomButton from '../Buttons';
import EmployeeForm from './EmployeeForm';


interface EmployeeCardProps {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    phone: string;
    fullTimePartTime: string;
    department: string;
    startDate: string;
    onEdit: () => void;
    onDelete: () => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ 
  firstName, lastName, email, role, phone, fullTimePartTime, department, startDate, onEdit, onDelete }) => {
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
        <Heading size='md'>{`${firstName} ${lastName}`}</Heading>
      </CardHeader>
      <CardBody>
      <SimpleGrid columns={{ base: 1, md: 3}} spacing={2}>
        <Text><Text as="b" color={secondary}>Email:</Text> {email}</Text>
        <Text><Text as="b" color={secondary}>Role:</Text> {role}</Text>
        <Text><Text as="b" color={secondary}>Phone:</Text> {phone}</Text>
        <Text><Text as="b" color={secondary}>Status: </Text> {fullTimePartTime}</Text>
        <Text><Text as="b" color={secondary}>Department:</Text> {department}</Text>
        <Text><Text as="b" color={secondary}>Start Date:</Text> {startDate}</Text>
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

interface EmployeeData {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    phone: string;
    fullTimePartTime: string;
    department: string;
    startDate: string;
}

const EmployeeCards: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { backgroundColor } = useThemeColors();

  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const handleFormSubmit = (employeeData: EmployeeData) => {
    if (editingIndex !== null) {
      const updatedEmployees = [...employees];
      updatedEmployees[editingIndex] = employeeData;
      setEmployees(updatedEmployees);
      setEditingIndex(null);
    } else {
      setEmployees([...employees, employeeData]);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  return (
    <Box bg={backgroundColor} p={4}>
      <EmployeeForm
        onFormSubmit={handleFormSubmit}
        onCancel={handleCancel}
        initialData={editingIndex !== null ? employees[editingIndex] : undefined}
      />
      <Stack spacing={4} mt={4}>
        {employees.map((employee, index) => (
          <EmployeeCard
            key={index}
            {...employee}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default EmployeeCards;
