import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Box, Text } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { InventoryItem } from "../Interfaces";
import CustomButton from '../Buttons';


function InventoryList(primary: string, onDragEnd: (result: DropResult) => void, items: InventoryItem[], backgroundColor: string, accent: string, textColor: string, toggleDetails: (id: string) => void, visibleDetails: { [key: string]: boolean; }, secondary: string, editItem: (item: InventoryItem) => void, deleteItem: (id: string) => void) {
    return <Box outline={"2px solid"} outlineColor={primary} w={{ base: "100%", md: "80%" }}
      mx={"auto"} mt={"2%"} p={2}>
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
                      outlineColor={item.quantity <= item.whenToOrder ? accent : primary}
                      color={textColor}
                      p={4}
                      mt={2}
                      mb={4}
  
                      borderRadius="0"
                      borderColor={primary}
                    >
                      <Box display="flex" justifyContent="space-between">
                        <Text fontWeight="bold" fontSize="3xl"
                          color={item.quantity <= item.whenToOrder ? accent : textColor}
                        >{item.name}</Text>
                        <Text fontSize="lg">{item.amountPerUnit} {item.unit} per {item.packageType}</Text>
  
                        <Text fontSize={item.quantity <= item.whenToOrder ? "2xl" : ""} fontWeight={item.quantity <= item.whenToOrder ? "bold" : ""}
                          color={item.quantity <= item.whenToOrder ? accent : textColor}>{item.quantity} On Hand</Text>
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
                        <Box mt={4} display={"flex"} flexDirection={{ base: 'column', md: 'row' }} justifyContent={{ base: 'flex-start', md: 'space-between' }}>
                          <Box mt={2} display={"grid"} gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gridTemplateRows={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }} w={"90%"}
                          >
  
                            <Text color={secondary}>SKU:<Text color={textColor}>{item.sku}</Text></Text>
                            <Text color={secondary}>Name:<Text color={textColor}>{item.name}</Text></Text>
                            <Text color={secondary}>Category:<Text color={textColor}>{item.category}</Text></Text>
                            <Text color={secondary}>Amount Per Unit:<Text color={textColor}>{item.amountPerUnit}</Text></Text>
                            <Text color={secondary}>Unit Measurment:<Text color={textColor}>{item.unit}</Text></Text>
                            <Text color={secondary}>Package Type:<Text color={textColor}>{item.packageType}</Text></Text>
                            <Text color={secondary}>Cost Per Unit:<Text color={textColor}>{item.costPerUnit}</Text></Text>
                            <Text color={item.quantity <= item.whenToOrder ? accent : secondary}>On-hand Qty:<Text color={item.quantity <= item.whenToOrder ? accent : textColor}
                              fontSize={item.quantity <= item.whenToOrder ? "2xl" : ""} fontWeight={item.quantity <= item.whenToOrder ? "bold" : ""}>{item.quantity}</Text></Text>
                            <Text color={item.quantity <= item.whenToOrder ? accent : secondary}>Re-order Qty:<Text color={item.quantity <= item.whenToOrder ? accent : textColor}
                              fontSize={item.quantity <= item.whenToOrder ? "2xl" : ""} fontWeight={item.quantity <= item.whenToOrder ? "bold" : ""}>{item.whenToOrder}</Text></Text>
                            <Text color={secondary}>Supplier Name:<Text color={textColor}>{item.supplierName}</Text></Text>
                          </Box>
                          <Box mt={2} display={"flex"} flexDirection={"column"}>
                            <CustomButton variant='outlineGreen' title="Edit Item" alt="Edit Item" onClick={() => editItem(item)}>
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
    </Box>;
  }

  export default InventoryList;