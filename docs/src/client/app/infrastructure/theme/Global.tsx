import { Global, css } from "@emotion/react";
import reset from "./reset";

export const GlobalStyles = () => (
  <Global
    styles={css`
      ${reset};

      html,
      body {
        height: 100%;
        fontFamily: "system-ui, sans-serif",
        font-size: 16px;
        line-height: 1.5;
      }

      #root {
        height: 100%;
        background-color: #352e2e;
      }

      ::selection {
        background: #0070f3;
        color: white;
      }

      /* scrollbar */

      /* Chrome, Edge, Safari */
      *::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      *::-webkit-scrollbar-track {
        background: transparent;
      }

      *::-webkit-scrollbar-thumb {
        background-color: rgba(100, 100, 100, 0.4);
        border-radius: 3px;
      }

    
      /* Firefox */
      * {
        scrollbar-width: thin; /* тонкий скролбар */
        scrollbar-color: rgba(100, 100, 100, 0.4) transparent;
      }
    `}
  />
);
