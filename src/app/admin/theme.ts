"use client";
import { createTheme } from "@mui/material/styles";

export const adminTheme = createTheme({
  palette: {
    primary: { main: "#fcf6ef" },
    secondary: { main: "#000000" }
  },
  typography: {
    fontFamily: "monospace"
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: "bold"
        }
      }
    }
  }
});
