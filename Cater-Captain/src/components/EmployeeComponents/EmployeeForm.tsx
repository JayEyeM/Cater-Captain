import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, RadioGroup, Radio, Stack, Box } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useThemeColors } from '../UseThemeColors';
import CustomButton from '../Buttons';

interface EmployeeFormProps {
    onFormSubmit: (employeeData: EmployeeData) => void;
    onCancel: () => void;
    initialData?: EmployeeData;
}

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

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onFormSubmit, onCancel, initialData }) => {
  const { backgroundColor, primary } = useThemeColors(); 
  const [formData, setFormData] = useState<EmployeeData>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    phone: '',
    fullTimePartTime: '',
    department: '',
    startDate: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prevState => ({ ...prevState, fullTimePartTime: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFormSubmit(formData);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      phone: '',
      fullTimePartTime: '',
      department: '',
      startDate: ''
    });
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      phone: '',
      fullTimePartTime: '',
      department: '',
      startDate: ''
    });
    onCancel();
  };

  return (
    <Box bg={backgroundColor} p={4} w={"100%"} display={"flex"} flexDirection={"column"}
      outline={"2px solid"} outlineColor={primary} borderRadius={0} mx={"auto"} mb={4} mt={4}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Role</FormLabel>
          <Input type="text" name="role" value={formData.role} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Status</FormLabel>
          <RadioGroup onChange={handleRadioChange} value={formData.fullTimePartTime}>
            <Stack direction="row">
              <Radio value="fulltime">Full Time</Radio>
              <Radio value="parttime">Part Time</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Department</FormLabel>
          <Input type="text" name="department" value={formData.department} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
        </FormControl>

        <CustomButton type="submit" variant='solidGreen' title="Submit" alt="Submit">
          <CheckIcon />
        </CustomButton>
        <CustomButton variant='outlineRed' title="Cancel" alt="Cancel" onClick={handleCancel}>
          <CloseIcon />
        </CustomButton>
      </form>
    </Box>
  );
};

export default EmployeeForm;
