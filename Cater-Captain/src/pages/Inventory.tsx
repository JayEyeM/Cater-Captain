import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  FormLabel,
  useTheme,
} from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useThemeColors } from "../components/UseThemeColors";
import NavBar from "../components/NavBar";

interface InventoryItem {
  name: string;
  unit: string;
  quantity: number;
  whenToOrder: number;
}

const Inventory: React.FC = () => {
  const { backgroundColor, primary, textColor } = useThemeColors();
  const theme = useTheme();

  const [items, setItems] = useState<InventoryItem[]>([]);
  const [itemName, setItemName] = useState("");
  const [itemUnit, setItemUnit] = useState("boxes");
  const [itemQuantity, setItemQuantity] = useState("");
  const [whenToOrder, setWhenToOrder] = useState("");

  const addItem = () => {
    const quantity = parseInt(itemQuantity);
    const orderThreshold = parseInt(whenToOrder);

    if (!isNaN(quantity) && !isNaN(orderThreshold)) {
      setItems([...items, { name: itemName, unit: itemUnit, quantity, whenToOrder: orderThreshold }]);
      setItemName("");
      setItemUnit("boxes");
      setItemQuantity("");
      setWhenToOrder("");
    }
  };

  const editItem = (index: number, newItem: InventoryItem) => {
    const newItems = [...items];
    newItems[index] = newItem;
    setItems(newItems);
  };

  const deleteItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    setItems(reorderedItems);
  };

  return (
    <Box w="100%" h={"100%"} bg={backgroundColor}>
      <Box bg={backgroundColor} id="EventManagementPage" w={{ base: '100%', md: '90%' }} h={"100%"} m="auto">
        <NavBar />
        <Box w={"100%"} display={"flex"} justifyContent={"center"} flexDir={"column"} alignItems={"center"}>
            <Heading id="inventoryHeading" size="lg" mt={2} fontFamily={"Cinzel"}>Inventory</Heading>
        </Box>

        <Box w={{base: "100%", md: "80%"}} h={'auto'} mx={"auto"} outline={"2px solid"} outlineColor={primary} display="flex" justifyContent="center" flexDir="column" alignItems="center" p={4}>
          <Box w={{base: "100%", md: "100%"}} mt={4} display="flex" flexDirection={{ base: "column", md: "row" }} gap={4}>
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
              />
            </Box>
            <Box>
              <FormLabel htmlFor="unit">Unit</FormLabel>
              <Select
                id="unit"
                aria-label="Unit"
                placeholder="Select unit"
                value={itemUnit}
                onChange={(e) => setItemUnit(e.target.value)}
                bg={backgroundColor}
                outlineColor={primary}
                color={textColor}
                mb={{ base: 2, md: 0 }}
                title="Unit of measurement"
              >
                <option value="boxes">Boxes</option>
                <option value="kg">Kg</option>
                <option value="lbs">Lbs</option>
                <option value="bags">Bags</option>
              </Select>
            </Box>
            <Box>
              <FormLabel htmlFor="quantity">Quantity</FormLabel>
              <Input
                id="quantity"
                aria-label="Quantity"
                placeholder="Quantity"
                type="number"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
                bg={backgroundColor}
                outlineColor={primary}
                color={textColor}
                mb={{ base: 2, md: 0 }}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="whenToOrder">When to Order</FormLabel>
              <Input
                id="whenToOrder"
                aria-label="When to Order"
                placeholder="When to order"
                type="number"
                value={whenToOrder}
                onChange={(e) => setWhenToOrder(e.target.value)}
                bg={backgroundColor}
                outlineColor={primary}
                color={textColor}
              />
            </Box>
            <Button onClick={addItem} colorScheme="teal" mt={{ base: 2, md: 8 }}>Add Item</Button>
          </Box>

          <Box w="100%" mt={4}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="inventoryList">
                {(provided) => (
                  <Table variant="simple" size="sm" {...provided.droppableProps} ref={provided.innerRef}>
                    <Thead>
                      <Tr>
                        <Th>Item Name</Th>
                        <Th>Unit</Th>
                        <Th>Quantity</Th>
                        <Th>When to Order</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {items.map((item, index) => (
                        <Draggable key={index} draggableId={index.toString()} index={index}>
                          {(provided) => (
                            <Tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Td>{item.name}</Td>
                              <Td>{item.unit}</Td>
                              <Td>{item.quantity}</Td>
                              <Td style={{ color: item.quantity <= item.whenToOrder ? 'red' : 'black' }}>{item.whenToOrder}</Td>
                              <Td>
                                <Button size="xs" onClick={() => deleteItem(index)}>Delete</Button>
                                <Button size="xs" ml={2} onClick={() => editItem(index, { ...item, quantity: item.quantity + 1 })}>Edit</Button>
                              </Td>
                            </Tr>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Tbody>
                  </Table>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Inventory;
