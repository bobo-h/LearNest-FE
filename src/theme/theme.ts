import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customRed: Palette["primary"];
    customGreen: Palette["primary"];
    customBlue: Palette["primary"];
    customYellow: Palette["primary"];
    customGrey: Palette["primary"];
  }
  interface PaletteOptions {
    customRed?: PaletteOptions["primary"];
    customGreen?: PaletteOptions["primary"];
    customBlue?: PaletteOptions["primary"];
    customYellow?: PaletteOptions["primary"];
    customGrey?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: { main: "#363062", contrastText: "#FFFFFF" },
    secondary: { main: "#a3a3b6", contrastText: "#FFFFFF" },
    info: { main: "#818FB4", contrastText: "#FFFFFF" },
    warning: { main: "#FEF9D7", contrastText: "#363062" },
    background: { default: "#FFF", paper: "#FFFFFF" },
    text: { primary: "#363062", secondary: "#435585", disabled: "#FFFFFF" },
    customRed: { main: "#FF4D4D", contrastText: "#FFFFFF" },
    customGreen: { main: "#4CAF50", contrastText: "#FFFFFF" },
    customBlue: { main: "#3F51B5", contrastText: "#FFFFFF" },
    customYellow: { main: "#FFC107", contrastText: "#000000" },
    customGrey: { main: "#BDBDBD", contrastText: "#FFFFFF" },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h1: { fontSize: "2rem", fontWeight: 700, color: "#363062" },
    h2: { fontSize: "1.75rem", fontWeight: 700, color: "#363062" },
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: "8px" } } },
    MuiTextField: {
      styleOverrides: {
        root: { "& .MuiOutlinedInput-root": { borderRadius: "8px" } },
      },
    },
  },
  spacing: 4,
  breakpoints: { values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 } },
});

export default theme;
