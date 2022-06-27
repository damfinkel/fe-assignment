import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterReducer';

export default configureStore({
  reducer: {
    filter: filterReducer
  }
});
