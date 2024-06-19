import React from "react";
import { Box, Button, FormLabel, Input, Select, Textarea,
    useToast, MenuItem, MenuList, MenuButton, Menu,
} from "@chakra-ui/react";
import { useThemeColors } from "../../components/UseThemeColors";
import { InventoryItem } from "../../components/Interfaces";
import CustomButton from "../Buttons";




const InventoryForm: React.FC = () => {
    const { backgroundColor, primary, textColor, accent, secondary } = useThemeColors();
    return (
        <Box
        w={{ base: "90%", md: "100%" }}
        h="auto"
        mx="auto"
        outline="2px solid"
        outlineColor={primary}
        display="flex"
        justifyContent="center"
        flexDir="column"
        alignItems="center"
        p={4}
        maxWidth={{ base: "100%", md: "100%" }}
      >
        <Box
          w={{ base: "100%", md: "100%" }}
          mt={2}
          display="grid"
          gridTemplateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={4}
        >
          <Box>
            <FormLabel htmlFor="itemSku">SKU</FormLabel>
            <Input
              id="itemSku"
              aria-label="SKU"
              placeholder="SKU"
              value={itemSku}
              onChange={(e) => setItemSku(e.target.value)}
              bg={backgroundColor}
              outlineColor={primary}
              color={textColor}
              mb={{ base: 2, md: 0 }}
              borderRadius="0"
            />
          </Box>
          <Box>
            <FormLabel htmlFor="itemName">Item Name</FormLabel>
            <Input
              id="itemName"
              aria-label="Item Name"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              bg={backgroundColor}
              outlineColor={primary}
              color={textColor}
              mb={{ base: 2, md: 0 }}
              borderRadius="0"
            />
          </Box>
          <Box>
            <FormLabel htmlFor="amountPerUnit">Unit Amount</FormLabel>
            <Input
              id="amountPerUnit"
              aria-label="Amount per Unit"
              placeholder="Amount per Unit"
              type="number"
              value={amountPerUnit}
              onChange={(e) => setAmountPerUnit(e.target.value)}
              bg={backgroundColor}
              outlineColor={primary}
              color={textColor}
              mb={2}
              borderRadius="0"
            />
          </Box>
          <Box>
            <FormLabel htmlFor="unit">Unit Measurement</FormLabel>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                bg={backgroundColor}
                color={textColor}
                mb={2}
                borderRadius="0"
              >
                {itemUnit}
              </MenuButton>
              <MenuList bg={backgroundColor} borderRadius={0} outline={"2px solid"} outlineColor={primary}
              maxH={"200px"} overflow={"auto"} scrollBehavior={"auto"}
              >
              <MenuItem onClick={() => setItemUnit("kg")}>Kg</MenuItem>
              <MenuItem onClick={() => setItemUnit("lbs")}>lbs</MenuItem>
              <MenuItem onClick={() => setItemUnit("cups")}>cups</MenuItem>
              <MenuItem onClick={() => setItemUnit("oz")}>oz</MenuItem>
              <MenuItem onClick={() => setItemUnit("flOz")}>fluid oz</MenuItem>
              <MenuItem onClick={() => setItemUnit("grams")}>grams</MenuItem>
              <MenuItem onClick={() => setItemUnit("tbsp")}>tbsp</MenuItem>
              <MenuItem onClick={() => setItemUnit("tsp")}>tsp</MenuItem>
              <MenuItem onClick={() => setItemUnit("milliliters")}>milliliters</MenuItem>
              <MenuItem onClick={() => setItemUnit("liters")}>liters</MenuItem>
              <MenuItem onClick={() => setItemUnit("quarts")}>quarts</MenuItem>
              <MenuItem onClick={() => setItemUnit("pints")}>pints</MenuItem>
              <MenuItem onClick={() => setItemUnit("gallons")}>gallons</MenuItem>
              <MenuItem onClick={() => setItemUnit("other")}>Other</MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box>
            <FormLabel htmlFor="packageType">Package Type</FormLabel>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                bg={backgroundColor}
                color={textColor}
                mb={2}
                borderRadius="0"
              >
                {packageType}
              </MenuButton>
              <MenuList bg={backgroundColor} borderRadius={0} outline={"2px solid"} outlineColor={primary}
              maxH={"200px"} overflow={"auto"} scrollBehavior={"auto"}>
              <MenuItem onClick={() => setPackageType("box")}>Box</MenuItem>
              <MenuItem onClick={() => setPackageType("bag")}>Bag</MenuItem>
              <MenuItem onClick={() => setPackageType("bottle")}>Bottle</MenuItem>
              <MenuItem onClick={() => setPackageType("carton")}>Carton</MenuItem>
              <MenuItem onClick={() => setPackageType("container")}>Container</MenuItem>
              <MenuItem onClick={() => setPackageType("pallet")}>Pallet</MenuItem>
              <MenuItem onClick={() => setPackageType("each")}>Each</MenuItem>
              <MenuItem onClick={() => setPackageType("other")}>Other</MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box>
            <FormLabel htmlFor="itemQuantity"> On-hand Quantity</FormLabel>
            <Input
              id="itemQuantity"
              aria-label="Quantity"
              placeholder="Quantity"
              type="number"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              bg={backgroundColor}
              outlineColor={primary}
              color={textColor}
              mb={2}
              borderRadius="0"
            />
          </Box>
          <Box>
            <FormLabel htmlFor="whenToOrder">Re-order Qty</FormLabel>
            <Input
              id="whenToOrder"
              aria-label="When to Order"
              placeholder="When to Order"
              type="number"
              value={whenToOrder}
              onChange={(e) => setWhenToOrder(e.target.value)}
              bg={backgroundColor}
              outlineColor={primary}
              color={textColor}
              mb={2}
              borderRadius="0"
            />
          </Box>
        </Box>

        <CustomButton
        title="Add Item"
        alt="Add Item"
        variant="solidGreen"
          onClick={addItem}         
          m={4}
        >
          Add Item
        </CustomButton>
      </Box>

    );
};