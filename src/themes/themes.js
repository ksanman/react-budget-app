import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#9c27b0',
    },
    error: {
      main: '#c62828',
    },
    success: {
      main: '#00acc1',
    },
  },
});