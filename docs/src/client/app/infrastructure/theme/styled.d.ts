import "@emotion/react";
import { AppThemeType } from "./theme";

declare module "@emotion/react" {
  export interface Theme extends AppThemeType {}
}
