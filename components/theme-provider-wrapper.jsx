"use client"; // This ensures it runs only on the client side

import { ThemeProvider } from "next-themes";

export default function ThemeProviderWrapper({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
