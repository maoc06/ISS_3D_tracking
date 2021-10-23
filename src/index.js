import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LoadingProvider } from './lib/loading';

ReactDOM.render(
  <React.StrictMode>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
