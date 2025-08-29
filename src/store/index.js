import {configureStore} from '@reduxjs/toolkit';
// Merging all the slices together 
import userDetailReducer from './userData'
import authTokenReducer from './authToken';
const store = configureStore({
  reducer: { 
    userDetail : userDetailReducer,
    authToken : authTokenReducer
  }
});

export default store; 