import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import countReducer, 
  { type Action, type State} 
from './reducers/countReducer.tsx';
import { type Store, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App.tsx';

const store: Store<State, Action> = createStore(countReducer);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
