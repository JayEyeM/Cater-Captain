// theme.ts

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    light: {
      primary: "#FFFFFF",
      secondary: "#E2E8F0",
      accent: "#1A202C",
      background: "#F9FAFB",
      text: "#1A202C",
    },
    dark: {
      primary: "#1A202C",
      secondary: "#90B4D6",
      accent: "#F9FAFB",
      background: "#141220",
      text: "#F9FAFB",
    },
  },
});

export default theme;
