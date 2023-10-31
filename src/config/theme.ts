import localFont from "next/font/local";
import { createTheme } from "@mui/material/styles";

export const openRunde = localFont({
  src: [
    {
      path: "../../public/fonts/OpenRunde-Bold.woff",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../public/fonts/OpenRunde-Medium.woff",
      weight: "500",
      style: "medium",
    },
    {
      path: "../../public/fonts/OpenRunde-Regular.woff",
      weight: "400",
      style: "regular",
    },
    {
      path: "../../public/fonts/OpenRunde-Semibold.woff",
      weight: "600",
      style: "semibold",
    },
  ],
});

export const gradient = {
  bg: "linear-gradient(180deg, rgba(2,94,115,1) 0%, rgba(1,52,64,1) 100%)",
  text: {
    background:
      "linear-gradient(180deg, rgba(2,94,115,1) 0%, rgba(1,52,64,1) 100%)",
    backgroundClip: "text",
    textFillColor: "transparent",
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: "#025E73",
    },
    secondary: {
      main: "#013440",
    },
    background: {
      default: "#DCF0F2",
    },
    text: {
      primary: "#000",
      secondary: "#333",
    },
  },

  typography: {
    allVariants: {
      fontFamily: openRunde.style.fontFamily,
    },
    h1: {
      fontWeight: "700",
      color: "#16171C",
    },
    h2: {
      fontWeight: "600",
      color: "#333",
    },
    body2: {
      color: "#4F4F4F",
      fontWeight: "400",
    },
    subtitle1: {
      fontWeight: "500",
      fontSize: "1.5rem",
      color: "#333",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#DCF0F2",
          height: "96px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow:
            //  "none",
            // window.scrollY <
            // Number(document.querySelector(".MuiAppBar-root")?.scrollHeight)
            //   ? "none"
            //   :
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
          position: "fixed",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          padding: "0 !important",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontFamily: openRunde.style.fontFamily,
          fontWeight: "500",
          padding: "8px 24px",
          borderRadius: "32px",
        },
        contained: {
          background: "primary.main",
          color: "#fff",
        },
        sizeLarge: {
          padding: "16px 32px",
          borderRadius: "24px",
          fontSize: "18px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeLarge: "6rem !important",
      },
    },
  },
});
