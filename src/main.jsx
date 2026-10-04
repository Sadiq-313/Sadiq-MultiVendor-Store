import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { ShopProvider } from './context/ShopContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ShopProvider>
        <App />
      </ShopProvider>
    </Router>
  </React.StrictMode>
);