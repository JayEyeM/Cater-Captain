// theme.ts

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    light: {
      primary: "#141220",
      secondary: "#2782d7",
      accent: "#d76d6d",
      background:  "#F5F5F5",
      text: "#141220",

      bPrimary: "#CBE6AD",
      bSecondary: "#90B4D6",
      bAccent: "#D2A4A4",
      bBackground: "#141220",
      bText: "#CBE6AD",
      bHover: "#CBE6AD",
    },
    dark: {
      primary: "#CBE6AD",
      secondary: "#90B4D6",
      accent: "#D2A4A4",
      background: "#141220",
      text: "#F5F5F5",

      bPrimary: "#CBE6AD",
      bSecondary: "#90B4D6",
      bAccent: "#D2A4A4",
      bBackground: "#CBE6AD",
      bText: "#141220",
      bHover: "#141220",
    },
    shadows: {
      LTShadow: ' #141220a7', 
       DTShadow: ' #cbe6ada6', 
     },
  },
  
});

export default theme;
