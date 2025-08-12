import {configureStore} from '@reduxjs/toolkit';
// Merging all the slices together 
import userDetailReducer from './userData'

const store = configureStore({
  reducer: { 
    userDetail : userDetailReducer
  }
});

export default store; 