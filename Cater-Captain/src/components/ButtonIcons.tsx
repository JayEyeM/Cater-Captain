import React from "react";
import { useColorMode, Image } from '@chakra-ui/react';

const IngredientsIconDark = './buttonIcons/IngredientsIconDark.svg';
const IngredientsIconLight = './buttonIcons/IngredientsIconLight.svg';
const MenuIconDark = './buttonIcons/MenuIconDark.svg';
const MenuIconLight = './buttonIcons/MenuIconLight.svg';
const NotesIconDark = './buttonIcons/NotesIconDark.svg';
const NotesIconLight = './buttonIcons/NotesIconLight.svg';
const ImageIconDark = './buttonIcons/ImageIconDark.svg';
const ImageIconLight = './buttonIcons/ImageIconLight.svg';

const iconStyles = {
    height: "100%", 
    maxHeight: "2.25em", // Adjust this value as needed
    width: "auto"
};

export const IngredientsIcon: React.FC = () => {
    const { colorMode } = useColorMode();
    const iconSrc = colorMode === 'light' ?  IngredientsIconLight : IngredientsIconDark;

    return <Image src={iconSrc} alt="Ingredients Icon" {...iconStyles} />;
};

export const MenuIcon: React.FC = () => {
    const { colorMode } = useColorMode();
    const iconSrc = colorMode === 'light' ? MenuIconLight : MenuIconDark;

    return <Image src={iconSrc} alt="Menu Icon" {...iconStyles} />;
};

export const NotesIcon: React.FC = () => {
    const { colorMode } = useColorMode();
    const iconSrc = colorMode === 'light' ? NotesIconLight : NotesIconDark;

    return <Image src={iconSrc} alt="Notes Icon" {...iconStyles} />;
};

export const ImageIcon: React.FC = () => {
    const { colorMode } = useColorMode();
    const iconSrc = colorMode === 'light' ? ImageIconLight : ImageIconDark;

    return <Image src={iconSrc} alt="Image Icon" {...iconStyles} />;
};