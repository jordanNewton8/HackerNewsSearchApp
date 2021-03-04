import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';


ReactDOM.render( 
  <React.StrictMode>
  {/* Wrap app in Provider component so store is available to all component tree */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


