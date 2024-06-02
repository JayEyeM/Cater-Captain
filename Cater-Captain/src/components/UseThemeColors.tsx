// useThemeColors.ts
import { useColorModeValue } from '@chakra-ui/react';

export const useThemeColors = () => {
  const primary = useColorModeValue('light.primary', 'dark.primary');
  const secondary = useColorModeValue('light.secondary', 'dark.secondary');
  const accent = useColorModeValue('light.accent', 'dark.accent');
  const backgroundColor = useColorModeValue('light.background', 'dark.background');
  const textColor = useColorModeValue('light.text', 'dark.text');

  const shadows = useColorModeValue('shadows.LTShadow', 'shadows.DTShadow');

  
  return { primary, secondary, accent, backgroundColor, textColor, shadows };
};

