import React from "react";


import { FormLabel, Input, Button, Box
    , Menu, MenuButton, MenuList, MenuItem
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import CustomButton from "../Buttons";




function InventoryForm(primary: string, itemSku: string, setItemSku: React.Dispatch<React.SetStateAction<string>>, backgroundColor: string, textColor: string, itemName: string, setItemName: React.Dispatch<React.SetStateAction<string>>, category: string, setCategory: React.Dispatch<React.SetStateAction<string>>, amountPerUnit: string, setAmountPerUnit: React.Dispatch<React.SetStateAction<string>>, itemUnit: string, setItemUnit: React.Dispatch<React.SetStateAction<string>>, packageType: string, setPackageType: React.Dispatch<React.SetStateAction<string>>, costPerUnit: string | number, setCostPerUnit: React.Dispatch<React.SetStateAction<string | number>>, itemQuantity: string, setItemQuantity: React.Dispatch<React.SetStateAction<string>>, whenToOrder: string, setWhenToOrder: React.Dispatch<React.SetStateAction<string>>, selectedSupplier: string | null, handleSupplierSelection: (supplierName: string) => void, supplierNames: string[], addItem: () => void) {
    
    return <Box
      w={{ base: "90%", md: "80%" }}
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
            borderRadius="0" />
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
            borderRadius="0" />
        </Box>
  
        <Box>
          <FormLabel htmlFor="unit">Category</FormLabel>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg={backgroundColor}
              color={textColor}
              mb={2}
              borderRadius="0"
            >
              {category}
            </MenuButton>
            <MenuList bg={backgroundColor} borderRadius={0} outline={"2px solid"} outlineColor={primary}
              maxH={"200px"} overflow={"auto"} scrollBehavior={"auto"}
            >
              <MenuItem onClick={() => setCategory("Cool Storage")}>Cool Storage</MenuItem>
              <MenuItem onClick={() => setCategory("Freezer")}>Freezer</MenuItem>
              <MenuItem onClick={() => setCategory("Dry Storage")}>Dry Storage</MenuItem>
              <MenuItem onClick={() => setCategory("Produce")}>Produce</MenuItem>
              <MenuItem onClick={() => setCategory("Fruits")}>Fruits</MenuItem>
              <MenuItem onClick={() => setCategory("Vegetables")}>Vegetables</MenuItem>
              <MenuItem onClick={() => setCategory("Meat")}>Meat</MenuItem>
              <MenuItem onClick={() => setCategory("Seafood")}>Seafood</MenuItem>
              <MenuItem onClick={() => setCategory("Dairy")}>Dairy</MenuItem>
              <MenuItem onClick={() => setCategory("Frozen")}>Frozen</MenuItem>
              <MenuItem onClick={() => setCategory("Canned")}>Canned</MenuItem>
              <MenuItem onClick={() => setCategory("Wine Cellar")}>Wine Cellar</MenuItem>
              <MenuItem onClick={() => setCategory("Other")}>Other</MenuItem>
  
            </MenuList>
          </Menu>
        </Box>
  
  
  
        <Box>
          <FormLabel htmlFor="amountPerUnit">Amount per Unit</FormLabel>
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
            borderRadius="0" />
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
          <FormLabel htmlFor="costPerUnit">Cost per Unit</FormLabel>
          <Input
            id="costPerUnit"
            aria-label="Cost per Unit"
            placeholder="Cost per Unit"
            type="number"
            value={costPerUnit}
            onChange={(e) => setCostPerUnit(parseFloat(e.target.value))}
            bg={backgroundColor}
            outlineColor={primary}
            color={textColor}
            mb={2}
            borderRadius="0" />
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
            borderRadius="0" />
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
            borderRadius="0" />
        </Box>
      </Box>
      <Box>
        <FormLabel>Supplier Name</FormLabel>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {selectedSupplier || "Select a Supplier"}
          </MenuButton>
          <MenuList>
  
            <MenuItem onClick={() => handleSupplierSelection("")}>Select a Supplier</MenuItem>
  
            {supplierNames.map((name) => (
              <MenuItem key={name} onClick={() => handleSupplierSelection(name)}>
                {name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
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
    </Box>;
  }

  export default InventoryForm