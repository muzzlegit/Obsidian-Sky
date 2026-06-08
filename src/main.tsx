import { App } from '#client/App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// RESET STYLES
import './client/styles/reset.css';
// STYLES VARIABLES
import './client/styles/variables.css';
// GLOBAL STYLES
import './client/styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
