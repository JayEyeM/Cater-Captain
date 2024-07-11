import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import {  DropResult } from "react-beautiful-dnd";
import { useThemeColors } from "../components/UseThemeColors";
import NavBar from "../components/NavBar";


import { InventoryItem } from "../components/Interfaces";
import InventoryForm from "../components/InventoryComponents/InventoryForm";
import InventoryList from "../components/InventoryComponents/InventoryList";
import InventoryEditForm from "../components/InventoryComponents/InventoryEditForm";



export const useInventoryData = (): [InventoryItem[], React.Dispatch<React.SetStateAction<InventoryItem[]>>] => {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem('inventoryItems');
        if (storedData) {
          const data = JSON.parse(storedData);
          setInventoryData(data);
        }
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    fetchData();
  }, []);

  return [inventoryData, setInventoryData];
};

const Inventory: React.FC = () => {
  const { backgroundColor, primary, textColor, accent, secondary } = useThemeColors();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [items, setItems] = useState<InventoryItem[]>([]);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [amountPerUnit, setAmountPerUnit] = useState("");
  const [itemUnit, setItemUnit] = useState("select");
  const [costPerUnit, setCostPerUnit] = useState<number | string>("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [whenToOrder, setWhenToOrder] = useState("");
  const [itemSku, setItemSku] = useState("");
  const [packageType, setPackageType] = useState("select");

  const [visibleDetails, setVisibleDetails] = useState<{ [key: string]: boolean }>({});

  const [supplierNames, setSupplierNames] = useState<string[]>([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("inventoryItems") ?? "[]");
    setItems(savedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("inventoryItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const storedSuppliers = JSON.parse(localStorage.getItem('suppliers') ?? '[]');
    const names = storedSuppliers.map((supplier: any) => supplier.supplierName);
    setSupplierNames(names);
  }, []);

  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);


  const handleSupplierSelection = (supplierName: string) => {
    setSelectedSupplier(supplierName);
  };
  

  const addItem = () => {
    const parsedAmountPerUnit = parseFloat(amountPerUnit);
    const parsedCostPerUnit = typeof costPerUnit === 'string' ? parseFloat(costPerUnit) : costPerUnit;

    if (isNaN(parsedAmountPerUnit) || isNaN(parsedCostPerUnit)) {
      alert("Please enter valid numerical values.");
      return;
    }

    const quantity = parseInt(itemQuantity);
    const orderThreshold = parseInt(whenToOrder);

    if (!isNaN(quantity) && !isNaN(orderThreshold) && itemSku) {
      const newItem: InventoryItem = {
        id: new Date().getTime().toString(),
        name: itemName,
        amountPerUnit: parsedAmountPerUnit,
        unit: itemUnit,
        quantity,
        costPerUnit: parsedCostPerUnit,
        whenToOrder: orderThreshold,
        sku: itemSku,
        packageType,
        supplierName: selectedSupplier || supplierNames[0] || "",
        category: category,
        
      };
      setItems([...items, newItem]);
      setItemName("");
      
      setAmountPerUnit("");
      setItemUnit("kg");
      setItemQuantity("");
      setCostPerUnit("");
      setWhenToOrder("");
      setItemSku("");
      setPackageType("box");
      setSelectedSupplier(newItem.supplierName || supplierNames[0] || "");
      setCategory("");
      
    }
  };

  const editItem = (item: InventoryItem) => {
    setCurrentItem(item);
    setItemName(item.name);
    
    setAmountPerUnit(item.amountPerUnit.toString());
    setItemUnit(item.unit);
    setItemQuantity(item.quantity.toString());
    setCostPerUnit(item.costPerUnit);
    setWhenToOrder(item.whenToOrder.toString());
    setItemSku(item.sku);
    setPackageType(item.packageType);
    setSelectedSupplier(item.supplierName || supplierNames[0] || "");
    setCategory(item.category);
    onOpen();
  };

  const saveItem = () => {
    const quantity = parseInt(itemQuantity);
    const orderThreshold = parseInt(whenToOrder);
    const parsedCostPerUnit = typeof costPerUnit === 'string' ? parseFloat(costPerUnit) : costPerUnit;

    if (!isNaN(quantity) && !isNaN(orderThreshold) && !isNaN(parsedCostPerUnit) && currentItem) {
      const parsedAmountPerUnit = parseFloat(amountPerUnit);
      if (isNaN(parsedAmountPerUnit)) {
        return;
      }
      const updatedItem = {
        ...currentItem,
        name: itemName,
        
        amountPerUnit: parsedAmountPerUnit,
        unit: itemUnit,
        quantity,
        costPerUnit: parsedCostPerUnit,
        whenToOrder: orderThreshold,
        sku: itemSku,
        packageType,
        supplierName: selectedSupplier || "",
        category: category,
      };
      const newItems = items.map((item) =>
        item.id === currentItem.id ? updatedItem : item
      );
      setItems(newItems);
      setCurrentItem(null);
      onClose();
    }
  };

  const deleteItem = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    setItems(reorderedItems);
  };

  const toggleDetails = (id: string) => {
    setVisibleDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Box w="100%" h="100%" bg={backgroundColor} >
      <NavBar />
      <Box
        bg={backgroundColor}
        id="EventManagementPage"
        w={{ base: "100%", md: "90%" }}
       
        h="100%"
        mx="auto"
        mb={4}
        pb={2}
      >
        
        <Box
          w={{ base: "100%", md: "100%" }}
          h="auto"
          mx={{ base: "0", md: "auto" }}
          display="flex"
          justifyContent="center"
          flexDir="column"
          alignItems="center"
        >
          <Heading id="inventoryHeading" size="lg" mt={2} fontFamily="Cinzel">
            Inventory
          </Heading>
        </Box>
      
        {InventoryForm(primary, itemSku, setItemSku, backgroundColor, textColor, itemName, setItemName, category, setCategory, amountPerUnit, setAmountPerUnit, itemUnit, setItemUnit, packageType, setPackageType, costPerUnit, setCostPerUnit, itemQuantity, setItemQuantity, whenToOrder, setWhenToOrder, selectedSupplier, handleSupplierSelection, supplierNames, addItem)}
      {InventoryList(primary, onDragEnd, items, backgroundColor, accent, textColor, toggleDetails, visibleDetails, secondary, editItem, deleteItem)}
      </Box>

      {InventoryEditForm(isOpen, onClose, backgroundColor, textColor, itemSku, setItemSku, primary, itemName, setItemName, category, setCategory, amountPerUnit, setAmountPerUnit, itemUnit, setItemUnit, packageType, setPackageType, itemQuantity, setItemQuantity, whenToOrder, setWhenToOrder, selectedSupplier, handleSupplierSelection, supplierNames, saveItem)}
    </Box>
  );
};

export default Inventory;






