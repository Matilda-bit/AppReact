
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import "./style.css"
import App from './App.js';
import store from './store/index';

ReactDOM.createRoot(document.getElementById('root')).render(<Provider store={store}><App /></Provider>);

