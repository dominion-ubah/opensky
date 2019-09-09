import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from "react-modal-hook";
import { store } from './helpers';
import { App } from './App';
import './index.css';
import { configureFakeAPI } from './helpers';

window.store = store;

configureFakeAPI();

render(
  <ModalProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ModalProvider>
  ,
  document.getElementById('app')
);
