import AppLayout from "@/components/layout/AppLayout";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "../styles/global.css";
import type { AppProps } from "next/app";
import { openRunde, theme } from "@/config/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={openRunde.className}>
      <ThemeProvider theme={theme}>
        <AppLayout>
          <CssBaseline />
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
    </div>
  );
}
