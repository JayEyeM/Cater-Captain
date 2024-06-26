import React, { Dispatch, SetStateAction } from "react";
import { useThemeColors } from "../UseThemeColors";
import { Box, Text, SimpleGrid, useToast } from "@chakra-ui/react";
import { useInventoryData } from "../../pages/Inventory";
import { InventoryItem } from "../../components/Interfaces";
import CustomButton from "../Buttons";
import { DownloadIcon } from "@chakra-ui/icons";
import { useExport } from "../GeneralUtilities/HandleExport";

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
    
    return (
        <Box
            bg={backgroundColor}
            outline={"2px solid"}
            outlineColor={secondary}
            p={2}
            w={{ base: "100%", md: "80%" }}
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
                Need To Order Items
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
                columns={{ base: 1, md: 6 }}
                spacing={3}
                ml={{ base: "auto", md: "auto" }}
                mr={{ base: "auto", md: "auto" }}
                w={{ base: "auto", md: "auto" }}
                h={{ base: "auto", md: "auto" }}
            >
                {needToOrderItems.map((item) => (
                    <Box 
                        key={item.id}
                        bg={backgroundColor}
                        outline={"2px solid"}
                        outlineColor={secondary}
                        p={2}
                        w={{ base: "100%", md: "100%" }}
                        h={"100%"}
                        position={"relative"}
                        mx={"auto"}
                        mb={"10px"}
                        mt={"10px"}
                    >
                        <Text
                            mb={4}
                            color={textColor}
                            size="lg"
                        >
                            {item.name}
                        </Text>
                        <Text
                            mb={4}
                            color={textColor}
                            size="lg"
                        >
                           <Text as={"b"} color={secondary}> SKU:</Text> {item.sku}
                        </Text>
                        <Text
                            mb={4}
                            color={textColor}
                            size="lg"
                        >
                            <Text as={"b"} color={secondary}> Supplier:</Text> {item.supplierName}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default ShowNeedToOrderItems;
