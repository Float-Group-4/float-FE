import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@base/components/App/App';
import { Provider } from 'react-redux';
import { store } from '../src/configs/store';
import configDayJS from './configs/day';
configDayJS();


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
