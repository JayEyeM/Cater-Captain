import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useThemeColors } from "../UseThemeColors";
import { Box, Text, SimpleGrid, useToast, Checkbox } from "@chakra-ui/react";
import { useInventoryData } from "../../pages/Inventory";
import { InventoryItem } from "../../components/Interfaces";
import CustomButton from "../Buttons";
import { DownloadIcon } from "@chakra-ui/icons";
import { useExport } from "../GeneralUtilities/HandleExport";
import useSupplierData from "../SupplierComponents/useSupplierData";

interface SelectedItem {
    id: string;
    orderPlaced: boolean;
}

const ShowNeedToOrderItems: React.FC = () => {
    const [inventoryItems, setInventoryItems] = useInventoryData() as [InventoryItem[], Dispatch<SetStateAction<InventoryItem[]>>];
    
    const { backgroundColor, primary, textColor, secondary, accent } = useThemeColors();
    const needToOrderItems = inventoryItems.filter((item: InventoryItem) => {
        const isNeedToOrder = item.whenToOrder >= item.quantity;
        return isNeedToOrder;
    });
    const toast = useToast();

    // Wrap needToOrderItems in an object with a suitable key
    const exportItems = useExport(
        {
            data: { needToOrder: needToOrderItems },
            toast: (options) => {
                const { title, status, duration, isClosable } = options;
                toast({
                    title,
                    status,
                    duration,
                    isClosable,
                });
            }
        }
    );

    // Define handleExport functions
    const handleExportJSON = () => {
        exportItems.handleExport('NeedToOrderItems', 'json', 'needToOrder');
    };

    const handleExportCSV = () => {
        exportItems.handleExport('NeedToOrderItems', 'csv', 'needToOrder');
    };

    // Use the useSupplierData hook
    const [suppliers, setSuppliers] = useSupplierData(false);

    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(() => {
        // Retrieve the selected items from localStorage when the component mounts
        const saved = localStorage.getItem('selectedItems');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        // Save the selected items to localStorage whenever it changes
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    }, [selectedItems]);

    const handleCheckboxChange = (itemId: string) => {
        setSelectedItems(prevSelectedItems => {
            const existingItem = prevSelectedItems.find(item => item.id === itemId);
            if (existingItem) {
                return prevSelectedItems.map(item =>
                    item.id === itemId ? { ...item, orderPlaced: !item.orderPlaced } : item
                );
            } else {
                return [...prevSelectedItems, { id: itemId, orderPlaced: true }];
            }
        });
    };

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
                {needToOrderItems.map((item) => (
                    <Box 
                        key={item.id}
                        bg={selectedItems.some(selected => selected.id === item.id && selected.orderPlaced) ? primary : backgroundColor}
                        outline={selectedItems.some(selected => selected.id === item.id && selected.orderPlaced) ? "2px solid" : "4px solid"}
                        outlineColor={selectedItems.some(selected => selected.id === item.id && selected.orderPlaced) ? primary : accent}
                        p={2}
                        w={{ base: "100%", md: "100%" }}
                        h={"100%"}
                        position={"relative"}
                        mx={"auto"}
                        mb={"10px"}
                        mt={"10px"}
                    >
                      <Text
                        color={textColor}
                        fontSize={"2xl"}
                        fontWeight="bold"
                    >
                        {item.name}
                        
                    </Text>
                    <Text as="span" display="inline" mb={0} color={accent} fontSize="sm">
                            ${item.costPerUnit} per {item.amountPerUnit} {item.unit} {item.packageType}
                        </Text>
                        
                        <Text
                           
                            color={textColor}
                            fontSize={"lg"}
                        >
                           <Text as={"b"} color={secondary}> SKU:</Text> {item.sku}
                        </Text>
                        <Text
                            
                            color={textColor}
                            fontSize={"lg"}
                        >
                            <Text as={"b"} color={secondary}> Supplier:</Text> {item.supplierName}
                        </Text>
                        <Text
                        
                        color={textColor}
                        fontSize={"lg"}
                        >
                        
                        <Text as={"b"} color={textColor}> {suppliers.find((supplier) => supplier.supplierName === item.supplierName)?.email || ""}</Text>
                        
                        </Text>
                        <Text
                        
                        color={textColor}
                        fontSize={"lg"}
                        >
                            <Text as={"b"} color={textColor}> {suppliers.find((supplier) => supplier.supplierName === item.supplierName)?.phone || ""}</Text>
                        </Text>
                       <Box display={"flex"} justifyContent={"center"} mt={2}>
                        <Checkbox 
                        size="lg"
                        colorScheme="green"
                        isChecked={selectedItems.some(selected => selected.id === item.id && selected.orderPlaced)}
                        onChange={() => handleCheckboxChange(item.id)}
                        >
                        Order placed
                    </Checkbox>
                    </Box>
                                        
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default ShowNeedToOrderItems;
