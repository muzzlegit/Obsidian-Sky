import { ThemeProvider } from "@emotion/react";

import { type ReactNode } from "react";
import { GlobalStyles } from "./Global";
import { THEME } from "./theme";

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProviderComponent = ({ children }: ThemeProviderProps) => {
  return (
    <ThemeProvider theme={THEME}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};
