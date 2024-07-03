import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Heading,
  useToast,
  useColorMode,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, DownloadIcon, AddIcon } from '@chakra-ui/icons';
import { useThemeColors } from './UseThemeColors';
import CustomButton from './Buttons';

interface LocalStorageData {
  [key: string]: any;
}

const LocalStorageDisplay: React.FC = () => {
  const [data, setData] = useState<LocalStorageData>({});
  const [visibility, setVisibility] = useState<{ [key: string]: boolean }>({});
  const { colorMode } = useColorMode(); 
  const toast = useToast(); 
  const { backgroundColor, primary, textColor } = useThemeColors(); 

  // Keys to display
  const keysToDisplay = ['inventoryItems', 'events', 'employees', 'suppliers'];

  // Initializing the data and visibility state
  useEffect(() => {
    const storedData: LocalStorageData = {};
    const initialVisibility: { [key: string]: boolean } = {};
    for (const key of keysToDisplay) {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          storedData[key] = JSON.parse(item);
        } catch (error) {
          // if the stored data is not valid JSON, treat it as a string
          storedData[key] = item;
        }
        // make the visibility state false by default
        initialVisibility[key] = false;
      }
    }
    setData(storedData);
    setVisibility(initialVisibility);
  }, []);

  const toggleCategory = async (category: string): Promise<void> => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [category]: !prevVisibility[category],
    }));
  };

  const handleExport = (title: string, exportType: 'json' | 'csv') => {
    const dataToExport = data[title];
    if (dataToExport && dataToExport.length > 0) {
      if (exportType === 'json') {
        // Export as JSON
        const jsonData = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}_data.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast({
          title: `${title} data exported as JSON successfully!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else if (exportType === 'csv') {
        // Export as CSV
        const csvContent = dataToExport.reduce((acc: string, row: any) => {
          const values = Object.values(row).map((value) => `"${value}"`).join(',');
          return `${acc}${values}\n`;
        }, Object.keys(dataToExport[0]).map((key) => `"${key}"`).join(',') + '\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}_data.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast({
          title: `${title} data exported as CSV successfully!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: `No data available for ${title}`,
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlePrint = async () => {
    await toggleCategory('inventoryItems');
    await toggleCategory('events');
    await toggleCategory('employees');
    await toggleCategory('suppliers');
    window.print();
  };

  const renderTable = (title: string, data: any) => (
    <Box my={4} p={4} borderWidth={2} borderColor={primary}>
      <Heading size="md" mb={2} color={primary}>
        View Your {title}
      </Heading>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <CustomButton
          variant='outlineGreen'
          title={visibility[title] ? 'Hide' : 'Show'}
          alt={visibility[title] ? 'Hide' : 'Show'}
          onClick={() => toggleCategory(title)}
          colorScheme={colorMode === 'dark' ? 'gray' : 'green'}
        >
          {visibility[title] ? <ViewIcon /> : <ViewOffIcon />}
          {/* {visibility[title] ? 'Hide' : 'Show'} */}
        </CustomButton>
        <Box>
          <CustomButton
            variant='solidBlue'
            title="Export JSON"
            alt="Export JSON"
            leftIcon={<DownloadIcon />}
            ml={2}
            onClick={() => handleExport(title, 'json')}
            colorScheme={colorMode === 'dark' ? 'gray' : 'blue'}
          >
            Export JSON
          </CustomButton>
          <CustomButton
            variant='solidBlue'
            title="Export CSV"
            alt="Export CSV"
            leftIcon={<DownloadIcon />}
            ml={2}
            onClick={() => handleExport(title, 'csv')}
            colorScheme={colorMode === 'dark' ? 'gray' : 'blue'}
          >
            Export CSV
          </CustomButton>
          <CustomButton
            variant='solidBlue'
            title="Print"
            alt="Print"
            leftIcon={<AddIcon />}
            ml={2}
            onClick={handlePrint}
            colorScheme={colorMode === 'dark' ? 'gray' : 'teal'}
          >
            Print
          </CustomButton>
        </Box>
      </Box>
      <Box my={4} p={4} borderWidth={1} borderRadius="lg" display={visibility[title] ? 'block' : 'none'}
      w={'100%'} overflowX={'scroll'}
      >
        <Table variant="striped" mt={4} color={textColor} bg={backgroundColor}>
          <Thead>
            <Tr>
              {Object.keys(data[0] || {}).map((key) => (
                <Th key={key}>{key}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody fontSize={{ base: 'xs', md: 'sm' }}>
            {data.map((item: any, rowIndex: number) => (
              <Tr key={rowIndex}>
                {Object.values(item).map((value, cellIndex) => (
                  <Td key={cellIndex}>{typeof value === 'string' ? value : JSON.stringify(value)}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );

  return (
    <Box p={5} bg={backgroundColor}>
      <Heading size="lg" mb={6} color={primary}>
        View Your Data
      </Heading>
      {Object.keys(data).map((key) => (
        <Box key={key}>
          {renderTable(key, data[key])}
        </Box>
      ))}
    </Box>
  );
};

export default LocalStorageDisplay;
