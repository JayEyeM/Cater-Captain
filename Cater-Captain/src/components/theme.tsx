// theme.ts

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    light: {
      primary: "#CBE6AD",
      secondary: "#90B4D6",
      accent: "#BDBDBD",
      background:  "#FCE694",
      text: "#141220",
    },
    dark: {
      primary: "#CBE6AD",
      secondary: "#90B4D6",
      accent: "#D2A4A4",
      background: "#141220",
      text: "#F5F5F5",
    },
    shadows: {
      LTShadow: ' #141220a7', 
       DTShadow: ' #cbe6ada6', 
     },
  },
  
});

export default theme;
