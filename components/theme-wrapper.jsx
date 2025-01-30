"use client"; // Forces this file to be a client component

import { useTheme } from "next-themes";

export default function ThemeWrapper({ children }) {
  const { resolvedTheme } = useTheme();
  if (!resolvedTheme) return <div />; // Prevent rendering before theme loads

  return <>{children}</>;
}
