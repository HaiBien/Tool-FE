import React from 'react';
import ReactDOM from 'react-dom/client';
import {ConfigProvider} from 'antd';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {theme} from "./style/theme";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
    <App />
    </ConfigProvider>
  </React.StrictMode>
);

reportWebVitals();
