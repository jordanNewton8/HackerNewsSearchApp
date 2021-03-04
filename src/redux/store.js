import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import thunk from 'redux-thunk';

const middlewares = [thunk];

/*Set up our store to care about searchTerms, updated by the searchReducer,
  searchTerms is its own slice of this app's Redux state. */
export default configureStore({
  reducer: {
    search: searchReducer,
  },
  middleware: middlewares,
});
