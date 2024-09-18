import React from "react";
import { useColorMode, Image } from '@chakra-ui/react';

//button icon image paths
const IngredientsIconDark = './buttonIcons/IngredientsIconDark.svg';
const IngredientsIconLight = './buttonIcons/IngredientsIconLight.svg';
const MenuIconDark = './buttonIcons/MenuIconDark.svg';
const MenuIconLight = './buttonIcons/MenuIconLight.svg';
const NotesIconDark = './buttonIcons/NotesIconDark.svg';
const NotesIconLight = './buttonIcons/NotesIconLight.svg';
const ImageIconDark = './buttonIcons/ImageIconDark.svg';
const ImageIconLight = './buttonIcons/ImageIconLight.svg';
const PriceIconDark = './buttonIcons/PriceIconDark.svg';
const PriceIconLight = './buttonIcons/PriceIconLight.svg';
const muteIconDark = './buttonIcons/muteIconDark.svg';
const muteIconLight = './buttonIcons/muteIconLight.svg';
const unmuteIconDark = './buttonIcons/unMuteIconDark.svg';
const unmuteIconLight = './buttonIcons/unmuteIconLight.svg';

// button icon styles 
const iconStyles = {
    height: "100%", 
    maxHeight: "2.25em", 
    width: "auto"
};

// ingredients icon component
export const IngredientsIcon: React.FC = () => {
    const { colorMode } = useColorMode();
    const iconSrc = colorMode === 'light' ?  IngredientsIconLight : IngredientsIconDark;

    return <Image src={iconSrc} alt="Ingredients Icon" {...iconStyles} />;
};

// menu icon component
export const MenuIcon: React.FC = () => {
    const { colorMode } = useColorMode();
    const iconSrc = colorMode === 'light' ? MenuIconLight : MenuIconDark;

    return <Image src={iconSrc} alt="Menu Icon" {...iconStyles} />;
};

// notes icon component
export const NotesIcon: React.FC = () => {
    const { colorMode } = useColorMode();
    const iconSrc = colorMode === 'light' ? NotesIconLight : NotesIconDark;

    return <Image src={iconSrc} alt="Notes Icon" {...iconStyles} />;
};

// image icon component
export const ImageIcon: React.FC = () => {
    const { colorMode } = useColorMode();
    const iconSrc = colorMode === 'light' ? ImageIconLight : ImageIconDark;

    return <Image src={iconSrc} alt="Image Icon" {...iconStyles} />;
};

// price icon component
export const PriceIcon: React.FC = () => {
    const { colorMode } = useColorMode();
    const iconSrc = colorMode === 'light' ? PriceIconLight : PriceIconDark;

    return <Image src={iconSrc} alt="Price Icon" {...iconStyles} />;
};

// mute icon component
export const MuteIcon: React.FC = () => {
    const { colorMode } = useColorMode();
    const iconSrc = colorMode === 'light' ? unmuteIconLight : unmuteIconDark;

    return <Image src={iconSrc} alt="Mute Icon" {...iconStyles} />;
};

// unmute icon component
export const UnmuteIcon: React.FC = () => {
    const { colorMode } = useColorMode();
    const iconSrc = colorMode === 'light' ? muteIconLight : muteIconDark;

    return <Image src={iconSrc} alt="Unmute Icon" {...iconStyles} />;
};