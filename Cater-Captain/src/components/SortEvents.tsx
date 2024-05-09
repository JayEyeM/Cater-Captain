import React, { useState } from 'react';
import { Select } from '@chakra-ui/react';

interface SortEventsProps {
  onFilterChange: (month: string | null, year: string | null) => void;
}

const SortEvents: React.FC<SortEventsProps> = ({ onFilterChange }) => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = event.target.value;
    setSelectedMonth(month);
      onFilterChange(month, selectedYear);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const year = event.target.value;
    setSelectedYear(year);
      onFilterChange(selectedMonth, year);
  };

  return (
    <div>
    <Select title='Select Month' placeholder='Select a month' onChange={handleMonthChange}>
      <option value='option1'>Jan</option>
      <option value='option2'>Feb</option>
      <option value='option3'>Mar</option>
      <option value='option4'>Apr</option>
      <option value='option5'>May</option>
      <option value='option6'>Jun</option>
      <option value='option7'>Jul</option>
      <option value='option8'>Aug</option>
      <option value='option9'>Sep</option>
      <option value='option10'>Oct</option>
      <option value='option11'>Nov</option>
      <option value='option12'>Dec</option>
    </Select>

    <Select title='Select Year' placeholder='Select a year' onChange={handleYearChange}>
    <option value='option1'>2024</option>
    <option value='option2'>2025</option>
    <option value='option3'>2026</option>
    <option value='option4'>2027</option>
    <option value='option5'>2028</option>
    <option value='option6'>2029</option>
    <option value='option7'>2030</option>
  </Select>
  </div>
  );
};

export default SortEvents;
