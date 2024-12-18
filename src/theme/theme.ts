import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#363062", contrastText: "#FFFFFF" },
    secondary: { main: "#435585", contrastText: "#FFFFFF" },
    info: { main: "#818FB4", contrastText: "#FFFFFF" },
    warning: { main: "#FEF9D7", contrastText: "#363062" },
    background: { default: "#FFF", paper: "#FFFFFF" },
    text: { primary: "#363062", secondary: "#435585" },
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
