import { extendTheme } from "@chakra-ui/react";

const themeConfig = {
  colors: {
    brand: {
      "900": "#b3a104",
      "800": "#c4b104",
      "700": "#d4bf04",
      "600": "#8a02de",
      "500": "#9d03fc",
      "400": "#c874fc",
      "300": "#ce8bf7",
    },
    dark: {
      "900": "#1F1D1F",
      "800": "#262425",
      "700": "#2D2B2C",
      "600": "#363435",
    },
    text: {
      "500": "#c7c3c5",
      "400": "#d4d2d3",
      "300": "#e6e6e6",
      "200": "#f7f5f6",
      "100": "#ffffff",
    },
    error: {
      "900": "#d91c1c",
      "700": "#e82323",
      "500": "#fa2a2a",
    },
    success: {
      "900": "#1cd91c",
      "700": "#23e823",
      "500": "#2afa2a",
    },
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  fontWeights: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  fontSizes: {
    xxxxl: "40px",
    xxxl: "35px",
    xxl: "30px",
    xl: "25px",
    lg: "20px",
    md: "18px",
    rg: "16px",
    sm: "15px",
    xs: "14px",
    xxs: "13px",
    xxxs: "12px",
  },
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          bg: "dark.700",
          _checked: {
            bg: "dark.700",
          },
        },
      },
    },
  },
};

export const theme = extendTheme(themeConfig);
