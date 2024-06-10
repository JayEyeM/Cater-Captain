// useThemeColors.ts
import { useColorModeValue } from '@chakra-ui/react';

export const useThemeColors = () => {
  const primary = useColorModeValue('light.primary', 'dark.primary');
  const secondary = useColorModeValue('light.secondary', 'dark.secondary');
  const accent = useColorModeValue('light.accent', 'dark.accent');
  const backgroundColor = useColorModeValue('light.background', 'dark.background');
  const textColor = useColorModeValue('light.text', 'dark.text');

  const bPrimary = useColorModeValue('light.bPrimary', 'dark.bPrimary');
  const bSecondary = useColorModeValue('light.bSecondary', 'dark.bSecondary');
  const bAccent = useColorModeValue('light.bAccent', 'dark.bAccent');
  const bBackgroundColor = useColorModeValue('light.bBackground', 'dark.bBackground');
  const bTextColor = useColorModeValue('light.bText', 'dark.bText');
  const bHover = useColorModeValue('light.bHover', 'dark.bHover');

  const shadows = useColorModeValue('shadows.LTShadow', 'shadows.DTShadow');

  
  return { primary, secondary, accent, backgroundColor, textColor, shadows,
    bPrimary, bSecondary, bAccent, bBackgroundColor, bTextColor, bHover,
   };
};

