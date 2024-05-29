import React from 'react';
import { Button } from '@chakra-ui/react';

//customized buttons for general use

//props for buttons
interface CustomButtonProps {
    children: React.ReactNode;
    [key: string]: any;
}

//green buttons solid and outline
const SolidLightGreenButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
    return (
        <Button
            bg="#CBE6AD"
            color="#141220"
            margin={"5px 5px"}
            _hover={{ bg: "green.100" }}
            {...props}
        >
            {children}
        </Button>
    );
};

const OutlineLightGreenButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
    return (
        <Button
            variant="outline"
            borderColor="#CBE6AD"
            color="#CBE6AD"
            margin={"5px 5px"}
            _hover={{ bg: "green.100", color:"#141220" }}
            {...props}
        >
            {children}
        </Button>
    );
};

//red buttons solid and outline
const SolidLightRedButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
    return (
        <Button
            bg="#D2A4A4"
            color="#141220"
            margin={"5px 5px"}
            _hover={{ bg: "red.100" }}
            {...props}
        >
            {children}
        </Button>
    );
};

const OutlineLightRedButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
    return (
        <Button
            variant="outline"
            borderColor="#D2A4A4"
            color="#D2A4A4"
            margin={"5px 5px"}
            _hover={{ bg: "red.50" }}
            {...props}
        >
            {children}
        </Button>
    );
};

//blue buttons solid and outline
const SolidLightBlueButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
    return (
        <Button
            bg="#90B4D6"
            color="#141220"
            margin={"5px 5px"}
            _hover={{ bg: "blue.100" }}
            {...props}
        >
            {children}
        </Button>
    );
};

const OutlineLightBlueButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
    return (
        <Button
            variant="outline"
            borderColor="#90B4D6"
            color="#90B4D6"
            margin={"5px 5px"}
            _hover={{ bg: "blue.50" }}
            {...props}
        >
            {children}
        </Button>
    );
};

export {
    SolidLightGreenButton,
    OutlineLightGreenButton,
    SolidLightRedButton,
    OutlineLightRedButton,
    SolidLightBlueButton,
    OutlineLightBlueButton
};
