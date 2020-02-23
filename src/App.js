import React from 'react';
import { Provider } from 'react-redux'
import './App.css';

import store from './store'

import HomePage from './pages/HomePage'

/**
 * Main React Component.
 * Wraps the Pages and provides/initializes the store for state handling.
 */
function App() {

  return (
    <div className="App">
      <Provider store={ store() }>
        <HomePage />    
      </Provider>
    </div>
  );
}

export default App;
