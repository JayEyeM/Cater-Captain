import { Box, Button, FormLabel, Input, Modal, ModalBody, ModalCloseButton, 
    ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import CustomButton from "../Buttons";



function InventoryEditForm(isOpen: boolean, onClose: () => void, backgroundColor: string, textColor: string, itemSku: string, setItemSku: React.Dispatch<React.SetStateAction<string>>, primary: string, itemName: string, setItemName: React.Dispatch<React.SetStateAction<string>>, category: string, setCategory: React.Dispatch<React.SetStateAction<string>>, amountPerUnit: string, setAmountPerUnit: React.Dispatch<React.SetStateAction<string>>, itemUnit: string, setItemUnit: React.Dispatch<React.SetStateAction<string>>, packageType: string, setPackageType: React.Dispatch<React.SetStateAction<string>>, itemQuantity: string, setItemQuantity: React.Dispatch<React.SetStateAction<string>>, whenToOrder: string, setWhenToOrder: React.Dispatch<React.SetStateAction<string>>, selectedSupplier: string | null, handleSupplierSelection: (supplierName: string) => void, supplierNames: string[], saveItem: () => void) {
    return <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={backgroundColor} color={textColor}>
        <ModalHeader>Edit Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel htmlFor="itemSkuEdit">Item #/SKU</FormLabel>
          <Input
            id="itemSkuEdit"
            aria-label="SKU"
            placeholder="SKU"
            value={itemSku}
            onChange={(e) => setItemSku(e.target.value)}
            bg={backgroundColor}
            outlineColor={primary}
            color={textColor}
            mb={2}
            borderRadius="0" />
          <FormLabel htmlFor="itemNameEdit">Item Name</FormLabel>
          <Input
            id="itemNameEdit"
            aria-label="Item Name"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            bg={backgroundColor}
            outlineColor={primary}
            color={textColor}
            mb={2}
            borderRadius="0" />
  
  
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
  
  
  
          <FormLabel htmlFor="amountPerUnitEdit">Unit Amount</FormLabel>
          <Input
            id="amountPerUnitEdit"
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
          <FormLabel htmlFor="unitEdit">Unit Measurement</FormLabel>
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
              maxH={"200px"} overflow={"auto"} scrollBehavior={"auto"}>
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
          <FormLabel htmlFor="packageTypeEdit">Package Type</FormLabel>
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
          <FormLabel htmlFor="itemQuantityEdit">On-hand Quantity</FormLabel>
          <Input
            id="itemQuantityEdit"
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
          <FormLabel htmlFor="whenToOrderEdit">Re-Order Qty</FormLabel>
          <Input
            id="whenToOrderEdit"
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
          <FormLabel htmlFor="selectSupplier">Select Supplier</FormLabel>
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
        </ModalBody>
        <ModalFooter>
          <CustomButton
            variant="outlineGreen"
            title="Save"
            type="submit"
            alt="Save"
            
            onClick={saveItem}
           
          >
            Save
          </CustomButton>
          <CustomButton 
          title="Cancel"
          alt="Cancel"
          variant="outlineRed"
          onClick={onClose}>
            Cancel
          </CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>;
  }

  export default InventoryEditForm;