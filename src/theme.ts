import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#E3D026",
      light: "#E9DB5D",
      dark: "#A29415",
      contrastText: "#242105",
    },

    secondary: {
      main: "#9e9e9e",
      light: "#e1e1e1",
      dark: "#616161",
      contrastText: "#ffffff",
    },

    background: {
      default: "#f7f7f7",
      paper: "#ffffff",
    },

    text: {
      primary: "#1a1a1a",
      secondary: "#555555",
    },
  },

  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },

  shape: {
    borderRadius: 12, 
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999, 
          paddingLeft: 20,
          paddingRight: 20,
          fontWeight: 600,
        },
        containedPrimary: {
          boxShadow: "0 4px 10px rgba(227, 208, 38, 0.3)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: 8,
          boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
