import React from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import App from './App';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'normalize.css/normalize.css';

Modal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
