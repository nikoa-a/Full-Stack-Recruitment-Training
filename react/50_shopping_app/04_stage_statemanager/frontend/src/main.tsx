import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import StateManager from './context/StateManager.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StateManager>
        <App />
      </StateManager>
    </BrowserRouter>
  </StrictMode>
)
