import React, { useState, useEffect } from 'react';
import { FormControl, FormLabel, Input, RadioGroup, Radio, Stack, Box } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useThemeColors } from '../UseThemeColors';
import CustomButton from '../Buttons';

interface SupplierFormProps {
    onFormSubmit: (supplierData: SupplierData) => void;
    onCancel: () => void;
    initialData?: SupplierData;
}

interface SupplierData {
    supplierID: string;
    supplierName: string;
    email: string;
    phone: string;
    contractStatus: string;
    startDate: string;
    endDate: string;
}

const SupplierForm: React.FC<SupplierFormProps> = ({ onFormSubmit, onCancel, initialData }) => {
  const { backgroundColor, primary } = useThemeColors(); 
  const [formData, setFormData] = useState<SupplierData>({
    supplierID: '',
    supplierName: '',
    email: '',
    phone: '',
    contractStatus: '',
    startDate: '',
    endDate: ''
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
    setFormData(prevState => ({ ...prevState, contractStatus: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFormSubmit(formData);
    setFormData({
      supplierID: '',
      supplierName: '',
      email: '',
      phone: '',
      contractStatus: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleCancel = () => {
    setFormData({
      supplierID: '',
      supplierName: '',
      email: '',
      phone: '',
      contractStatus: '',
      startDate: '',
      endDate: ''
    });
    onCancel();
  };

  return (
    <Box bg={backgroundColor} p={4} w={"100%"} display={"flex"} flexDirection={"column"}
      outline={"2px solid"} outlineColor={primary} borderRadius={0} mx={"auto"} mb={4} mt={4}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Supplier ID</FormLabel>
          <Input type="text" name="supplierID" value={formData.supplierID} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Supplier Name</FormLabel>
          <Input type="text" name="supplierName" value={formData.supplierName} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="text" name="email" value={formData.email} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Contract Status</FormLabel>
          <RadioGroup onChange={handleRadioChange} value={formData.contractStatus}>
            <Stack direction='row'>
              <Radio value='active'>Active</Radio>
              <Radio value='inactive'>Inactive</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        {/* <FormControl>
          <FormLabel>Status</FormLabel>
          <RadioGroup onChange={handleRadioChange} value={formData.contractStatus}>
            <Stack direction="row">
              <Radio value="fulltime">Full Time</Radio>
              <Radio value="parttime">Part Time</Radio>
            </Stack>
          </RadioGroup>
        </FormControl> */}


        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>End Date</FormLabel>
          <Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
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

export default SupplierForm;
