// theme.ts

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    light: {
      primary: "#141220",
      secondary: "#E2E8F0",
      accent: "#1A202C",
      background: "#F9FAFB",
      text: "#1A202C",
    },
    dark: {
      primary: "#CBE6AD",
      secondary: "#90B4D6",
      accent: "#D2A4A4",
      background: "#141220",
      text: "#DCDCDC",
    },
    shadows: {
      LTShadow: ' #141220a7', 
       DTShadow: ' #cbe6ada6', 
     },
  },
  
});

export default theme;
