import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useThemeColors } from "../UseThemeColors";
import { Box, Text, SimpleGrid, useToast, Checkbox } from "@chakra-ui/react";
import { useInventoryData } from "../../pages/Inventory";
import { InventoryItem } from "../../components/Interfaces";
import CustomButton from "../Buttons";
import { DownloadIcon } from "@chakra-ui/icons";
import { useExport } from "../GeneralUtilities/HandleExport";
import useSupplierData from "../SupplierComponents/useSupplierData";

// Create interface for SelectedItem
interface SelectedItem {
    id: string;
    orderPlaced: boolean;
}

const ShowNeedToOrderItems: React.FC = () => {
    //Inventory items are from useInventoryData.
    const [inventoryItems, setInventoryItems] = useInventoryData() as [InventoryItem[], Dispatch<SetStateAction<InventoryItem[]>>];
    
    const { backgroundColor, textColor, secondary, accent } = useThemeColors();
    //needToOrderItems is an array of inventory items that need to be ordered. The items are filtered, based on whenToOrder.
    const needToOrderItems = inventoryItems.filter((item: InventoryItem) => {
        //If whenToOrder is less than or equal to quantity, the item is added to the array.
        const isNeedToOrder = item.whenToOrder >= item.quantity;
        //The ShowNeedToOrderItems are returned.
        return isNeedToOrder;
    });
    //The toast function is used to display notifications.
    const toast = useToast();

    // Wrap needToOrderItems in an object with a suitable key
    const exportItems = useExport({
        //data is an object with a key of 'inventoryItems' and a value of needToOrderItems
        data: {
            inventoryItems: needToOrderItems, 
        },
        //The toast function is used to display notifications when the export is complete.
        toast: (options) => {
            const { title, status, duration, isClosable } = options;
            toast({
                title,
                status,
                duration,
                isClosable,
            });
        }
    });
    

    // Define handleExport functions
    const handleExportJSON = () => {
        // Call the handleExport function with the appropriate arguments (in this case, 'json', 'inventoryItems', and 'NeedToOrderItems')
        exportItems.handleExport('NeedToOrderItems', 'json', 'inventoryItems');
    };

    const handleExportCSV = () => {
        // Call the handleExport function with the appropriate arguments (in this case, 'csv', 'inventoryItems', and 'NeedToOrderItems')
        exportItems.handleExport('NeedToOrderItems', 'csv', 'inventoryItems');
    };

    // Use the useSupplierData hook to use the suppliers data.
    const [suppliers, setSuppliers] = useSupplierData(false);

    // Make useState hook for selectedItems that will be used to track which items have been selected
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(() => {
        // Retrieve the selected items from localStorage when the component mounts
        const saved = localStorage.getItem('selectedItems');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        // Save the selected items to localStorage whenever it changes
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    }, [selectedItems]);

    //The handleCheckboxChange function is used to toggle the orderPlaced property of the selected item.
    const handleCheckboxChange = (itemId: string) => {
        setSelectedItems(prevSelectedItems => {
            //Find if the item is already exists in the array
            const existingItem = prevSelectedItems.find(item => item.id === itemId);
            //If the item exists in the array, change the orderPlaced property to the opposite value
            if (existingItem) {
                return prevSelectedItems.map(item =>
                    // The item.id is equal to the itemId, return the item with the orderPlaced property changed.
                    //The spread operator is used to create a new object with the same properties as the old object, but with the orderPlaced property changed.
                    item.id === itemId ? { ...item, orderPlaced: !item.orderPlaced } : item
                );
            } else {
                //If the item is not in the array, add it with the orderPlaced property set to true
                return [...prevSelectedItems, { id: itemId, orderPlaced: true }];
            }
        });
    };

    // Define setStyles function for the needToOrderItems
    //if condition is true, trueValue is returned. Otherwise, falseValue is returned.
    const setStyles = (condition: boolean, trueValue: any, falseValue: any) => (condition ? trueValue : falseValue);

    return (
        <Box
            bg={backgroundColor}
            outline={"2px solid"}
            outlineColor={secondary}
            p={2}
            w={{ base: "80%", md: "80%" }}
            h={{ base: "auto", md: "auto" }}
            overflowY={"hidden"}
            position={"relative"}
            mx={"auto"}
            mb={"10px"}
            mt={"10px"}
        >
            <Text
                mb={4}
                color={secondary}
                size="lg"
                textAlign={"center"}
                as={"h1"}
            >
                Need to Order
            </Text>
            {/* Export need to order items as a JSON file */}
            <Box textAlign="center" mb={4}>
            <CustomButton
                variant="solidBlue"
                title="Export Need To Order Items"
                alt="Export Need To Order Items"
                text={"Export Need To Order Items"}
                onClick={handleExportJSON}
                leftIcon={<DownloadIcon />}
            >
                Export JSON
            </CustomButton>

            {/* Export need to order items as a CSV file */}
            <CustomButton
                variant="solidBlue"
                title="Export Need To Order Items"
                alt="Export Need To Order Items"
                text={"Export Need To Order Items"}
                onClick={handleExportCSV}
                leftIcon={<DownloadIcon />}
            >
                Export CSV
            </CustomButton>
            </Box>

            <SimpleGrid
                columns={{ base: 1, md: 3 }}
                spacing={3}
                p={4}
                ml={{ base: "auto", md: "auto" }}
                mr={{ base: "auto", md: "auto" }}
                w={{ base: "auto", md: "auto" }}
                h={"auto"}
                maxH={"300px"}
                overflow={"auto"}
                scrollBehavior={"auto"}
                outline={"2px solid"}
                outlineColor={secondary}
            >
                {/* Loop through the needToOrderItems and render each item as a box */}
                {needToOrderItems.map((item) => {
                    const isSelected = selectedItems.some(selected => selected.id === item.id && selected.orderPlaced);
                    return (
                        <Box 
                            key={item.id}
                            bg={setStyles(isSelected, secondary, backgroundColor)}
                            outline={setStyles(isSelected, "2px solid", "4px solid")}
                            outlineColor={setStyles(isSelected, secondary, accent)}
                            p={2}
                            w={{ base: "100%", md: "100%" }}
                            h={"100%"}
                            position={"relative"}
                            mx={"auto"}
                            mb={"10px"}
                            mt={"10px"}
                        >
                            <Text
                               color={setStyles(isSelected, backgroundColor, textColor)}
                                fontSize={"2xl"}
                                fontWeight="bold"
                            >
                                {item.name}
                            </Text>
                            <Text as="span" display="inline" mb={0} color={setStyles(isSelected, secondary, accent)} 
                            fontSize="sm">
                                ${item.costPerUnit} per {item.amountPerUnit} {item.unit} {item.packageType}
                            </Text>
                            <Text color={setStyles(isSelected, secondary, textColor)} fontSize={"lg"}>
                                <Text as={"b"} color={setStyles(isSelected, secondary, accent)}> SKU:</Text> {item.sku}
                            </Text>
                            <Text color={setStyles(isSelected, secondary, textColor)} fontSize={"lg"}>
                                <Text as={"b"} color={setStyles(isSelected, secondary, accent)}> Supplier:</Text> {item.supplierName}
                            </Text>
                            <Text color={setStyles(isSelected, secondary, textColor)} fontSize={"lg"}>
                                <Text as={"b"} color={setStyles(isSelected, secondary, textColor)}> {suppliers.find((supplier) => supplier.supplierName === item.supplierName)?.email || ""}</Text>
                            </Text>
                            <Text color={setStyles(isSelected, secondary, textColor)} fontSize={"lg"}>
                                <Text as={"b"} color={setStyles(isSelected, secondary, textColor)}> {suppliers.find((supplier) => supplier.supplierName === item.supplierName)?.phone || ""}</Text>
                            </Text>
                            <Box display={"flex"} justifyContent={"center"} mt={2}>
                                <Checkbox 
                                    color={setStyles(isSelected, backgroundColor, textColor)}
                                    size="lg"
                                    colorScheme={setStyles(isSelected, backgroundColor, textColor)}
                                    isChecked={isSelected}
                                    onChange={() => handleCheckboxChange(item.id)}
                                    sx={{
                                        '& .chakra-checkbox__control': {
                                            borderColor: accent,
                                            
                                        },
                                        '& .chakra-checkbox__control[data-checked]': {
                                            borderColor: backgroundColor,
                                            backgroundColor: secondary
                                        }
                                    }}
                                >
                                    Order placed
                                </Checkbox>
                            </Box>
                        </Box>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
};

export default ShowNeedToOrderItems;
