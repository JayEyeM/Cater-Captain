import { useState, useEffect } from 'react';

interface SupplierData {
supplierID: string;
 supplierName: string;
 email: string;
 phone: string;
 contractStatus: string;
 startDate: string;
 endDate: string;
}

const useSupplierData = (mutable: boolean): [SupplierData[], React.Dispatch<React.SetStateAction<SupplierData[]>>] => {
 const [suppliers, setSuppliers] = useState<SupplierData[]>(() => {
  const storedSuppliers = localStorage.getItem('suppliers');
  return storedSuppliers ? JSON.parse(storedSuppliers) : [];
 });

 useEffect(() => {
  if (mutable) {
   localStorage.setItem('suppliers', JSON.stringify(suppliers));
  }
 }, [suppliers, mutable]);

 return [suppliers, setSuppliers];
};

export default useSupplierData;