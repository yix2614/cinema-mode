
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { TUXApp } from '@byted-tiktok/tux-web';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <TUXApp theme="light" platform="desktop">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TUXApp>
  </React.StrictMode>
);
