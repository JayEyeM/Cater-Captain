import { useCallback } from 'react';
import { InventoryItem } from '../Interfaces';

interface ExportData {
  [key: string]: InventoryItem[];
}

interface UseExportParams {
  data: ExportData;
  toast: (options: {
    title: string;
    status: 'success' | 'warning';
    duration: number;
    isClosable: boolean;
  }) => void;
}

export const useExport = ({ data, toast }: UseExportParams) => {
  const handleExport = useCallback(
    (title: string, exportType: 'json' | 'csv', category: string) => {
      const dataToExport = data[category];
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
    },
    [data, toast]
  );

  return {
    handleExport,
  };
};
