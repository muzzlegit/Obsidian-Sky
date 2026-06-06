import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './client/styles/reset.css';
import './client/styles/variables.css';
import './client/styles/global.css';
import { App } from '#client/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
