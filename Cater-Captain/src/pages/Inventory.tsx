import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  FormLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useThemeColors } from "../components/UseThemeColors";
import NavBar from "../components/NavBar";
import { ChevronDownIcon, ViewIcon, ViewOffIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import CustomButton from "../components/Buttons";
import { InventoryItem } from "../components/Interfaces";


const Inventory: React.FC = () => {
  const { backgroundColor, primary, textColor, accent, secondary } = useThemeColors();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [items, setItems] = useState<InventoryItem[]>([]);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [itemName, setItemName] = useState("");
  const [amountPerUnit, setAmountPerUnit] = useState("");
  const [itemUnit, setItemUnit] = useState("kg");
  const [itemQuantity, setItemQuantity] = useState("");
  const [whenToOrder, setWhenToOrder] = useState("");
  const [itemSku, setItemSku] = useState("");
  const [packageType, setPackageType] = useState("box");

  const [visibleDetails, setVisibleDetails] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("inventoryItems") || "[]");
    setItems(savedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("inventoryItems", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    const parsedAmountPerUnit = parseFloat(amountPerUnit);
    if (isNaN(parsedAmountPerUnit)) {
      // Handle the case when the input is not a valid number
      return;
    }

    const quantity = parseInt(itemQuantity);
    const orderThreshold = parseInt(whenToOrder);

    if (!isNaN(quantity) && !isNaN(orderThreshold) && itemSku) {
      const newItem = {
        id: new Date().getTime().toString(),
        name: itemName,
        amountPerUnit: parsedAmountPerUnit,
        unit: itemUnit,
        quantity,
        whenToOrder: orderThreshold,
        sku: itemSku,
        packageType
      };
      setItems([...items, newItem]);
      setItemName("");
      setAmountPerUnit("");
      setItemUnit("kg");
      setItemQuantity("");
      setWhenToOrder("");
      setItemSku("");
      setPackageType("box");
    }
  };

  const editItem = (item: InventoryItem) => {
    setCurrentItem(item);
    setItemName(item.name);
    setAmountPerUnit(item.amountPerUnit.toString());
    setItemUnit(item.unit);
    setItemQuantity(item.quantity.toString());
    setWhenToOrder(item.whenToOrder.toString());
    setItemSku(item.sku);
    setPackageType(item.packageType);
    onOpen();
  };

  const saveItem = () => {
    const quantity = parseInt(itemQuantity);
    const orderThreshold = parseInt(whenToOrder);

    if (!isNaN(quantity) && !isNaN(orderThreshold) && currentItem) {
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
        whenToOrder: orderThreshold,
        sku: itemSku,
        packageType
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
      <Box
        bg={backgroundColor}
        id="EventManagementPage"
        w={{ base: "100%", md: "90%" }}
       
        h="100%"
        mx="auto"
        mb={4}
        pb={2}
      >
        <NavBar />
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

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="inventory">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        bg={backgroundColor}
                        outline={item.quantity <= item.whenToOrder ? "5px solid red" : "2px solid"}
                        outlineColor={item.quantity <= item.whenToOrder ? "red" : primary}
                        color={textColor}
                        p={4}
                        m={2}

                        
                        borderRadius="0"
                        borderColor={primary}
                      >
                        <Box display="flex" justifyContent="space-between">
                          <Text fontWeight="bold" fontSize="3xl"
                          color={item.quantity <= item.whenToOrder ? "red" : textColor}
                          >{item.name}</Text>
                          <Text fontSize="lg">{item.amountPerUnit} {item.unit} per {item.packageType}</Text>
                          
                          <Text fontSize={item.quantity <= item.whenToOrder ? "2xl" : ""} fontWeight={item.quantity <= item.whenToOrder ? "bold" : ""}
                          color={item.quantity <= item.whenToOrder ? "red" : textColor}>{item.quantity} On Hand</Text>
                          <Box>
                            <CustomButton
                              variant='outlineGreen'
                              title="View Details"
                              alt="View Details"
                             
                              onClick={() => toggleDetails(item.id)}
                            >
                              {visibleDetails[item.id] ? <ViewIcon /> : <ViewOffIcon />}
                            </CustomButton>
                            
                          </Box>
                        </Box>
                        {visibleDetails[item.id] && (
                          <Box mt={4} display={"flex"} flexDirection={{ base: 'column', md: 'row' }} justifyContent={{base: 'flex-start', md: 'space-between'}}>
                          <Box mt={2} display={"flex"} flexDirection={"row"} justifyContent={"space-between"} w={"90%"}>
                            <Text color={secondary}>SKU:<Text color={textColor}>{item.sku}</Text></Text>
                            <Text color={secondary}>Name:<Text color={textColor}>{item.name}</Text></Text>
                            <Text color={secondary}>Amount Per Unit:<Text color={textColor}>{item.amountPerUnit}</Text></Text>
                            <Text color={secondary}>Unit Measurment:<Text color={textColor}>{item.unit}</Text></Text>
                            <Text color={secondary}>Package Type:<Text color={textColor}>{item.packageType}</Text></Text>
                            <Text color={item.quantity <= item.whenToOrder ? "red" : secondary}>Quantity:<Text color={item.quantity <= item.whenToOrder ? "red" : textColor}
                            fontSize={item.quantity <= item.whenToOrder ? "2xl" : ""} fontWeight={item.quantity <= item.whenToOrder ? "bold" : ""}>{item.quantity}</Text></Text>
                            <Text color={item.quantity <= item.whenToOrder ? "red" : secondary}>Re-order:<Text color={item.quantity <= item.whenToOrder ? "red" : textColor}
                            fontSize={item.quantity <= item.whenToOrder ? "2xl" : ""} fontWeight={item.quantity <= item.whenToOrder ? "bold" : ""}>{item.whenToOrder}</Text></Text>
                          </Box>
                          <Box mt={2} display={"flex"} flexDirection={"column"}>
                            <CustomButton variant='outlineGreen' title="Edit Item" alt="Edit Item"  onClick={() => editItem(item)}>
                              <EditIcon />
                            </CustomButton>
                            <CustomButton variant='outlineRed' title="Delete Item" alt="Delete Item" onClick={() => deleteItem(item.id)}>
                              <DeleteIcon />
                            </CustomButton>
                          </Box>
                        </Box>
                        )}
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
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
              borderRadius="0"
            />
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
              borderRadius="0"
            />
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
              borderRadius="0"
            />
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
              borderRadius="0"
            />
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
              borderRadius="0"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              bg={primary}
              color={textColor}
              mr={3}
              onClick={saveItem}
              borderRadius="0"
              _hover={{ bg: accent }}
            >
              Save
            </Button>
            <Button onClick={onClose} borderRadius="0">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Inventory;
