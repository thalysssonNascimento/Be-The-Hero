import React from 'react';
import { ToastContainer } from 'react-toastify';

import GlobalStyle from './global.js';

import Routes from './routes';

function App() {
  return (
      <>
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000}/>
      </>
  );
}

export default App;
